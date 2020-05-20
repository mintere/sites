# Using GitHub Actions

You can use this Workflow for GitHub Actions

{% code title=".github/workflows/mintere-platform.yml" %}
```yaml
name: Mintere Platform

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '12.x'
    
    #OPTIONAL - only if you use a build process specified in package.json
    - run: yarn install
    - run: yarn run build
    
    - name: Deploy to Mintere
      run: npx mintere sites:deploy
      env:
        DEPLOYMENT_KEY: ${{ secrets.MINTERE_DEPLOYMENT_KEY }}
```
{% endcode %}



