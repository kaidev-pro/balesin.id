#!/usr/bin/env python3
"""Remove white background from Balesin.id logo, preserving interior white."""

import io
import numpy as np
from PIL import Image
from rembg import remove, new_session
from scipy.ndimage import gaussian_filter, binary_dilation, binary_erosion

SRC = "/mnt/c/Users/Bagus/Downloads/ChatGPT Image Jun 23, 2026, 07_19_23 AM.png"
DST = "public/brand/logo-balesin-transparent.png"

print("1. Loading original...")
img_orig = Image.open(SRC)
print(f"   Size: {img_orig.size}, Mode: {img_orig.mode}")

img = img_orig.convert('RGBA')
arr_orig = np.array(img)

# 2. Use rembg AI model to separate foreground from background
print("2. Running rembg AI background removal (u2net)...")
session = new_session('u2net')
with open(SRC, 'rb') as f:
    data = f.read()
out_data = remove(data, session=session)
img_rb = Image.open(io.BytesIO(out_data)).convert('RGBA')
arr = np.array(img_rb)

h, w = arr.shape[:2]
print(f"   Foreground pixels: {(arr[:,:,3] > 0).sum()} / {h * w}")

# 3. Flood-fill from edges to find external white background
def is_white(p):
    return int(p[0]) > 200 and int(p[1]) > 200 and int(p[2]) > 200

external = np.zeros((h, w), dtype=bool)
from collections import deque

q = deque()
for x in range(w):
    if is_white(arr[0, x]) and arr[0, 3] > 0:
        external[0, x] = True
        q.append((0, x))
    if is_white(arr[h-1, x]) and arr[h-1, 3] > 0:
        external[h-1, x] = True
        q.append((h-1, x))
for y in range(h):
    if is_white(arr[y, 0]) and arr[y, 3] > 0:
        external[y, 0] = True
        q.append((y, 0))
    if is_white(arr[y, w-1]) and arr[y, 3] > 0:
        external[y, w-1] = True
        q.append((y, w-1))

visited = external.copy()
while q:
    y, x = q.popleft()
    for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]:
        ny, nx = y+dy, x+dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            if is_white(arr[ny, nx]) and arr[ny, 3] > 0:
                visited[ny, nx] = True
                external[ny, nx] = True
                q.append((ny, nx))

print(f"3. External white pixels found: {external.sum()}")

# 4. Build final alpha mask
# Keep everything that's NOT external white
final_float = arr[:,:,3].astype(float)

# Set external white pixels to 0
final_float[np.where(external)] = 0

# Feather the boundary of the external area for smooth edge
external_exp = binary_dilation(external, iterations=3)
boundary = external_exp & ~binary_erosion(external, iterations=5)
# boundary pixels that were external → already 0; boundary pixels near foreground → smooth
# Smooth the alpha
blurred = gaussian_filter(final_float, sigma=0.5)
alpha = np.clip(blurred, 0, 255).astype(np.uint8)

result = np.zeros((h, w, 4), dtype=np.uint8)
result[:,:,:3] = arr[:,:,:3]
result[:,:,3] = alpha

# 5. Save
Image.fromarray(result).save(DST, 'PNG')

# 6. Verify
v = np.array(Image.open(DST).convert('RGBA'))
tp = (v[:,:,3] == 0).sum()
op = (v[:,:,3] > 0).sum()
print(f"4. Saved transparent logo: {DST}")
print(f"   Transparent: {tp}, Opaque: {op}")
print(f"   Top-left pixel: {v[0,0]}")
print(f"   Center pixel: {v[h//2, w//2]}")
print("DONE: Background removed successfully")
