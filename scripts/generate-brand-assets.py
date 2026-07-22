#!/usr/bin/env python3
"""Generate AnUIme web, app, and social assets from the approved logo masters."""

from __future__ import annotations

from pathlib import Path
from shutil import copyfile

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
LOGO = PUBLIC / "logo"
RESAMPLE = Image.Resampling.LANCZOS


def save_png(image: Image.Image, path: Path) -> None:
    image.save(path, "PNG", optimize=True, compress_level=9)


def contain(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    result = image.copy()
    result.thumbnail(size, RESAMPLE)
    return result


def centered_canvas(
    image: Image.Image,
    size: tuple[int, int],
    *,
    background: tuple[int, int, int, int] = (0, 0, 0, 0),
) -> Image.Image:
    canvas = Image.new("RGBA", size, background)
    canvas.alpha_composite(image, ((size[0] - image.width) // 2, (size[1] - image.height) // 2))
    return canvas


def extract_mark(master: Image.Image) -> Image.Image:
    width, height = master.size
    mark_region = master.crop((0, 0, round(width * 0.3), height))
    bbox = mark_region.getchannel("A").getbbox()
    if bbox is None:
        raise RuntimeError("Logo mark could not be located in the master artwork")

    padding = round(height * 0.05)
    left = max(0, bbox[0] - padding)
    top = max(0, bbox[1] - padding)
    right = min(mark_region.width, bbox[2] + padding)
    bottom = min(mark_region.height, bbox[3] + padding)
    mark = mark_region.crop((left, top, right, bottom))
    return centered_canvas(contain(mark, (880, 880)), (1024, 1024))


def gradient_background(size: tuple[int, int]) -> Image.Image:
    width, height = size
    background = Image.new("RGBA", size, "#07152F")
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    radius = round(min(size) * 0.62)
    draw.ellipse(
        (width - radius, -radius // 2, width + radius, radius + radius // 2),
        fill=(34, 211, 238, 56),
    )
    draw.ellipse(
        (-radius, height - radius, radius, height + radius),
        fill=(139, 92, 246, 40),
    )
    return Image.alpha_composite(background, glow.filter(ImageFilter.GaussianBlur(radius // 3)))


def app_icon(mark: Image.Image, *, safe_size: int) -> Image.Image:
    canvas = gradient_background((1024, 1024))
    fitted_mark = contain(mark, (safe_size, safe_size))
    canvas.alpha_composite(
        fitted_mark,
        ((1024 - fitted_mark.width) // 2, (1024 - fitted_mark.height) // 2),
    )
    return canvas.convert("RGB")


def social_card(wordmark: Image.Image, size: tuple[int, int]) -> Image.Image:
    canvas = gradient_background(size)
    fitted_logo = contain(wordmark, (round(size[0] * 0.84), round(size[1] * 0.46)))
    canvas.alpha_composite(
        fitted_logo,
        ((size[0] - fitted_logo.width) // 2, (size[1] - fitted_logo.height) // 2),
    )
    return canvas.convert("RGB")


def main() -> None:
    LOGO.mkdir(parents=True, exist_ok=True)
    dark_wordmark = Image.open(LOGO / "dark_theme_logo.png").convert("RGBA")
    light_wordmark = Image.open(LOGO / "light_theme_logo.png").convert("RGBA")

    dark_site = contain(dark_wordmark, (1600, 1600))
    light_site = contain(light_wordmark, (1600, 1600))
    save_png(dark_site, LOGO / "dark_theme_logo_site.png")
    save_png(light_site, LOGO / "light_theme_logo_site.png")

    dark_mark = extract_mark(dark_wordmark)
    light_mark = extract_mark(light_wordmark)
    save_png(dark_mark, LOGO / "mark_for_dark.png")
    save_png(light_mark, LOGO / "mark_for_light.png")

    primary_icon = app_icon(dark_mark, safe_size=760)
    maskable_icon = app_icon(dark_mark, safe_size=610)
    save_png(primary_icon, LOGO / "app_icon_1024.png")
    save_png(maskable_icon, LOGO / "maskable_icon_1024.png")

    icon_outputs = {
        LOGO / "favicon_16.png": (16, 16),
        LOGO / "favicon_32.png": (32, 32),
        LOGO / "favicon_48.png": (48, 48),
        LOGO / "apple_touch_icon_180.png": (180, 180),
        LOGO / "android_chrome_192.png": (192, 192),
        LOGO / "android_chrome_512.png": (512, 512),
        LOGO / "mstile_150.png": (150, 150),
    }
    for path, size in icon_outputs.items():
        save_png(primary_icon.resize(size, RESAMPLE), path)
    save_png(maskable_icon.resize((512, 512), RESAMPLE), LOGO / "maskable_icon_512.png")

    primary_icon.save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )
    copyfile(LOGO / "favicon_16.png", PUBLIC / "favicon-16x16.png")
    copyfile(LOGO / "favicon_32.png", PUBLIC / "favicon-32x32.png")
    copyfile(LOGO / "apple_touch_icon_180.png", PUBLIC / "apple-touch-icon.png")
    copyfile(LOGO / "android_chrome_192.png", PUBLIC / "android-chrome-192x192.png")
    copyfile(LOGO / "android_chrome_512.png", PUBLIC / "android-chrome-512x512.png")
    copyfile(LOGO / "maskable_icon_512.png", PUBLIC / "maskable-icon-512x512.png")
    copyfile(LOGO / "mstile_150.png", PUBLIC / "mstile-150x150.png")

    transparent_social = centered_canvas(contain(light_wordmark, (1100, 420)), (1200, 630))
    save_png(transparent_social, LOGO / "social_logo_transparent.png")
    save_png(transparent_social, LOGO / "social_logo.png")

    og_card = social_card(dark_wordmark, (1200, 630))
    twitter_card = social_card(dark_wordmark, (1200, 600))
    github_card = social_card(dark_wordmark, (1280, 640))
    save_png(og_card, LOGO / "og_image.png")
    save_png(twitter_card, LOGO / "twitter_card.png")
    save_png(github_card, LOGO / "github_social_preview.png")


if __name__ == "__main__":
    main()
