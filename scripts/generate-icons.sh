#!/usr/bin/env bash
# scripts/generate-icons.sh
# Generates raster icons from assets/nstropy-logo.svg using Inkscape or ImageMagick.
# Usage: ./scripts/generate-icons.sh
set -e
SVG="assets/nstropy-logo.svg"
if [ ! -f "$SVG" ]; then
  echo "SVG not found: $SVG"
  exit 1
fi
# Prefer inkscape if available
if command -v inkscape >/dev/null 2>&1; then
  echo "Using Inkscape to export icons..."
  inkscape "$SVG" --export-filename=icon-192.png --export-width=192
  inkscape "$SVG" --export-filename=icon-512.png --export-width=512
  inkscape "$SVG" --export-filename=apple-touch-icon.png --export-width=180
  # Optional: create header and splash raster images at reasonable sizes
  inkscape "$SVG" --export-filename=header-logo.png --export-width=360
  inkscape "$SVG" --export-filename=logo-clean.png --export-width=1024
elif command -v convert >/dev/null 2>&1; then
  echo "Using ImageMagick (convert) to export icons..."
  convert -background none "$SVG" -resize 192x192 icon-192.png
  convert -background none "$SVG" -resize 512x512 icon-512.png
  convert -background none "$SVG" -resize 180x180 apple-touch-icon.png
  convert -background none "$SVG" -resize 360x360 header-logo.png
  convert -background none "$SVG" -resize 1024x1024 logo-clean.png
else
  echo "Neither inkscape nor convert (ImageMagick) found. Install one of them and re-run."
  exit 2
fi

echo "Generated icon-192.png, icon-512.png, apple-touch-icon.png, header-logo.png, logo-clean.png"

echo "You can then run:\n  git add icon-192.png icon-512.png apple-touch-icon.png header-logo.png logo-clean.png\n  git commit -m 'Add generated app icons and raster logos from SVG'\n  git push"
