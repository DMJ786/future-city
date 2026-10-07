
 OVERVIEW
 ────────────────────────────────────────────
| key                | value                                  |
| ---                | ---                                    |
| version            | 2.0                                    |
| generator          | Tripo                                  |
| extensionsUsed     | KHR_materials_volume, FB_ngon_encoding |
| extensionsRequired | none                                   |


warn: Missing optional extension, "FB_ngon_encoding".

 SCENES
 ────────────────────────────────────────────
| #   | name | rootName                                        | bboxMin               | bboxMax                   | renderVertexCount¹ | uploadVertexCount | uploadNaiveVertexCount |
| --- | ---  | ---                                             | ---                   | ---                       | ---                | ---               | ---                    |
| 0   |      | tripo_node_6de25b26-fb9c-498a-865e-385749a2ae56 | -0.46097, 0, -0.48082 | 0.46097, 1.00128, 0.48082 | 29,958             | 7,021             | 7,021                  |

¹ Expected number of vertices processed by the vertex shader for one render
  pass, without considering the vertex cache.

² Expected number of vertices uploaded to GPU, assuming each Accessor
  is uploaded only once. Actual number uploaded may be higher, 
  dependent on the implementation and vertex buffer layout.

³ Expected number of vertices uploaded to GPU, assuming each Primitive
  is uploaded once, duplicating vertex attributes shared among Primitives.



 MESHES
 ────────────────────────────────────────────
| #   | name      | mode      | meshPrimitives | glPrimitives | vertices | indices | attributes                               | instances | size¹    |
| --- | ---       | ---       | ---            | ---          | ---      | ---     | ---                                      | ---       | ---      |
| 0   | meshes[0] | TRIANGLES | 1              | 9,986        | 7,021    | u32     | NORMAL:f32, POSITION:f32, TEXCOORD_0:f32 | 1         | 344.5 KB |

⁴ size estimates GPU memory required by a mesh, in isolation. If accessors are
  shared by other mesh primitives, but the meshes themselves are not reused, then
  the sum of all mesh sizes will overestimate the asset's total size. See "dedup".



 MATERIALS
 ────────────────────────────────────────────
| #   | name                                                | instances | textures         | alphaMode | doubleSided |
| --- | ---                                                 | ---       | ---              | ---       | ---         |
| 0   | tripo_material_6de25b26-fb9c-498a-865e-385749a2ae56 | 1         | baseColorTexture | OPAQUE    |             |



 TEXTURES
 ────────────────────────────────────────────
| #   | name                | uri | slots            | instances | mimeType   | compression | resolution | size      | gpuSize⁵ |
| --- | ---                 | --- | ---              | ---       | ---        | ---         | ---        | ---       | ---      |
| 0   | Music_basecolor.jpg |     | baseColorTexture | 1         | image/jpeg |             | 2048x2048  | 785.23 KB | 22.37 MB |

⁵ gpuSize estimates minimum VRAM memory allocation. Older devices may require
  additional memory for GPU compression formats.



 ANIMATIONS
 ────────────────────────────────────────────
No animations found.


