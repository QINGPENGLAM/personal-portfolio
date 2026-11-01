# Selected background music

User supplied Downloads/morgan-ambient-calm-ambient-dreamscape-529861.mp3 after
asking to make the header audio control play looping background music.
Use this selected track in the existing checkout; no separate site or publishing.

Keep the complete supplied MP3, byte-identical, under public/audio/. Start only
from the existing header button, with no src/network request before activation.
Default off on every new document, continue across client-side routes, loop,
pause/cancel with the same button, default volume 20%, and provide a labeled
volume slider. Use HTML media playback; retain existing optional interface tones.
Handle rejected play requests and missing audio with a readable retryable status.
Prevent late playback promises from turning a canceled request back on.

Approach: self-host the supplied track so paths work under GitHub Pages. Remote
hotlinks would depend on another site's asset URLs; synthesizing or shortening
the selected track would change the user's music choice.

The 6.8 MB user-selected optional asset needs its own explicit 7.2 MB allowance.
Keep the original 12 MB non-music export cap and all four JS/CSS caps; also check
full export <=19.2 MB. Only the single selected MP3 may be excluded from the core
sum. Browser checks must prove no audio download before user activation.

Music: Calm Ambient Dreamscape, morgan-ambient, 3:42.
Source: https://pixabay.com/music/ambient-calm-ambient-dreamscape-529861/
License: https://pixabay.com/service/license-summary/
Live official pages checked 2026-11-01; track page marks it AI generated and free
for use under Pixabay Content License. Record credit/provenance; do not describe
this as public domain or transfer rights. No commit/push/deployment.

## User-directed follow-up
The user requested removing the visible track link, fading the controls to avoid
blocking page content, and sound by default. This supersedes the initial default-
off/no-download-before-click behavior. Attempt playback after mount; silently
handle autoplay NotAllowedError and retry after the first eligible click/key
outside audio controls. Manual pause/cancel disables that fallback. Browser
policy still controls whether sound may begin before interaction.

Remove only the visible track link; retain source/license provenance files.
Fade the volume panel after3s inactivity; reveal via pointer/focus and a separate
small volume button. Focus/hover inside the panel keeps it open. Hidden controls
are inert. The volume button must support touch without pausing playback; the
original note button retains its play/pause action. Music is not stopped by fading.

Autoplay policy reference checked 2026-11-01: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
