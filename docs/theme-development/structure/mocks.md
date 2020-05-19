# Mocks

Mocks allow you to provide data for testing your theme in development, without using the Sites platform or studio.

Place mocks inside of the `mocks/`directory. For incoming requests, the dev server will look for a mock using the path of the request \(appending `.json`\). If the path resolves to a directory, the dev server will use the `index.json` file inside of that directory.

### Example

{% code title="mocks/index.json" %}
```javascript
{
  "templateUid": "basic-page",
  "renderData": {
    "settings": {
      "greeting": "It works!",
      "body": "Welcome to the Mintere Sites. We're **excited** to have you. You'll be deploying a global site in no time."
    },
    "blocks": [
      {
        "type": "cta",
        "header": "Read the documentation",
        "href": "https://docs.mintere.site/"
      }
    ]
  }
}
```
{% endcode %}

