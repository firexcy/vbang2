# bang2 - DDG-style Bangs with customizations

A simple Node script that emulates DuckDuckGo-style Bangs (search engine shortcuts).

The script —

1. expose an API endpoint `/` at port `3000` that accepts a single parameter `q` from HTTP GET calls; and
2. parse `q` to determine whether there is a prefixing or affixing “bang” string (defined as a space-delimited string comprising of a leading exclamation mark followed by a sequence of alphanumerics) and —
    1. if there is exactly one bang string as defined, look up it with the leading exclamation mark truncated, against the `user.js` file, which is an array of pairing `t` and `u` keys —
        1. if there is a matching `t` key, navigate the browser to the URL in the pairing `u` key, with its substring `{{{s}}}` substituted with `q`, truncated of the bang string; otherwise
        2. navigate the browser to DuckDuckGo with the `q` as the search query (so that it can be matched against DuckDuckGo’s full catalog of bangs, available at <https://duckduckgo.com/bang.js>); or
    2. if there are multiple bang strings, follow Step 2(i) with the first treated as the bang string; or
    3. if there is not any bang string navigate the browser to Google (anonymously proxied by using DuckDuckGo’s `!g` bang) with the `q` as the search query.

You can define your bang strings in `user.json` following the template below:

```jsonc
[
    {
      "t": "exampleBangString",
      "u": "https://search.example.org/subpath/?query={{{s}}}"
    },
    // omitted
]
```

You can run the script locally with

```sh
node index.js
```

…or deploy it to Vercel by clicking the button below.

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffirexcy%2Fbang2"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
