---
description: Retrieve the path to static files.
---

# staticFilePath

The `staticFilePath` helper allows your theme to retrieve the path to files deployed with the theme itself. Static files are hosted on Mintere's CDN on the `assets.mintere.site` origin.

```markup
<img src="{{staticFilePath 'assets/logo.png'}}"/>
```



