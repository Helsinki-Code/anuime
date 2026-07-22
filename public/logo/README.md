# AnUIme brand assets

## Masters

- `dark_theme_logo.png`: transparent 4096px wordmark for dark surfaces.
- `light_theme_logo.png`: transparent 4096px wordmark for light surfaces.
- `mark_for_dark.png` and `mark_for_light.png`: transparent square logo marks.

## Web delivery

- `*_site.png`: optimized 1600px transparent wordmarks used in navigation.
- `favicon_16.png`, `favicon_32.png`, and `favicon_48.png`: browser icon sizes.
- `apple_touch_icon_180.png`: Apple home-screen icon.
- `android_chrome_192.png` and `android_chrome_512.png`: installable web-app icons.
- `maskable_icon_512.png`: safe-zone PWA icon.
- `mstile_150.png`: Microsoft tile icon.

## Social

- `og_image.png`: 1200×630 Open Graph card.
- `twitter_card.png`: 1200×600 social card.
- `github_social_preview.png`: 1280×640 GitHub repository preview.
- `social_logo_transparent.png`: transparent 1200×630 wordmark canvas.

Conventional browser copies are also published at the root of `public/`, including the multi-size
`favicon.ico`, Apple touch icon, Android icons, maskable icon, Microsoft tile, manifest, and Safari
pinned-tab artwork.

Regenerate all derived assets after updating either master:

```bash
python3 scripts/generate-brand-assets.py
```
