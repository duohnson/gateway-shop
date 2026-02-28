const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

const input = path.resolve(__dirname, '../src/static/public/css/tailwind.input.css');
const output = path.resolve(__dirname, '../src/static/public/css/tailwind.css');

async function build() {
  try {
    const css = fs.readFileSync(input, 'utf8');
    const result = await postcss([tailwind(), autoprefixer]).process(css, { from: input, to: output });
    fs.writeFileSync(output, result.css, 'utf8');
    if (result.map) fs.writeFileSync(output + '.map', result.map.toString(), 'utf8');
    console.log('Built', output);
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

build();
