# renderMarkdown

Renders markdown.

It's recommended you use [`renderRichText`](renderrichtext.md) for content from the API for compatibility.

You may enable safe markdown rendering by passing `false` as the second argument. In this case, the result will be wrapped in a `Handlebars.SafeString`. Unless the second argument is false, the result is un-sanitized.

**Render \(safe mode\):**

{% tabs %}
{% tab title="example.hbs" %}
```markup
{{renderMarkdown "test **bold**" false}}
```
{% endtab %}
{% endtabs %}

Result:

```markup
test <b>bold</b>
```

**Render \(allow unsafe HTML & JavaScript\):**

{% tabs %}
{% tab title="example.hbs" %}
```markup
{{{renderMarkdown "test **bold** <script>alert("hi")</script>"}}}
```
{% endtab %}
{% endtabs %}

```markup
test <b>bold</b> <script>alert("hi")</script>
```

