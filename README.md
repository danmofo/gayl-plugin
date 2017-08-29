Give as you Live search plugin
===

Adds Give as you Live search APIs to Google Chrome's [omnibox](https://developer.chrome.com/extensions/omnibox). Selecting an option adds the relevant part to the omnibox (e.g. "Merchant name: Amazon" would actually contain only `Amazon`) making it easy to look things up and copy things to the clipboard.

Basic usage:
---

![GAYL Plugin demo](demo.gif?raw=true "GAYL Plugin demo")

`gl <query>`

Where `<query>` can be any of the following:

- `1517` (EC ID)
- `Starlight` (Charity name)
- `Amazon` (Merchant name)
- `2000` (Merchant ID)

Prefix the query with either `m` or `c` to limit the search to that API. Adding a prefix returns more detailed information.

- `gl m 2000`, searches merchant api for `2000`
- `gl c Starlight`, searches cause api for `Starlight`
- `gl m Amazon`, searches merchant api for `Amazon`
- `gl c 15175`, searches cause api for `15175`

Installing
---

You need [this](https://github.com/danmofo/base-project) project's `Gruntfile`.

1. Checkout source.
2. `grunt devChromeExtension --src='/whereever/you/checked/it/out'`.
3. Open `chrome://extensions` -> `'Load unpacked extensions'` -> `/src/extension`.
4. Open a new tab and try it.

Limitations:
---
- 5 entry limit in the omnibox (Chrome limitation)
- Only one omnibox command can be registered per plugin.. hence the gl c, gl m
- Omnibox entries get lost if Google suggests a search term for your query, e.g. gl m 808 vs gl m Boots, both the exact same queries but the first loses a suggestion.

Todo:
---

- Add task to package extension for production
- Add to website
- Add other APIs
- Replace huge libraries with smaller ones! The output size right now is hilariously bad.

Known bugs
---

Doesn't support spaces in queries :)
