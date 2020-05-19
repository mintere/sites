# Blocks

Blocks are repeatable components users can add to a template in any order using the Sites Studio \(or not at all\). 

Each template declares a set of availableBlocks for the user to add in its front-matter. 

At render-time, use the [`{{renderBlock}}`](../helpers/content/renderblock.md) helper in order to select and render the correct block.

Just like templates, blocks have front-matter, which is specified at the beginning of each file using json5 between two pairs of `---` 

### Example

```markup
---
{
  "title": "Call to Action",
  "schema": [
    {
      "name": "Header",
      "uid": "header",
      "type": "text"
    },
    {
      "name": "Link",
      "uid": "href",
      "type": "text"
    }
  ]
}
---
<section class="cta">
  <a href="{{href}}">
    <h3>{{header}}</h3>
  </a>
</section>
```

