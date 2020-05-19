# Partials

Handlebars partials placed within the `partials/` subdirectory are made available for use to templates and blocks. 

A great use-case for partials is shared-page layouts.

### Example

{% code title="theme/partials/layout.hbs" %}
```markup
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="{{assetUrl "base.css"}}" rel="stylesheet" type="text/css"  />

  <title>Mintere Sites</title>
</head>
<body>
  {{> @partial-block }}
</body>
</html>
```
{% endcode %}

