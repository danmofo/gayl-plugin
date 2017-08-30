# Give as you Live Omnibox search plugin

Adds Give as you Live search APIs to Google Chrome's [omnibox](https://developer.chrome.com/extensions/omnibox). Selecting an option adds the relevant part to the omnibox (e.g. "Merchant name: Amazon" would actually contain only `Amazon`) making it easy to look things up and copy things to the clipboard.

## Basic usage:

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

## Developing

1. Check out the [base-project](https://github.com/danmofo/base-project), make a note of where you checked it out.
2. Check out this repository.
3. Use the following to develop: `grunt devChromeExtension --src='/Users/danielmoffat/dev/gayl-plugin/src' --no-tests`, replacing the source with where you checked it out.
4. Open Chrome, visit [chrome://extensions](chrome://extensions), click **Load unpacked extensions**, pointing it to `./src/extension`.
5. Open a new tab and try it out!

### Producing a production ready build

1. Follow the above steps until you need to deploy.
2. Run the following: `grunt prodChromeExtension --src='/Users/danielmoffat/dev/gayl-plugin/src' --dest='/Users/danielmoffat/dev/gayl-plugin/dest' --no-tests`
3. The extension will be available in `/dest/extension`.

## Installing

TODO: add to Google Chrome web store, or find a way to distribute which doesn't involve adding unpacked extensions.

## Limitations:
- 5 entry limit in the omnibox (Chrome limitation)
- Only one omnibox command can be registered per plugin.. hence the gl c, gl m
- Omnibox entries get lost if Google suggests a search term for your query, e.g. gl m 808 vs gl m Boots, both the exact same queries but the first loses a suggestion.

## TODO

- Add to website
- Add other APIs
- Add some tests
- Replace the following libraries with smaller alternatives:
  - EJS, I'm only using a small amount of the functionality available.
  - Axios, again I'm only using this for GET requests. Possibly use `fetch`?
