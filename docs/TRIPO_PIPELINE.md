# Future City · Tripo gift landmark pipeline

## Provenance and the submitted build

All five gift landmarks now use the creator's genuine Tripo Studio text-to-3D H2.5 exports. They are optimised to embedded 1024px JPEGs, preserve geometry, and ship without compression extensions. The rest of the island is procedural. See [TRIPO_PROVENANCE.md](TRIPO_PROVENANCE.md) for verified checksums, sizes, triangle counts and the disclosed task-URL/screenshot evidence gap.

## Prompt → generate → export GLB → optimize → load

1. In Tripo, generate each object from the exact prompt below. Keep the generation task ID, generation date, model version and an image of the result for provenance. Use an authorised Tripo account outside the game. Any API credential belongs only in a local environment or the Tripo interface, never in browser JavaScript, a URL, git or the submission bundle.
2. Export each actual generated result as a GLB with embedded textures. Keep the original export outside `dist`. Record its SHA-256 alongside the task ID.
3. In a local 3D editor or glTF optimisation tool, remove unused geometry, lights, cameras and animations; simplify to at most 20,000 triangles and 40 meshes; reduce textures to 1024px or smaller; pack everything into the GLB. Export without Draco, Meshopt or KTX2 dependencies. Preserve the silhouette and material colours. Target 1 MB per file; the loader enforces 1,400,000 bytes per file.
4. Save the optimised GLBs to the paths below. These are the **only** model URLs the browser loads. At most one chosen landmark is retained. No generation request, key or external host is used by the game.
5. Run `node scripts/check-landmark-assets.mjs`. Save a provenance record containing task IDs, prompts, original and optimised checksums, triangle counts, texture dimensions and tool versions. Do not publish credentials or temporary signed download URLs.
6. Run the game and choose each love option. Confirm the network response is 200, and the landmark loads without the fallback warning. Check the bounding-box fit, shadows, night view, replay, recipient tour and asset board. Run the device checklist in `QA.md`.
7. Only after genuine generated models pass those checks, update the submission's Tool Track claim to Tripo and describe which shipped assets were generated. Attach or link the real provenance record.

## Exact prompts

All prompts share: **stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base**.

| Choice | Landmark | Prompt | Shipped file |
| --- | --- | --- | --- |
| books | Library Tower | a slender library tower with arched windows and a rooftop garden, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base | `/assets/landmarks/books.glb` |
| music | Bandstand | a round open-air bandstand with a domed roof and string lights, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base | `/assets/landmarks/music.glb` |
| sport | Little Stadium | a tiny community football stadium with curved stands, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base | `/assets/landmarks/sport.glb` |
| stars | Observatory | a small domed observatory with a telescope slit on a hill, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base | `/assets/landmarks/stars.glb` |
| the sea | Lighthouse Garden | a striped lighthouse surrounded by a small flower garden, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base | `/assets/landmarks/sea.glb` |

## Runtime and failure handling

Three.js and GLTFLoader are vendored from the same npm release, **0.186.1**, with the MIT license. BufferGeometryUtils and SkeletonUtils are vendored from that release too. No CDN is involved. The model's bounding box is centered and grounded, then scaled uniformly to a footprint no larger than 1.2 game units and height no larger than 2.5. The plaza ring supplies a warm night glow. The scene's existing lights and shadows illuminate the model.

The loader checks GLB headers, limits the streamed bytes, forbids external buffers/images and required decoder extensions, and checks mesh/triangle/texture budgets. Missing, malformed, oversized or unsupported assets leave the original low-poly substitute in place and emit a console warning. Selection changes discard obsolete asynchronous loads. Reduced motion disables the rise animation.

v2 links contain only a validated landmark ID in `l`, not a model URL. v1 links have no landmark. City scores and letter outcomes are replayed from validated history; the stored score is never trusted for display.

## Reference

Tripo official quick start: https://developers.tripo3d.ai/en/docs/quick-start

Tripo official SDK: https://github.com/VAST-AI-Research/tripo-js-sdk

These are authoring references, not browser dependencies. Generating models may consume account credits. Retain the applicable asset rights and generation provenance with the source submission.
