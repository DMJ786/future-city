# Future City · submission route

**Scope: fix broken behavior only. No new features.**

## 1. Tripo landmarks — stop at 10:00 AM Sydney, 6 October 2026

Use the five prompts in [TRIPO_PIPELINE.md](TRIPO_PIPELINE.md) in Tripo Studio. For each generated model, save its task ID and a screenshot as proof. Export an embedded GLB under **1,400,000 bytes**, with **no Draco compression**, at most **20,000 triangles**, at most 40 meshes and textures no larger than 1024px. If the export offers a face-count limit, choose 20k or below and check the resulting triangle count.

Save into `dist/assets/landmarks/`:

| File | Landmark |
| --- | --- |
| `books.glb` | Library Tower |
| `music.glb` | Bandstand |
| `sport.glb` | Little Stadium |
| `stars.glb` | Observatory |
| `sea.glb` | Lighthouse Garden |

Run `node scripts/check-landmark-assets.mjs`. Missing-file messages mean the procedural fallback is being used; they are not proof of a successful Tripo integration. Check the actual generated models in the game. Claim Tripo use only for genuine models that ship, with their task IDs and screenshots. If generation/export is not working by 10 AM, stop and ship the procedural version.

## 2. Laptop + phone smoke test — about one hour

Run these five checks on a real laptop and phone. Fix only failures.

1. **Fresh load:** open an incognito/private tab. Dedicate the city, choose “What do they love?”, and confirm the landmark appears in daylight and night view.
2. **Winning route:** in 2050, build Forest, Solar and Wetland in districts 1–3. Advance to 2051 and build Homes in district 4. Advance to the 2053 storm and build Solar in district 5. In 2054, build Forest in district 6. Advance to 2058. Expect **legacy 83 and a thriving ending**.
3. **Gift loop:** send the laptop’s gift link and open it on the phone. Confirm “A gift from…”, the tour, the landmark line in the letter, and “Build one for…” starting a new city with the sender prefilled.
4. **Name safety:** use `<img src=x onerror=alert(1)>` as the dedication. It must appear literally as text, without an image or popup, including when the recipient opens the link.
5. **Phone layout:** at 375px width, scroll through the game and ending. Every button must be reachable, and nothing clipped or hidden behind the phone’s safe area. Spread two fingers to zoom in, bring them together to zoom out, try + / − in normal and Cinema views, and reset the camera. Pinching must not select a district; one-finger dragging must still rotate.

## 3. Record, review and host the demo — about one hour

Record the winning route. Use “Record 90-second submission”; if it stutters, use the phone’s screen recorder. Show dedication and landmark choice, restoration and the storm, the completed city at night, then the recipient opening the gift in the **final 10 seconds**.

Watch the complete saved recording: names must be readable, there must be no black frames, and the gift opening must be present. Review is required even if the recording button reports success.

Use a genuine MP4, not a renamed WebM. If conversion is needed, convert the actual recording before hosting. Save the reviewed file as `dist/demo.mp4`, update the WebGL fallback link in `dist/index.html` to `/demo.mp4`, publish, and open the hosted video once on the phone. Keep the original total added-assets budget below 8 MB. Do not point the fallback at a file that does not exist.

Submit the public game, watched demo and required entry materials. Export and briefly inspect the asset board as part of preparing those materials.

## Only after submitting, if time remains

Desktop Safari, context-loss testing and FPS profiling. These are deferred, not claimed as passed.

## Current evidence

Existing automated engine, gift/schema, GLB parser, DOM flow and demo-timeline tests passed for Edition 06. They do not replace the five physical-device checks above.

All five supplied Tripo GLBs have now been inspected and optimised. They pass size/schema checks and the real GLTF parser with decoded JPEGs, zero fallbacks, grounded bounds and plaza fit. Task URLs/screenshots were not present among the received attachments; see `TRIPO_PROVENANCE.md`. The game preview still returns `ERR_BLOCKED_BY_CLIENT`; night appearance, in-game board export, phone rendering and recording remain unverified. No `demo.mp4` exists yet.

Edition 09 adds pinch zoom and 44px-or-larger zoom buttons, including Cinema view. Automated gesture tests cover bounds, cancellation, switching from pinch to drag and accidental-tap prevention; actual touch behavior and layout still need a phone check.

Edition 10 provides a cover plus four separate 1920 × 1080 captures through “Download submission images”. Download each PNG or extract the ZIP, then upload at least three separate scene images. The original four-panel board button is still available. The 90-second recording meets the visible form duration; both 55- and 90-second timelines pass automated tests. Real rendering, full playback and mobile download checks remain outstanding.
