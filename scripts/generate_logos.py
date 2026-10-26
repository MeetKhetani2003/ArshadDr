from PIL import Image, ImageOps
import os

def process_logo_transparency(img_path, ball_center=None, ball_radius=0):
    im = Image.open(img_path).convert('RGBA')
    w, h = im.size
    
    # We will use pixel access
    pixels = im.load()
    
    r_sq = ball_radius * ball_radius if ball_center and ball_radius > 0 else -1
    bx, by = ball_center if ball_center else (0, 0)
    
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            
            # Check ball
            if r_sq > 0:
                dist_sq = (x - bx)**2 + (y - by)**2
                if dist_sq <= r_sq:
                    # Inside soccer ball, keep original
                    pixels[x, y] = (r, g, b, 255)
                    continue
            
            # Distance from pure white
            min_c = min(r, g, b)
            diff = 255 - min_c
            
            if diff <= 5:
                # Transparent
                pixels[x, y] = (255, 255, 255, 0)
            elif diff < 38:
                # Anti-aliasing with decontamination
                alpha = int(255 * (diff - 5) / (38 - 5))
                alpha = max(0, min(255, alpha))
                a_float = alpha / 255.0
                cr = int(max(0, min(255, (r - 255 * (1 - a_float)) / a_float)))
                cg = int(max(0, min(255, (g - 255 * (1 - a_float)) / a_float)))
                cb = int(max(0, min(255, (b - 255 * (1 - a_float)) / a_float)))
                pixels[x, y] = (cr, cg, cb, alpha)
            else:
                pixels[x, y] = (r, g, b, 255)
                
    return im

def trim_transparent(im, padding=10):
    # Find bounding box of non-zero alpha
    alpha = im.split()[-1]
    bbox = alpha.getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    w, h = im.size
    x0 = max(0, x0 - padding)
    y0 = max(0, y0 - padding)
    x1 = min(w, x1 + padding)
    y1 = min(h, y1 + padding)
    return im.crop((x0, y0, x1, y1))

def make_dark_bg_variant(im, text_x_start):
    # Returns copy with charcoal text changed to pure white
    res = im.copy()
    w, h = res.size
    pixels = res.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            if x >= text_x_start:
                # Charcoal text detection
                # In text area: charcoal has low saturation and low brightness
                if abs(r - g) < 25 and abs(g - b) < 25 and abs(r - b) < 25 and r < 130 and g < 130 and b < 130:
                    pixels[x, y] = (255, 255, 255, a)
    return res

os.makedirs('public', exist_ok=True)
os.makedirs('src/app', exist_ok=True)

print('Processing Logo-1 (Horizontal Full)...')
logo1_raw = process_logo_transparency('public/logopngs/Healing Hands Physiotherapy Logo-1.png', ball_center=(304, 214), ball_radius=27)
logo1_trimmed = trim_transparent(logo1_raw, padding=16)

# Horizontal Light Background (Default)
logo1_trimmed.save('public/Logo.png', 'PNG')
logo1_trimmed.save('public/healingheading.png', 'PNG')
logo1_trimmed.save('public/logo-horizontal.png', 'PNG')
print('Saved Logo.png, healingheading.png, logo-horizontal.png')

# Horizontal Dark Background (For Footer, Dark Mode)
# In logo1_trimmed, let's find the gap or x offset for text
# Original gap was at x=827, trimmed x0 is around 100, so text starts ~ 700
logo1_dark = make_dark_bg_variant(logo1_trimmed, text_x_start=680)
logo1_dark.save('public/logofooter.png', 'PNG')
logo1_dark.save('public/healingheading-white.png', 'PNG')
logo1_dark.save('public/logo-white.png', 'PNG')
print('Saved logofooter.png, healingheading-white.png, logo-white.png')

# Processing Logo-2 (Square Stacked)
print('Processing Logo-2 (Square Stacked)...')
logo2_raw = process_logo_transparency('public/logopngs/Healing Hands Physiotherapy Logo-2.png', ball_center=(459, 244), ball_radius=27)
logo2_trimmed = trim_transparent(logo2_raw, padding=20)
# Make it a clean square
w2, h2 = logo2_trimmed.size
sq_size = max(w2, h2) + 20
logo2_sq = Image.new('RGBA', (sq_size, sq_size), (0, 0, 0, 0))
logo2_sq.paste(logo2_trimmed, ((sq_size - w2)//2, (sq_size - h2)//2), logo2_trimmed)
logo2_sq.save('public/logo-square.png', 'PNG')
print('Saved logo-square.png')

# Processing Emblem (Icon only)
print('Processing Emblem (Icon)...')
# Crop emblem from logo1_raw: x ~ 100 to 825, y ~ 40 to 685
alpha1 = logo1_raw.split()[-1]
# We know gap is at x=827
emblem_box = (100, 40, 835, 690)
emblem_crop = logo1_raw.crop(emblem_box)
emblem_trimmed = trim_transparent(emblem_crop, padding=10)
ew, eh = emblem_trimmed.size

# 512x512 App Icon / Favicon
icon_canvas = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
scale = min(460.0 / ew, 460.0 / eh)
inw = int(ew * scale)
inh = int(eh * scale)
emblem_scaled = emblem_trimmed.resize((inw, inh), Image.Resampling.LANCZOS)
icon_canvas.paste(emblem_scaled, ((512 - inw)//2, (512 - inh)//2), emblem_scaled)

icon_canvas.save('src/app/icon.png', 'PNG')
icon_canvas.save('public/favicon.png', 'PNG')
icon_canvas.save('public/logo-emblem.png', 'PNG')
print('Saved src/app/icon.png, public/favicon.png, public/logo-emblem.png')

# Also create 32x32, 192x192, 180x180 for standard web icons if needed
icon_canvas.resize((192, 192), Image.Resampling.LANCZOS).save('public/icon-192.png', 'PNG')
icon_canvas.resize((32, 32), Image.Resampling.LANCZOS).save('public/favicon-32x32.png', 'PNG')

# Processing Logo-5 (Wordmark only)
print('Processing Logo-5 (Wordmark)...')
logo5_raw = process_logo_transparency('public/logopngs/Healing Hands Physiotherapy Logo-5.png')
logo5_trimmed = trim_transparent(logo5_raw, padding=12)
logo5_trimmed.save('public/logo-wordmark.png', 'PNG')

logo5_dark = make_dark_bg_variant(logo5_trimmed, text_x_start=0)
logo5_dark.save('public/logo-wordmark-white.png', 'PNG')
print('Saved logo-wordmark.png, logo-wordmark-white.png')

print('All logos generated successfully!')
