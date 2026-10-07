# Future City · Tripo landmark provenance

Landmarks generated with Tripo AI. All five gift landmarks were supplied by the creator as genuine Tripo Studio text-to-3D exports. All five GLBs independently declare `asset.generator: Tripo`. The rest of the island remains procedural.

**Evidence gap:** only the five GLBs arrived in this upload. The stated task URLs/IDs and screenshots were not present among the received attachments. No URLs, task IDs or screenshots have been invented. UUIDs embedded in model node names are recorded below as model identifiers, not asserted to be generation task IDs.

## Generation settings (creator-supplied)

Tripo Studio text-to-3D; model **H2.5**; requested polycount **10,000**; triangle topology; original texture **2K**; **PBR off**; **Remove Lighting off**. The creator states each generation used the corresponding pipeline prompt. These settings and prompt history are supplied by the creator rather than recoverable from the GLB.

## Optimisation and validation

Inspected original and optimised files using `@gltf-transform/cli 4.5.1 inspect --format md`; reports are in `docs/tripo-inspection/` in the source. JPEGs resized to 1024×1024 using Sharp, quality 92 with 4:4:4 chroma. Removed KHR_materials_volume and FB_ngon_encoding declarations and payloads. No Draco, Meshopt, KTX2 or WebP. Every non-image bufferView (positions, indices, normals and UVs) is byte-identical; PBR material factors are unchanged. JPEG resizing/re-encoding is lossy but no colour grading, lighting removal or recolouring was applied.

All files have one mesh, one material, one embedded JPEG, no used/required extensions, and pass the 1,400,000-byte limit. The real vendored GLTFLoader parsed all five with JPEG decoding and zero fallbacks. Grounded bounds and the 1.2-unit plaza footprint were checked numerically. This is not a GPU rendering test.

## books.glb

- Prompt: a slender library tower with arched windows and a rooftop garden, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base
- Task URL / task ID: not received.
- Screenshot: not received.
- Embedded model node: `tripo_node_0126388c-9017-4962-a9fa-8fa176c1ecc4`.
- Model and settings: H2.5; text-to-3D; 10,000 requested polygons; triangles; 2K; PBR off; Remove Lighting off (creator-supplied).
- Actual triangles: **9,992**.
- Meshes / materials: **1 / 1**.
- Texture: **2048×2048 JPEG → 1024×1024 JPEG**.
- File size: **1,580,336 → 850,148 bytes**.
- Original SHA-256: `2115d9d40d3d202a45f61c6ba81572a845acd803174ba340021d0c32b2947834`
- Optimised SHA-256: `8ceef419197c3226f27d44c8b520f64773858209d939111f08624a14a52fe5f0`

## music.glb

- Prompt: a round open-air bandstand with a domed roof and string lights, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base
- Task URL / task ID: not received.
- Screenshot: not received.
- Embedded model node: `tripo_node_6de25b26-fb9c-498a-865e-385749a2ae56`.
- Model and settings: H2.5; text-to-3D; 10,000 requested polygons; triangles; 2K; PBR off; Remove Lighting off (creator-supplied).
- Actual triangles: **9,986**.
- Meshes / materials: **1 / 1**.
- Texture: **2048×2048 JPEG → 1024×1024 JPEG**.
- File size: **1,131,364 → 633,252 bytes**.
- Original SHA-256: `fc502cd80d4980bbb2bdd6168c71fa0266894a020e9762c648184687cb20eff2`
- Optimised SHA-256: `5c28a58e61f41993c49e88984023db6c33a14b9d988e1a16d3b5af9e91d2212e`

## sport.glb

- Prompt: a tiny community football stadium with curved stands, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base
- Task URL / task ID: not received.
- Screenshot: not received.
- Embedded model node: `tripo_node_73e6603a-6a18-461a-bf95-3983898159f9`.
- Model and settings: H2.5; text-to-3D; 10,000 requested polygons; triangles; 2K; PBR off; Remove Lighting off (creator-supplied).
- Actual triangles: **9,978**.
- Meshes / materials: **1 / 1**.
- Texture: **2048×2048 JPEG → 1024×1024 JPEG**.
- File size: **1,262,724 → 702,836 bytes**.
- Original SHA-256: `7868bcba420e2f5b1a40376e863f8033bf0fa7f7611eaa0277c31f13b2aff7bf`
- Optimised SHA-256: `3631c7e7929eddb1af2d9326d21ffaf2e80027412f9fc8c85adf4ed45dd92321`

## stars.glb

- Prompt: a small domed observatory with a telescope slit on a hill, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base
- Task URL / task ID: not received.
- Screenshot: not received.
- Embedded model node: `tripo_node_04550591-d775-4158-99f2-4caeab354868`.
- Model and settings: H2.5; text-to-3D; 10,000 requested polygons; triangles; 2K; PBR off; Remove Lighting off (creator-supplied).
- Actual triangles: **10,000**.
- Meshes / materials: **1 / 1**.
- Texture: **2048×2048 JPEG → 1024×1024 JPEG**.
- File size: **981,972 → 549,960 bytes**.
- Original SHA-256: `4be73a8fe7d651547c2c143b8d1c07c6448c1912ac253a63a78cbb98027f2a97`
- Optimised SHA-256: `148a1c19e2a760cbb87bf7f0b52de87e765979f6173cc06a4ba85d14bb2f8bbb`

## sea.glb

- Prompt: a striped lighthouse surrounded by a small flower garden, stylized low-poly miniature, soft pastel colours, clean geometry, diorama style, single object, no base
- Task URL / task ID: not received.
- Screenshot: not received.
- Embedded model node: `tripo_node_5226f222-ebb3-4b97-a7be-54c1fb4ade5b`.
- Model and settings: H2.5; text-to-3D; 10,000 requested polygons; triangles; 2K; PBR off; Remove Lighting off (creator-supplied).
- Actual triangles: **9,988**.
- Meshes / materials: **1 / 1**.
- Texture: **2048×2048 JPEG → 1024×1024 JPEG**.
- File size: **1,306,588 → 719,304 bytes**.
- Original SHA-256: `ad7106cb32b5eebff246542d332e10c3f70c963c5ac069068119558dfcb2d140`
- Optimised SHA-256: `9d2ac444fc92d2b5e554456169d40d972f9c2a7f8f0471a2530544982fd92f83`

## Files and visual verification

Unmodified originals are retained in `assets-originals/tripo/`, outside the published `dist` directory. Optimised models are in `dist/assets/landmarks/`. Original models are retained in the source repository; the downloadable source ZIP includes the optimised shipped models.

Total optimised GLBs: **3,455,500 bytes**. Browser preview access returned `ERR_BLOCKED_BY_CLIENT`. Consequently, night lighting was not visually checked or adjusted, the in-game asset board was not re-exported, and the illustrated social card was not refreshed. The current social image is labelled illustrated key art, not a game screenshot. Export the updated board in the live game after the selected Tripo landmark has loaded.
