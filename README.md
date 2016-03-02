Give as you Live search plugin
===

Adds Give as you Live search APIs to Google Chrome's [omnibox](https://developer.chrome.com/extensions/omnibox). Selecting an option adds the relevant part to the omnibox (e.g. "Merchant name: Amazon" would actually contain only `Amazon`) making it easy to look things up.

Basic usage:
---

`gl <query>`

Where **query** can be any of the following:

- `1517` (EC ID)
- `Starlight` (Charity name)
- `Amazon` (Merchant name)
- `2000` (Merchant ID)

Prefix the query with either `m` or `c` to limit the search to that API. Adding a prefix returns more detailed information.

- `gl m 2000`, searches merchant api for `2000`
- `gl c Starlight`, searches cause api for `Starlight`
- `gl m Amazon`, searches merchant api for `Amazon`
- `gl c 15175`, searches cause api for `15175`


Limitations:
---
- 5 entry limit in the omnibox (Chrome limitation)
- Only one omnibox command can be registered per plugin.. hence the gl c, gl m

Todo:
---

- Clean up code.
- Add other APIs