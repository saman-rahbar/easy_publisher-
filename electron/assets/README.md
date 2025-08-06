# Desktop App Assets

This directory contains icons and assets for the desktop application.

## Required Icons

For the desktop app to build properly, you need to add the following icon files:

- `icon.png` - 512x512 PNG icon (for Linux)
- `icon.ico` - Windows icon file (for Windows)
- `icon.icns` - macOS icon file (for macOS)

## Icon Creation

You can create these icons from a single high-resolution image using online tools:

1. **PNG to ICO**: https://convertio.co/png-ico/
2. **PNG to ICNS**: https://cloudconvert.com/png-to-icns
3. **Online Icon Generator**: https://www.favicon-generator.org/

## Recommended Icon Specifications

- **Size**: 512x512 pixels minimum
- **Format**: PNG with transparency
- **Style**: Flat design, professional appearance
- **Colors**: Match your brand colors

## Quick Setup

If you don't have icons yet, you can use placeholder icons for development:

```bash
# Download a sample icon (replace with your own)
curl -o electron/assets/icon.png https://via.placeholder.com/512x512/3B82F6/FFFFFF?text=SP
```

Then convert it to the required formats using online tools. 