# Legacy project imagery — approved design

## Goal and scope
Reuse the user's original project media in the existing portfolio repository
archive so relevant older work is easier to recognize. Preserve the current
portfolio style, source links, descriptions, search/filter controls and dated
live-evidence labels. Do not change the separate project repositories or their
hosted sites. No commit, push or deployment is requested.

## Approaches
- Recommended: add an image preview and accurate image caption to the seven
  matched archive cards. Compact, consistent with the existing archive and
  supported by the available material.
- Alternative: create seven separate case-study pages with galleries. This
  needs additional project narrative and evidence and exceeds the image refresh.

User approved the recommended current-portfolio archive-card approach on 2026-11-01.

## Confirmed mappings
Visual inspection covered all 63 raster originals; the remaining two files are
PDFs. Historical web.html/gameplan.html in f2fda21^ corroborate these associations.
The existing repository audit corroborates the corresponding project identities.

| Repository | Local original | Presentation |
| --- | --- | --- |
| Calculator | image/calculator.png | Original project artwork; illustrated calculator |
| food-ordering- | image/foodordering.png | Original project artwork; food-ordering promotional layout |
| topicshare | image/Topic and lesson that i found is interesting and helpful for student.png | Original project artwork; educational title graphic |
| Tic-Tac-Toe | image/tictactoe.PNG | Original project artwork; hand-drawn game board |
| cube-game | image/cubegame.png | Archived gameplay image; orange cube and obstacles |
| random-spawn-dodge | image/Game Over.png | Archived game-over screen |
| arthistory-RPG | image/game.PNG | Archived gameplay image; third-person character and inventory |

Do not assign personal photos, unrelated architecture work, generic logos or
uncertain commerce images to repositories on filename alone.

## Asset and card treatment
Copy only the selected images to public/project-previews/archive/ with stable,
readable names. Optimize copies to WebP, preserving aspect ratio and source
originals in ignored image/. Keep the new images within the existing static
export budget. Render with Next Image, base-path support, lazy loading, useful
alt text and contain sizing, with no cropping of the original composition.
Use a framed preview above the existing card content and a small honest caption.
Cards without a confirmed image retain their existing text presentation.
No new dependency, invented metrics, refreshed demo claim or runtime screenshot
claim for artwork.

## Validation
Regression coverage for correct repository/image mappings, originals remaining
local, packaged asset existence, and rendering of captions/base paths. Run lint,
TypeScript, unit tests, production build, static budgets, and browser checks for
archive search/filtering, image loading, mobile overflow and accessibility.

## Other requested work
- Ignore /image/ and remove it from the Git index without deleting local files.
  Keep project/governance notes tracked. This is explicitly authorized and done.
- Looping background music is a separate explanation/request: a music file is
  needed, user-initiated playback, loop, pause and volume controls. No track has
  been selected; this design does not add music or reinterpret interface beeps.
