---
description: Retrieve the path to static assets.
---

# assetUrl

The `assetUrl` helper allows your theme to retrieve the url for assets deployed with the theme itself. 

Assets should be located in the `assets/` subdirectory.

Static files are assets on Mintere's CDN.

```markup
<img src="{{assetUrl 'logo.png'}}"/>
```

The url will include a cache-busting hash. When deployed to the Sites platform, you must use the `assetUrl` helper for all non-handlebars assets.

**Options:** You may pass options to assetUrl to adjust image rendering. These only apply when deployed to the Sites platform - they do not take effect when using the local server.

| name | description |
| :--- | :--- |
| **width** | the max width of the image, in pixels |
| **height** | the max height of the image, in pixels |
| **quality** | for formats with lossy compression, the compression quality, from 0 to 100 |

