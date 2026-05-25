#!/usr/bin/env node
/**
 * Generates PWA icons as raw PNG using pure Node (zlib + Buffer) — no native deps.
 *
 * Design:
 *  - Dark background (#0a0d12)
 *  - Centered ">_" glyph in green (#7ee787) using a hand-drawn 5x7 bitmap font
 *    scaled up for visibility, since we have no canvas/font subsystem available.
 *
 * Outputs:
 *   public/icons/icon-192.png         (192x192, any)
 *   public/icons/icon-512.png         (512x512, any)
 *   public/icons/icon-maskable.png    (512x512, maskable — safe zone padded)
 *   public/apple-touch-icon.png       (180x180)
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const ICONS_DIR = join(PUBLIC_DIR, 'icons');

mkdirSync(ICONS_DIR, { recursive: true });

// ─── Color palette ──────────────────────────────────────────────────────────
const BG = [0x0a, 0x0d, 0x12, 0xff];       // #0a0d12 opaque
const FG = [0x7e, 0xe7, 0x87, 0xff];       // #7ee787 opaque

// ─── 5x7 bitmap glyphs for ">" and "_" ──────────────────────────────────────
// Each row is a 5-bit mask, MSB = leftmost pixel.
const GLYPH_GT = [
  0b10000,
  0b01000,
  0b00100,
  0b00010,
  0b00100,
  0b01000,
  0b10000,
];

const GLYPH_UNDERSCORE = [
  0b00000,
  0b00000,
  0b00000,
  0b00000,
  0b00000,
  0b00000,
  0b11111,
];

// ─── PNG encoding (RGBA, 8-bit) ─────────────────────────────────────────────
function crc32(buf) {
  // Cached CRC table
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(width, height, rgbaPixels) {
  // Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);    // bit depth
  ihdr.writeUInt8(6, 9);    // color type = RGBA
  ihdr.writeUInt8(0, 10);   // compression
  ihdr.writeUInt8(0, 11);   // filter
  ihdr.writeUInt8(0, 12);   // interlace
  // IDAT: filter byte 0 per row + raw RGBA
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: None
    rgbaPixels.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = deflateSync(raw);
  // IEND
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ─── Pixel buffer helpers ──────────────────────────────────────────────────
function makeBuffer(width, height, fillRgba) {
  const buf = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    buf[i * 4 + 0] = fillRgba[0];
    buf[i * 4 + 1] = fillRgba[1];
    buf[i * 4 + 2] = fillRgba[2];
    buf[i * 4 + 3] = fillRgba[3];
  }
  return buf;
}

function setPixel(buf, width, x, y, rgba) {
  if (x < 0 || y < 0 || x >= width) return;
  const i = (y * width + x) * 4;
  buf[i + 0] = rgba[0];
  buf[i + 1] = rgba[1];
  buf[i + 2] = rgba[2];
  buf[i + 3] = rgba[3];
}

function fillRect(buf, width, x0, y0, w, h, rgba) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      setPixel(buf, width, x, y, rgba);
    }
  }
}

function drawGlyph(buf, width, glyph, x, y, scale, rgba) {
  // glyph: 7 rows, 5 cols
  for (let row = 0; row < 7; row++) {
    const bits = glyph[row];
    for (let col = 0; col < 5; col++) {
      const on = (bits >> (4 - col)) & 1;
      if (on) {
        fillRect(buf, width, x + col * scale, y + row * scale, scale, scale, rgba);
      }
    }
  }
}

// ─── Compose ">_" centered in canvas ───────────────────────────────────────
function renderIcon(size, maskableSafeZone = false) {
  const buf = makeBuffer(size, size, BG);

  // For maskable icons, content must stay within central ~80% (safe zone).
  // We just scale our glyph smaller so it sits well inside that zone.
  const safetyShrink = maskableSafeZone ? 0.7 : 0.85;

  // Glyphs are 5 cols wide; we want ">" and "_" side-by-side with a 1-col gap.
  // Total grid width = 5 + 1 + 5 = 11 cols; height = 7 rows.
  const totalCols = 11;
  const totalRows = 7;

  const maxScaleX = Math.floor((size * safetyShrink) / totalCols);
  const maxScaleY = Math.floor((size * safetyShrink) / totalRows);
  const scale = Math.max(1, Math.min(maxScaleX, maxScaleY));

  const glyphW = totalCols * scale;
  const glyphH = totalRows * scale;
  const x0 = Math.floor((size - glyphW) / 2);
  const y0 = Math.floor((size - glyphH) / 2);

  // ">" at column 0
  drawGlyph(buf, size, GLYPH_GT, x0, y0, scale, FG);
  // "_" at column 6 (after 5-wide ">" and 1-wide gap)
  drawGlyph(buf, size, GLYPH_UNDERSCORE, x0 + 6 * scale, y0, scale, FG);

  return encodePng(size, size, buf);
}

const targets = [
  { path: join(ICONS_DIR, 'icon-192.png'), size: 192, maskable: false },
  { path: join(ICONS_DIR, 'icon-512.png'), size: 512, maskable: false },
  { path: join(ICONS_DIR, 'icon-maskable.png'), size: 512, maskable: true },
  { path: join(PUBLIC_DIR, 'apple-touch-icon.png'), size: 180, maskable: false },
];

for (const t of targets) {
  const png = renderIcon(t.size, t.maskable);
  writeFileSync(t.path, png);
  console.log(`wrote ${t.path} (${png.length} bytes, ${t.size}x${t.size}${t.maskable ? ' maskable' : ''})`);
}
