#!/usr/bin/env python3
"""Smart background removal: use colored outlines as anchor, fill interior via flood-fill."""

import numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes, binary_dilation, gaussian_filter
from collections import deque

SRC = "/mnt/c/Users/Bagus/Downloads/ChatGPT Image Jun 23, 2026, 07_19_23 AM.png"
DST = "public/brand/logo-balesin-transparent.png"

print("1. Loading original...")
img = Image.open(SRC).convert('RGBA')
arr = np.array(img)
h, w = arr.shape[:2]
print(f"   Size: {w}x{h}")

# Step 1: Identify "content" pixels - anything that's not pure white
# The logo has blue outlines, dark text, green leaves - use these as anchors
r, g, b, a = arr[:,:,0].astype(int), arr[:,:,1].astype(int), arr[:,:,2].astype(int), arr[:,:,3]

# A pixel is "content" if it has significant color (not near-white)
# threshold: at least one channel below 220
content = ~((r > 230) & (g > 230) & (b > 230))

print(f"2. Content pixels (non-white): {content.sum()}")

# Step 2: Dilate content pixels to create a solid outline around the mascot
# The mascot has a blue outline ~2-5px thick, dilate 8px to fill gaps in outline
dilated = binary_dilation(content, iterations=6)

# Step 3: Fill holes — interior of the mascot (white body, white highlights, text gaps)
filled = binary_fill_holes(dilated)

# Step 4: Remove small noise islands (dilation may connect to corner artifacts)
# Erode back slightly to recover the exact boundary
from scipy.ndimage import binary_erosion
eroded = binary_erosion(filled, iterations=2)

# Step 5: Feather edges for smooth alpha
# Compute signed distance to boundary
from scipy.ndimage import distance_transform_edt
dist = distance_transform_edt(~eroded)  # distance from eroded area
# Create smooth falloff zone of ~3px
smooth_mask = np.clip(dist, 0, 3) / 3.0
# Where eroded is False (background), alpha = 0
# Where eroded is True and dist >= 3, alpha = 255
# Where dist < 3, alpha = smooth transition

alpha = np.where(eroded, 255, 0).astype(float)
boundary = (eroded & (dist < 3)) | (~eroded & (dist < 3))
# Smooth boundary
smooth_alpha = gaussian_filter(alpha, sigma=0.6)
smooth_alpha = np.clip(smooth_alpha, 0, 255).astype(np.uint8)

# Make sure fully-eroded-background areas are fully transparent
smooth_alpha[~filled] = 0

# Step 6: Apply to original image
result = arr.copy()
result[:,:,3] = smooth_alpha

# Save
Image.fromarray(result).save(DST, 'PNG')

# Verify
v = np.array(Image.open(DST).convert('RGBA'))
tp = (v[:,:,3] == 0).sum()
op = (v[:,:,3] > 128).sum()
semi = ((v[:,:,3] > 0) & (v[:,:,3] <= 128)).sum()
print(f"3. Results:")
print(f"   Transparent (alpha=0): {tp}")
print(f"   Semi-transparent: {semi}")
print(f"   Solid (alpha>128): {op}")
print(f"   Top-left: {v[0,0]}")
print(f"   Center mascot: {v[h//2, w//2]}")

# Sample a few points to verify
samples = [
    ("top-left corner", 5, 5),
    ("text 'Balesin'", h//2 + 40, w//2 - 50),
    ("mascot body center", h//2 - 80, w//2 - 100),
    ("mascot eye", h//2 - 100, w//2 - 120),
]
for name, y, x in samples:
    px = v[y, x]
    if x >= 0 and x < w and y >= 0 and y < h:
        print(f"   {name}: RGBA{tuple(px.tolist())}")

print(f"4. Saved: {DST}")
print("DONE")
