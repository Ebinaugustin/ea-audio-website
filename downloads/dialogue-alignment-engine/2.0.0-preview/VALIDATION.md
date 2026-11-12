# Native 2.0.0 preview validation — 10 November 2026

Built Windows x64 Release bundles with MSVC 14.44, Windows SDK 10.0.26100.0, CMake, JUCE 8.0.12, ARA SDK 2.2.0 and Lua 5.4.8. The original Lua action remains version 1.4.5.

Four CTest entries passed:

1. **Native engine:** complex FFT reconstruction, integer interpolation, a known 3 ms delay and corrected audio residual, a 1-to-4 ms delay change near the third second, measured before/after spectra and cancellation, finite spectral output, automatic polarity, silence rejection and cancellation. These are generated 16 kHz fixtures, not recorded dialogue or matched vendor benchmarks.
2. **Processor workflow:** a stereo target/reference capture, background analysis, Apply, replay residual, immediate audio playback from a restored state, resetting a previously applied state, Revert and a rendered native interface preview. The same executable uses mocked REAPER APIs to check accessor lifetime, source replacement, undo-block balance, preservation of current item/take colours and selection, explicit peak building, recognition of external Undo, stale-input refusal and rollback after a rejected source swap. Mock sources are confined to a generated workspace fixture directory.
3. **VST3/ARA registration:** loaded the actual VST3 binary and enumerated its audio-effect, controller and ARA main-factory classes. Instantiated its ARA entry interface and verified the factory ID, archive ID and document-controller creation callback. This verifies real binary/interface registration; it does not exercise a complete host-bound ARA document.
4. **AAX binary registration:** loaded the actual unsigned AAX binary and verified its ACF registration export. This is not a Pro Tools qualification or a signing check.

The native UI preview was visually inspected. It is drawn by the compiled editor using synthetic captured audio, not a graphic mockup. It shows the embedded vector logo/name, two captured tracks, controls and applied-state interface.

Still pending: live REAPER item editing/Undo/Redo, ARA host binding and archive/playback round trips, host waveform/peak refresh, project save/reopen in real hosts, driver playback, production gain/fade cases, large-session behaviour, production dialogue listening and perceptual comparisons. Standard Pro Tools loading requires the Avid/PACE release process; no signing tools or credentials were provided. No Auto-Align Post quality or speed parity is claimed. No user project was opened or changed by these checks.

`test-results.log` contains the executed check output. `manifest.json` records binary and source hashes. These results apply only to the preview build in this package and do not replace host and listening qualification.
