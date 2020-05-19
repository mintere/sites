# Templates

Templates are the heart of the Mintere Sites platform.

Template are written using [Handlebars](http://handlebarsjs.com/) and are rendered using the [@mintere/sites](https://github.com/mintere/sites) library. 

### Front-matter

How template appear in the Sites Studio can be configured using front-matter, declared at the beginning of a template file as [json5](https://json5.org/) between two sets of `---`

### Example

{% code title="theme/templates/basic-page.hbs" %}
```markup
---
{
  "title": "Basic Page",
  "availableBlocks": ["cta"],
  "schema": [
    {
      "name": "Greeting Message",
      "uid": "greeting",
      "type": "text"
    },
    {
      "name": "Content",
      "uid": "body",
      "type": "richtext"
    }
  ]
}
---
{{#> layout }}
  <div class="content">
    <h1>{{settings.greeting}}</h1>

    {{{renderRichText settings.body}}}

    {{#each blocks}}
      {{renderBlock this}}
    {{/each}}
  </div>
{{/layout}}

```
{% endcode %}

