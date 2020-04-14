# Getting Started

### Install

```
$ npm i --save @mintere/sites-renderer
$ yarn add @mintere/sites-renderer
```

### Usage

```javascript
import {renderHandlebars, compileTemplate} from "@mintere/sites-renderer";

const template = compileTemplate("Hello, {{name}}!");

const partials = {
  partial: compileTemplate("A partial.")
};

renderHandlebars(template, partials, {
  renderData: {
    name: "World"
  },
  themeManifest: {},
  deployment: {}
}) //=> "Hello, World!"
```



