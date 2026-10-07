# Future City — Build a city. Leave a letter.

Edition 10. Static Three.js/WebGL game for Tripothon S1, Game direction track.

Public game: https://future-city-next-generation.jmsd0811.chatgpt.site/

## Run and verify

With Node installed, `npm ci`, then `npm run dev`. Publish `dist` as static files; no backend, account, client key or runtime CDN is required. Open through HTTP, not `file://`.

- `npm test`: deterministic engine, gift validation/replay, five landmark fallbacks, real GLTFLoader parsing, audio lifecycle.
- `npm run test:dom`: stub-renderer sender/recipient flows, safe text, shares, return gifts, unsupported graphics/audio, cinematic control flow, complete guided-demo schedule and state restoration.
- `node scripts/check-landmark-assets.mjs`: local GLB presence, embedded-only format, size and SHA-256 checks.
- `docs/QA.md`: the short submission route—Tripo until 10 AM Sydney, five laptop/phone smoke checks, then record, review and host the demo. Desktop Safari, context-loss checks and FPS profiling are deferred until after submission. DOM tests cannot certify rendering or video output.

## Game

Dedicate the island and choose what the recipient loves. Restore six districts between 2050 and 2058 using forests, solar commons, homes and wetlands. Placement bonuses reward coastal wetlands, Foundry Hill solar and forest/housing neighbours. A storm arrives in 2053 and a heatwave in 2056. Win with all six districts restored, legacy at least 70 and every vital at least 50. Values are fictional, not climate predictions. Session progress is held in memory.

Balanced route: in 2050 build forest in 1, solar in 2, wetland in 3; in 2051 homes in 4; in 2053 solar in 5; in 2054 forest in 6; advance to 2058. Result: legacy 83, vitals 83 / 78 / 80 / 92.

## Gifts and safety

The URL hash carries a strict versioned JSON payload: names (40 characters maximum), district choices, history, stored score and, in v2, a landmark ID. The original v1 links remain supported and have no landmark. Scores and letters are recomputed from legal history; the stored score is ignored for display. Unknown fields, malformed types, oversized payloads, impossible purchases, duplicate districts, invalid indices or year ordering are rejected. All user strings are assigned through textContent, input values, plain-text downloads, speech or canvas text; they are never interpolated into HTML.

Recipients see who sent the city, take a skippable tour, read the personalised letter and can build a return gift with the sender prefilled. Native sharing falls back to clipboard or selectable text. Anyone holding a gift link can read its names and contents. Links are not authenticated proof of a sender's identity.

## Landmarks and Tripo status

Books → Library Tower; music → Bandstand; sport → Little Stadium; stars → Observatory; sea → Lighthouse Garden. The centrepiece rises into an illuminated plaza, appears in exports and changes one letter line. Replays and recipient tours finish on it.

The integration loads local `/assets/landmarks/{id}.glb` files with GLTFLoader from the same Three.js release (0.186.1). Models are centered and grounded by bounding box, fitted within 1.2 × 1.2 × 2.5 game units and checked against mesh, triangle, texture and file-size budgets. Remote resources/decoders are prohibited. Loading failure preserves an original procedural fallback and logs a warning.

**Current build: all five gift landmarks are genuine Tripo-generated H2.5 exports supplied by the creator.** Optimised assets ship with 1024px JPEGs and preserved geometry. Tool Track: Tripo. See `docs/TRIPO_PROVENANCE.md` for checksums and the disclosed missing task URLs/screenshots. Original exports are archived separately; this repository contains the optimized runtime assets.


## World and accessibility

Optional local Web Audio wind, waves and birdsong starts off. Bird density increases with restored districts. Background tabs suspend sound. Three small resident moments connect to the letter: a child under trees, a reader by a window and wetland-boardwalk neighbours. Reduced motion disables ambient movement, landmark rise and cinematic/typing requirements. Read-aloud is explicitly started by the player when supported.

Controls have a 44px minimum height, with safe-area spacing and a separate year/countdown dot. WebGL failure/context loss shows an illustrated postcard and description while the strategy controls and letters remain usable. The fallback's demo link currently opens the walkthrough/recording guide because no reviewed video has been exported. The social image is original illustrated key art, not a gameplay screenshot.

## Exports and submission

`submission.html` contains the judge-facing pitch and source download. Save postcard and letter from the ending. Download asset board exports four scene views, including the chosen landmark. Record 55-second demo captures a live example run: dedication/love (0–10s), restoration/storm (10–30s), completed night city/landmark (30–45s), letter/recipient/gift-back (45–55s). The recipient phase genuinely decodes the example's gift payload, presented in the recording overlay rather than a second browser tab. The silent recording restores the original city and presentation. Keep the tab visible, then watch the saved file. Unsupported browsers can use the device screen recorder.

The build environment's browser preview was blocked (`ERR_BLOCKED_BY_CLIENT`), so no visual playthrough, physical-phone run, audible-output check, FPS measurement, or video/PNG export inspection is claimed. The static 1200×630 social image was visually inspected. Complete `docs/QA.md`, attach the watched recording and asset board, and verify the current rules/deadline on the organiser's site before submitting. Nothing has been automatically submitted or posted socially.

Three.js, GLTFLoader, BufferGeometryUtils and SkeletonUtils use the included MIT license. Original code and procedural geometry were developed with OpenAI Codex assistance.

## Camera controls

Drag to rotate. Pinch on touchscreens, scroll on desktop, or use the accessible + / − buttons to zoom. Zoom buttons also work in Cinema view. Reset camera returns to the original view. Automated gesture tests run with `npm test`; real-device touch and visual QA remain outstanding.

## Submission media downloads (Edition 10)

Use **Download submission images** in the footer to capture an example winning city with the selected landmark (Library Tower by default). It offers a 1920 × 1080 cover plus four separate PNG scene views, either individually or as one ZIP. Upload the cover and at least three individual scene files. The current game and camera are restored afterwards. A warning identifies any procedural landmark fallback.

Use **Record 90-second submission** for the form's 1–2 minute requirement. This records actual WebGL gameplay with captions, from dedication to the letter and decoded recipient gift. Keep the tab visible. The downloaded WebM or MP4 can be uploaded directly. It is silent; voiceover is optional. The original 55-second button remains available. Recording uses a fixed landscape canvas even on a portrait phone.

The export flow, ZIP format and both recording timelines have automated coverage. Actual rendered images, codecs and phone downloads have not been visually verified in this environment. Review downloaded files before submitting.
