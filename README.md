# EA Audio

Public website: https://ebinaugustin.github.io/ea-audio-website/

EA Analyser: `analyser.html`, Windows Edition 0.8.3, US$5 one-time via https://ko-fi.com/s/d8abc79313. The homepage includes a product announcement. `analyser.css` provides the product page and announcement styles. Screenshots use the existing public Ko-fi product image URLs; disclosure distinguishes interface renders from the actual REAPER screenshot.

Support center: `support.html` offers plugin-specific email bug reports, with Copy report as a fallback. It does not claim to submit or store reports. The account-based chat app is prepared separately in `work/ea-audio-helpdesk` and must have Supabase email authentication connected before it can replace this interim email workflow. No support backend secrets belong in this public repository.

The creator’s message to developers appears first. RoomMatch beta 0.2.3 follows, with direct installer links for Windows x64, Mac Apple Silicon, and Mac Intel.

Release: https://github.com/Ebinaugustin/EA-RoomMatch-Image-to-Reverb/releases/tag/v0.2.3-beta.1

To update downloads, edit `downloads.js` and the corresponding installer anchors and size labels in `index.html`. Bump script query versions after changes. GitHub Pages publishes the main branch automatically.

EA Native Automation: `automation.html`, with a homepage announcement and navigation link. Its ReaPack URL, platform availability and known issues are maintained on that page. Screenshot assets are in `assets/automation/`; the gallery and Copy URL button use `automation.js`.

Optional support: the homepage `#support` section links to [Ko-fi](https://ko-fi.com/ebinaugustin) and UPI ID `ebin.augustin55@oksbi` with no preset amount, plus a Copy ID fallback for desktop. Music links provide another way to support EA Audio. RoomMatch is free and will remain free forever; this promise does not apply to every EA Audio product. Contributions do not unlock RoomMatch downloads.



## 8-bit design

Approved and published on 12 November 2026. The site uses the existing charcoal, ivory and coral palette, self-hosted pixel and monospace fonts, an accessible mobile menu, pixel-art illustrations and direct product descriptions. The developer message is expandable at the top of the homepage. Existing download, purchase, music and support links are preserved.

The new design is in pixel.css and pixel.js; font licences are in assets/fonts/. All four public pages load this theme after their product styles.

Dialogue Alignment Engine: `alignment.html`, free Windows x64 2.0.0-preview, with a homepage announcement, shared navigation link and support-form selection. `alignment.css` provides its page/announcement styles. The actual compiled interface screenshot uses generated audio.

The versioned download in `downloads/dialogue-alignment-engine/2.0.0-preview/` includes VST3/ARA, unsigned AAX Native, documentation, licences and corresponding source. The separate README, validation and licence files are copies from that package. SHA256SUMS.txt verifies the full ZIP. Keep download filenames and checksums in sync when updating; do not silently replace a published version. AAX is unsigned and cannot load in standard retail Pro Tools. Real-host and production-dialogue qualification are pending.
