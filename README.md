# 流光 / LUMEN

A dependency-free personal homepage with exactly 100,000 WebGL particles. Open index.html in a modern browser to preview.

## Visuals and behavior

- A blue/cyan luminous particle ring rotates, undulates, and flows automatically.
- Particle positions are computed on the GPU. No mouse, touch, or click interaction is attached.
- Particle count remains 100,000 on both desktop and mobile. Rendering resolution is capped to reduce GPU load.
- Animation pauses when the page is hidden and respects the system's reduced-motion preference.
- A static gradient remains available when WebGL is unavailable.
- No external scripts, fonts, media, backend, secrets, or dependencies are required.

## EdgeOne deployment

- Branch: main
- Framework preset: Other
- Root directory: ./
- Build command: leave empty
- Output directory: ./

Pushes to the connected deployment branch can trigger automatic deployment. Browser performance depends on the visitor's device; no frame-rate guarantee is implied.

## Validation

Verified in headless Chromium at 1440 x 900 and 390 x 844: 100,000 particles per draw, repeated animation frames, no JavaScript or WebGL errors, no horizontal overflow, and reduced-motion pause/resume. These checks do not establish frame rate on physical mobile hardware.
