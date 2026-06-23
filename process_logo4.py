#!/usr/bin/env python3
"""
Balesin.id Logo Background Removal v4
Strategy: aggressive morphological approach to fill white interior of mascot.
"""

import numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes, binary_dilation, binary_erosion, gaussian_filter, distance_transform_edt
from collections import deque

SRC = "/mnt/c/Users/Bagus/Downloads/ChatGPT Image Jun 23, 2026, 07_19_23 AM.png"
DST = "public/brand/logo-balesin-transparent.png"

print("=== Balesin.id Logo Background Removal v4 ===\n")

img = Image.open(SRC).convert('RGBA')
arr = np.array(img)
h, w = arr.shape[:2]
print(f"Size: {w}x{h}")

# Find all non-white pixels (content)
r, g, b = arr[:,:,0].astype(int), arr[:,:,1].astype(int), arr[:,:,2].astype(int)
content = (r < 235) | (g < 235) | (b < 235)
print(f"Content (non-white): {content.sum()}")

# Aggressive dilation: use a large disk-like structuring element
dilated_heavy = binary_dilation(content, iterations=15)
print(f"After heavy dilation (15x): {dilated_heavy.sum()}")

# Fill all holes completely
filled = binary_fill_holes(dilated_heavy)
print(f"After hole filling: {filled.sum()}")

# Now erode back significantly to recover original boundaries
# Use more erosion to compensate for the heavy dilation
eroded = binary_erosion(filled, iterations=12)
print(f"After erosion (12x): {eroded.sum()}")

# The erosion might have eaten into the mascot body. Let's refine:
# Use the original content mask to recover precise boundaries:
# eroded tells us the interior definitely belongs to logo
# content tells us the exact colored pixels
# Combine: interior = eroded union ALL content + border zone

# Step 1: get the rough shape from the eroded mask
# Step 2: combine with any content pixel (colored areas)
final_mask = eroded | content

# Step 3: one more fill holes to capture any white within the shape
final_mask = binary_fill_holes(final_mask)

# Add extra guarantee: anything that was originally colored MUST stay
final_mask = final_mask | content

print(f"Final mask: {final_mask.sum()}")

# Create smooth alpha edge
dist = distance_transform_edt(final_mask)
edge = 2.0
alpha_float = np.where(final_mask,
                       np.clip((dist + 0.5) / edge * 255, 0, 255),
                       0)
alpha = gaussian_filter(alpha_float, sigma=0.5)
alpha = np.clip(alpha, 0, 255).astype(np.uint8)

# Build final RGBA image
result = np.zeros((h, w, 4), dtype=np.uint8)
result[:,:,:3] = arr[:,:,:3]
result[:,:,3] = alpha

Image.fromarray(result).save(DST, 'PNG')

# Verify key points
v = np.array(Image.open(DST).convert('RGBA'))
checkpoints = [
    ("Top-left bg", 5, 5),
    ("Top-right bg", 5, w-5),
    ("Bottom-left bg", h-5, 5),
    ("Cloud white body", h//2 - 40, w//2 - 100),
    ("Mascot eye region", h//2 - 80, w//2 - 120),
    ("Mascot cheek area", h//2, w//2 - 60),
    ("Blue outline", h//2 - 50, w//2 - 140),
    ("Navy text 'Balesin'", h//2 + 20, w//2 - 50),
    ("Tagline text", h - 80, w//2),
]

print(f"\nKey pixel checks:")
for name, y, x in checkpoints:
    if 0 <= y < h and 0 <= x < w:
        px = v[y, x]
        status = "OK" if px[3] > 0 else "FAIL (transparent when should be opaque)" if px[0] > 200 else "OK (bg transparent)"
        print(f"  {name} ({y},{x}): RGBA{tuple(px.tolist())} — {status}")

tp = (v[:,:,3] == 0).sum()
op = (v[:,:,3] > 0).sum()
print(f"\nTransparent: {tp}, Opaque: {op}")
print(f"File saved: {DST}")
print("DONE")
