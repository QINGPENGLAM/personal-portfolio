# Phase 2 World Asset Guide

Phase 2 uses procedural React Three Fiber geometry for the world, character, and landmarks. Replace it incrementally in Phase 3 or later, while preserving the approved content hierarchy, landmark IDs, routes, quality modes, and accessible fallback.

Phase 3 adds distinct procedural placeholders for DevDoctor and Immich AI Photo Search. Any replacement model must preserve each project slug, focus position, case-study trigger, accessible HTML control, and browser-history behavior.

Phase 7 adds procedural energy falls, floating islands, lanterns, stepping stones, and a moon treatment. External replacements must retain the guided-tour camera sightlines, keep the central AI core visible from the identity stop, and provide simplified or omitted variants for Performance quality.

## Coordinate and scale contract

- Format: GLB preferred; GLTF only when external textures are necessary
- Coordinate system: Y-up, right-handed
- World origin: central AI core at `(0, 0, 0)`
- Units: 1 unit = 1 meter
- Character target height: 1.7 units
- Ground contact: model feet or building base at Y = 0
- Forward direction: +Z

## Naming

Use lowercase kebab-case names:

- `landmark-devdoctor-core.glb`
- `landmark-immich-observatory.glb`
- `environment-cherry-tree-a.glb`
- `prop-wayfinding-marker.glb`

Mesh names should identify role and variant, such as `building_shell_a`, `emissive_ring_01`, and `collision_simple`.

## Initial budgets

| Asset | Desktop target | Mobile target |
| --- | ---: | ---: |
| Hero landmark | ≤ 60k triangles | ≤ 25k triangles |
| Secondary landmark | ≤ 30k triangles | ≤ 12k triangles |
| Repeated prop | ≤ 4k triangles | ≤ 1.5k triangles |
| Character placeholder | ≤ 35k triangles | ≤ 18k triangles |
| Texture set | 2K maximum | 1K maximum |

Prefer instancing for repeated trees, rocks, lights, particles, and path markers.

## Export and optimization

1. Apply transforms and remove hidden geometry.
2. Keep material count low and atlas small props when practical.
3. Export GLB with tangents only when required by the material.
4. Compress geometry with Meshopt or Draco after visual approval.
5. Convert large color/normal textures to KTX2 where device support is acceptable.
6. Provide simplified collision meshes separately from visual geometry.
7. Test the asset in High, Balanced, and Performance quality modes.

## Replacement workflow

1. Keep the landmark `id`, route, and content reference unchanged.
2. Add the optimized asset under `public/models/`.
3. Register its URL and scale in the future world asset manifest.
4. Verify focus framing on desktop and mobile.
5. Confirm the non-WebGL recruiter route still exposes the same content.

## Licensing

Store source, author, license, and attribution requirements beside every third-party asset. Do not ship assets with unclear commercial or redistribution rights.
