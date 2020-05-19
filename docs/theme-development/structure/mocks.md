# Mocks

Mocks allow you to provide data for testing your theme in development, without using the Sites platform or studio.

Place mocks inside of the `mocks/`directory. For incoming requests, the dev server will look for a mock using the path of the request \(appending `.json`\). If the path resolves to a directory, the dev server will use the `index.json` file inside of that directory.

