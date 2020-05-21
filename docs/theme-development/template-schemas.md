# Template Schemas

Note that blocks are rendered with their schema settings as their render data, while templates have access to more data, and have access to their schema settings under the `settings` object.

### Fields

{% tabs %}
{% tab title="enum" %}
```javascript
{
  "name": "Media Side",
  "uid": "mediaSide",
  "type": "enum",
  "options": ["left", "right"],
  "default": "right"
}
```
{% endtab %}

{% tab title="image" %}
```
{
  "name": "Media Image",
  "uid": "mediaImage",
  "type": "image"
},
```
{% endtab %}

{% tab title="richtext" %}
```
{
  "name": "Body",
  "uid": "body",
  "type": "richtext"
}
```
{% endtab %}

{% tab title="text \(plain\)" %}
```
{
  "name": "Header",
  "uid": "header",
  "type": "text"
}
```
{% endtab %}
{% endtabs %}



