# MacBook 3D model

`SynclyFilm` renders the photoreal model in this folder:

```
macbook_pro_m3_16_inch_2024.glb
```

**Attribution (required — CC-BY-4.0):**
"MacBook Pro M3 16 inch 2024" by **jackbaeten** — https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4
Licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/). Keep this
credit in the project (and in the video's end credits / description) when using it.

## How it's wired

`src/film/three/MacBook.tsx` loads the model (module-cached, via `useMacBookScene()`
called from the act/Hero level so `delayRender` flushes correctly), then:

- **auto-fits** it to the scene (scales to ~5 world units, recenters on the base);
- **re-skins the display** — the mesh using material `sfCQkHOWyrsLmor` gets the live
  Syncly UI texture (rendered to `public/screens/*.png`); orientation is baked in
  `useScreenTexture` (`flipY = true`);
- **animates the hinge** — the lid subtree `VCQqxpxkUlzqcJI_62` is reparented onto a
  pivot at the hinge line (`worldToLocal` + `attach`, so ancestor axis-conversion
  matrices are respected) and rotated by `lidOpen` (0 = closed, 1 = open).

If the file is missing, `MacBook.tsx` falls back to the procedural
`MacBookModel.tsx` automatically — no code change needed.

## Swapping the model

The anchors above (lid node name, screen material name, hinge point) are specific to
this glTF. A different model needs those re-resolved (inspect the `.glb`'s node/material
names and world bbox). Use a **non-Draco** `.glb` — the headless renderer has no Draco
decoder wired up.
