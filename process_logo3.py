#!/usr/bin/env python3
"""
Balesin.id Logo Background Removal
Strategy: Use edge detection + flood fill to identify and remove ONLY external white background.
Keep all white that is interior (mascot body, cheeks, highlights, text).
"""

import numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes, binary_dilation, binary_erosion, gaussian_filter, distance_transform_edt
from collections import deque
import io

SRC = "/mnt/c/Users/Bagus/Downloads/ChatGPT Image Jun 23, 2026, 07_19_23 AM.png"
DST = "public/brand/logo-balesin-transparent.png"

print("=== Balesin.id Logo Background Removal ===\n")

# 1. Load and analyze
print("1. Loading image...")
img = Image.open(SRC).convert('RGBA')
arr = np.array(img)
h, w = arr.shape[:2]
print(f"   Size: {w}x{h}, Mode: RGBA")

# 2. Identify content via edge detection (colored/non-white = content)
# The cloud mascot has colored outlines (blue/cyan), so non-white pixels ARE content
# Use a threshold that catches colored pixels AND blue outline
r, g, b = arr[:,:,0].astype(float), arr[:,:,1].astype(float), arr[:,:,2].astype(float)

# Pixels with ANY significant color deviation from white are content
# Being conservative: if ANY channel < 235, it's likely content (outline)
has_color = (r < 235) | (g < 235) | (b < 235)

print(f"2. Content (colored pixels): {has_color.sum()}")

# 3. Dilate content to create solid outline around all elements
# The outline is ~3-5px thick, dilate by 8 to ensure closure
content_dilated = binary_dilation(has_color, iterations=8)

print(f"   After dilation: {content_dilated.sum()}")

# 4. Flood-fill to identify interior white (mascot body, cheeks, text gaps)
interior = binary_fill_holes(content_dilated)

print(f"   After fill holes: {interior.sum()}")

# 5. Erode slightly to recover precise boundaries
interior_eroded = binary_erosion(interior, iterations=3)

# 6. Create final alpha mask with smooth edge
# Compute distance from background for smooth falloff
dist = distance_transform_edt(interior_eroded)

# Create a soft edge over ~3 pixels
edge_width = 3.0
alpha = np.where(
    interior_eroded,
    np.clip(dist / edge_width * 255, 0, 255),
    0
)
# Apply gaussian blur for smooth edge
alpha = gaussian_filter(alpha, sigma=0.8)
alpha = np.clip(alpha, 0, 255).astype(np.uint8)

# 7. Create final image
result = np.zeros((h, w, 4), dtype=np.uint8)
result[:,:,:3] = arr[:,:,:3]  # Keep original colors
result[:,:,3] = alpha        # Apply new alpha

# 8. Save
Image.fromarray(result).save(DST, 'PNG')

# 9. Verification
v = Image.open(DST).convert('RGBA')
v_arr = np.array(v)
transparent = (v_arr[:,:,3] == 0).sum()
opaque = (v_arr[:,:,3] > 200).sum()
semi = ((v_arr[:,:,3] > 0) & (v_arr[:,:,3] <= 200)).sum()

print(f"\n3. Results:")
print(f"   Transparent: {transparent} ({100*transparent/(h*w):.1f}%)")
print(f"   Semi-transparent (soft edge): {semi} ({100*semi/(h*w):.1f}%)")
print(f"   Fully opaque: {opaque} ({100*opaque/(h*w):.1f}%)")
print(f"\n   Pixel samples:")
print(f"   - Top-left corner (should be transparent): {v_arr[5,5]}")
print(f"   - Center of cloud (should be opaque): {v_arr[h//2-50, w//2-100]}")
print(f"   - Blue outline area: {v_arr[262, 1166]}")
print(f"   - Text area: {v_arr[h//2+20, w//2+200]}")

# Key verification: white interior should be preserved
# Check the mascot's white body area
white_body_y, white_body_x = h//2 - 30, w//2 - 120
print(f"   - Mascot white body: {v_arr[white_body_y, white_body_x]}")

print(f"\n4. Saved to: {DST}")
print("DONE - Logo now has true alpha transparency")