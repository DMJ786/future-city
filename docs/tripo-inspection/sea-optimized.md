
 OVERVIEW
 ────────────────────────────────────────────
| key                | value |
| ---                | ---   |
| version            | 2.0   |
| generator          | Tripo |
| extensionsUsed     | none  |
| extensionsRequired | none  |



 SCENES
 ────────────────────────────────────────────
| #   | name | rootName                                        | bboxMin              | bboxMax                  | renderVertexCount¹ | uploadVertexCount | uploadNaiveVertexCount |
| --- | ---  | ---                                             | ---                  | ---                      | ---                | ---               | ---                    |
| 0   |      | tripo_node_5226f222-ebb3-4b97-a7be-54c1fb4ade5b | -0.37187, 0, -0.3156 | 0.37187, 0.98984, 0.3156 | 29,964             | 7,847             | 7,847                  |

¹ Expected number of vertices processed by the vertex shader for one render
  pass, without considering the vertex cache.

² Expected number of vertices uploaded to GPU, assuming each Accessor
  is uploaded only once. Actual number uploaded may be higher, 
  dependent on the implementation and vertex buffer layout.

³ Expected number of vertices uploaded to GPU, assuming each Primitive
  is uploaded once, duplicating vertex attributes shared among Primitives.



 MESHES
 ────────────────────────────────────────────
| #   | name      | mode      | meshPrimitives | glPrimitives | vertices | indices | attributes                               | instances | size¹     |
| --- | ---       | ---       | ---            | ---          | ---      | ---     | ---                                      | ---       | ---       |
| 0   | meshes[0] | TRIANGLES | 1              | 9,988        | 7,847    | u32     | NORMAL:f32, POSITION:f32, TEXCOORD_0:f32 | 1         | 370.96 KB |

⁴ size estimates GPU memory required by a mesh, in isolation. If accessors are
  shared by other mesh primitives, but the meshes themselves are not reused, then
  the sum of all mesh sizes will overestimate the asset's total size. See "dedup".



 MATERIALS
 ────────────────────────────────────────────
| #   | name                                                | instances | textures         | alphaMode | doubleSided |
| --- | ---                                                 | ---       | ---              | ---       | ---         |
| 0   | tripo_material_5226f222-ebb3-4b97-a7be-54c1fb4ade5b | 1         | baseColorTexture | OPAQUE    |             |



 TEXTURES
 ────────────────────────────────────────────
| #   | name              | uri | slots            | instances | mimeType   | compression | resolution | size      | gpuSize⁵ |
| --- | ---               | --- | ---              | ---       | ---        | ---         | ---        | ---       | ---      |
| 0   | sea_basecolor.jpg |     | baseColorTexture | 1         | image/jpeg |             | 1024x1024  | 346.82 KB | 5.59 MB  |

⁵ gpuSize estimates minimum VRAM memory allocation. Older devices may require
  additional memory for GPU compression formats.



 ANIMATIONS
 ────────────────────────────────────────────
No animations found.


