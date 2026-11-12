# Dialogue Alignment Engine 2.0.0 — native development preview

Windows x64 VST3 with ARA 2 support, plus an **unsigned AAX Native development build**. Both embed the audio processor and runtime; the Lua action is not needed to run the plug-in. This is a new native port, not a qualified production release or proof of commercial-equivalent audio quality.

## Install the VST3

Copy the entire `Dialogue Alignment Engine.vst3` **folder** into a VST3 folder scanned by REAPER, then rescan plug-ins. A standard shared location is `C:\Program Files\Common Files\VST3`, which may require administrator access. Alternatively, put it in your own plug-in folder and add that folder to REAPER's VST scan paths. Keep the bundle's `Contents` directory intact. Insert **VST3: Dialogue Alignment Engine (Ebin Augustin)** on a track.

The original `Dialogue Alignment Engine.lua` 1.4.5 remains a separate, unchanged fallback. Do not replace that action with the native plug-in files.

## REAPER selected-item workflow

1. Select same-performance audio items on the primary and target microphone tracks.
2. Open the native plug-in and press **Capture**. Choose the primary track.
3. Choose **Dynamic time** or **Time + phase**, the search range and polarity mode. Press **Analyze**. Processing runs on a background worker; the status and moving footer indicator show activity. Analyze becomes Cancel while processing.
4. Use **Original / Aligned** to audition. **Apply** keeps accepted corrections directly, without a confirmation dialog. **Revert** restores the captured sources. Source changes use REAPER undo blocks, keep current item/take colours and selection, and build peaks for the replacement sources.
5. Captured source, position, offset, relevant item/take properties and original file metadata are checked before Apply. Conflicting edits require a new capture. Revert does not overwrite a conflicting source edit. Original media files are not overwritten.

Corrected 32-bit float WAV files are written under the project's `Dialogue Alignment Renders` folder. Include this folder when moving or sharing a project. Retain ever-attached render files for saved projects and Undo/Redo. REAPER-mode Revert is session-local, as in the Lua action; after closing/reopening a project, the corrected media remains part of the project.

Capture supports whole normal-rate mono/stereo file takes, without take FX/envelopes, stretch markers, loops, grouping, locks, reversed/section sources or existing inverted take/track polarity. Track effects are outside the pairwise source analysis. Total captured audio is capped at 512 MB and individual clips at ten minutes. Native host gain/fade interpretation still needs real-session qualification.

## ARA document workflow

The VST3 advertises an ARA factory and playback/editor integration. In an ARA-capable host, enable the plug-in as an ARA extension for all involved microphone tracks/regions, using the host's normal ARA workflow. ARA exposes only regions assigned to its document; inserting an ordinary effect on one unrelated track does not grant access to every project track.

Use **Views > Capture ARA document** to explicitly choose ARA random access in REAPER. In another ARA host, Capture uses its ARA document automatically. The overview includes all assigned regions and track sequences; choose the reference, Analyze, audition and Apply. ARA corrections stay in the model and are serialized through the host's ARA archive rather than replacing project media. Uncommitted ARA previews are staged separately from committed archive data. Model changes after capture invalidate Apply. Host callbacks, archive round trips and audible playback require further REAPER/ARA-host qualification.

ARA regions with unequal playback/modification durations are refused for analysis; render stretched material to normal-rate audio first. Unprocessed ARA playback uses read-ahead readers, and corrected regions use the cached output. Offline playback waits for source reads. This preview is not an ARA host certification.

## AAX and ordinary non-ARA hosts

The AAX bundle is **unsigned**. Its compilation does not make it loadable in standard retail Pro Tools. Avid developer testing facilities or the official PACE signing/release process are needed. No Avid or PACE accounts, credentials or keys have been supplied or configured. See [Avid's AAX developer information](https://developer.avid.com/aax/).

This AAX target is Native, not HDX DSP, and does not provide ARA binding or an AudioSuite workflow. It shares the engine and editor. In a host without ARA or REAPER's native API:

1. Insert the effect on the target and route the primary microphone to its **Reference** sidechain.
2. Enable the reference bus, press Capture, and play continuously through the dialogue. Press **Stop capture** afterwards. The current capture limit is 30 seconds; seeking/looping during capture rejects the capture.
3. Analyze, then replay the same timeline to compare Original and Aligned. Apply keeps the corrected snapshot in plug-in state; Revert returns to normal input. Applied sidechain renders are stored in the host's plug-in state.

This is an offline capture-and-replay workflow, not continuous analysis of new incoming material. Recapture after editing the source performance, insert chain, gain or timing. Use the host's own transport where host transport control is unavailable. Each AAX instance handles its own target and reference; it does not enumerate Pro Tools project items or inherit REAPER-only APIs.

## Interface

The native vector logo and **Ebin Augustin** name are embedded. In REAPER, the interface reads the active theme colours and adjusts text contrast. Other hosts use the native default palette.

All captured tracks and clips appear in the waveform overview. Wheel zooms time, Shift-wheel pans time, Ctrl-wheel zooms lane height, and Alt-wheel pans enlarged lanes. Double-click or Fit restores the full overview. Scrollbars appear only after zooming their axes. Clicking/dragging waveforms moves the REAPER cursor; clicks select corresponding REAPER items, and Shift-drag updates REAPER's time selection. ARA uses its host playback-position request. Optional measured statistics, delay, spectrum, phase/coherence, correlation and comb views are selected under Views. Click a target waveform to choose its diagnostics. Display spectra sample eight blocks; the complete output receives processing.

The native port currently exposes Dynamic time and Time + phase. Legacy Lua-only options such as custom band/profile editing, sparse marker and track-offset correction modes, candidate editing, and export reports remain in the companion action. This native preview does not claim complete feature or host-behaviour parity with either that action or Auto-Align Post.

## Engine and build

The original 1.4.5 deterministic core and continuous/spectral processor are embedded in an internal Lua 5.4.8 runtime. Double-precision FFT and the matching 32-tap interpolation are implemented in C++; processing and diagnostics run off the audio callback. The audio callback plays immutable cached results; host API reads/edits stay on the message thread. Analysis resampling uses a windowed low-pass interpolator. The native routing, resampling and host wrappers are new code and require qualification beyond the original Lua test evidence.

Source is included with the release. Dependencies are JUCE 8.0.12, ARA SDK 2.2.0 and Lua 5.4.8. `deps/ARA_SDK/dependency-commits.json` pins the exact ARA API/library commits. JUCE includes the AAX SDK sources used for the unsigned build. The source distribution uses the open-source licensing options of these dependencies; preserve their notices and see LICENSES.

For source builds, install a Windows C++ toolchain and CMake 3.22+. Configure with `cmake -S . -B build -DJUCE_SOURCE_PATH=path/to/JUCE` from a suitable developer shell, then build the `DAE_VST3`, `DAE_AAX`, `dae_engine_tests`, `pc` and `dae_format_probe` targets. `prepare.py` regenerates the embedded processor from the companion Lua action; generated sources are already included. `fetch_ara.py` downloads the pinned public ARA release if needed. The build helper accepts explicit JUCE, compiler and Windows SDK paths.

Executed checks and remaining host validation are recorded in `VALIDATION.md`. No user REAPER or Pro Tools project was opened or modified by the native build checks.
