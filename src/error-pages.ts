export abstract class HTTPError extends Error {
  constructor(...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }

  abstract readonly statusCode: number
  abstract readonly defaultErrorPageHTML: string
}

export class Error404 extends HTTPError {
  statusCode = 404

  get defaultErrorPageHTML() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Not found.</title>
    </head>
    <body>
      <h1>404 Not Found.</h1>
      <p>To change this message, create a "404.hbs" file in your theme root.</p>
    </body>
    </html>
    `;
  }
}
