import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const svg = readFileSync(resolve('public/icon.svg'));

const targets = [
  { out: 'public/icon-192.png', size: 192 },
  { out: 'public/icon-512.png', size: 512 },
  { out: 'public/apple-icon.png', size: 180 },
];

for (const { out, size } of targets) {
  await sharp(svg).resize(size, size).png().toFile(resolve(out));
  console.log(`✓ ${out} (${size}×${size})`);
}

const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0a0a0a"/>
  <g transform="translate(64 64) scale(0.75)">
    <circle cx="256" cy="256" r="170" fill="none" stroke="#ff7a1a" stroke-width="32"/>
    <path d="M195 360 V152 H272 a64 64 0 0 1 0 128 H195" fill="none" stroke="#ff7a1a" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
await sharp(Buffer.from(maskableSvg)).resize(512, 512).png().toFile(resolve('public/icon-maskable.png'));
console.log('✓ public/icon-maskable.png (512×512 maskable)');
