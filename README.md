# vbang2 - DDG-style Bangs with Customizations

A simple Node application that emulates DuckDuckGo-style Bangs (search engine shortcuts).

The main script `search.js` works as follows:

1. exposes an API endpoint `/search` that accepts a single parameter `q` from HTTP GET calls; and
2. parses `q` to determine whether there is a prefixing or affixing “bang” string (defined as a space-delimited string comprising of a leading letter `v` followed by a sequence of alphanumerics) and —
    1. if there is exactly one bang string as defined, looks up it with the leading `v` truncated, against the `user.js` file, which is an array of pairing `t` and `u` keys —
        1. if there is a matching `t` key, navigates the browser to the URL in the pairing `u` key, with its substring `{{{s}}}` substituted with `q`, truncated of the bang string; otherwise
        2. navigates the browser to DuckDuckGo with the parsed bang string and search query, so that it can be matched against DuckDuckGo’s full catalog of bangs (available at <https://duckduckgo.com/bang.js>); or
    2. if there are multiple bang strings, follows Step 2(i) with the first treated as the bang string; or
    3. if there is not any bang string, navigates the browser to Google (anonymously proxied by using DuckDuckGo’s `!g` bang) with the `q` as the search query.

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
node .
```

and find it at localhost:3000.

Or, you can deploy the repo to Vercel for free by clicking the button below.

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffirexcy%2Fvbang2"><img src="https://vercel.com/button" alt="Deploy with Vercel"/></a>

A preview deployment is available at <https://vbang2.vercel.app/>. It is recommended to deploy your own instance.

**Note:**
You may want to set the forked repo as private and select an obscure or protected URL for better privacy, especially if you want to save bangs that redirect to confidential or paywalled locations.

Of course, you can also use any cloud service that supports the depolyment of Node.js code, such as fly.io, Cloudflare Worker, etc.

*The project is made as a demo for an upcoming member-only post at <em>SSPAI Prime</em> (<https://sspai.com/prime/explore>). If you find this useful, please consider purchasing a subscription as a form of support. Thanks.*
