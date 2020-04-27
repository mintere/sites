export class HTTPError extends Error {
  constructor(statusCode: number, internalMessage: string) {
    super(internalMessage);

    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }

  statusCode: number;

  get defaultErrorPageHTML() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error ${this.statusCode}.</title>
  </head>
  <body>
    <h1>Error ${this.statusCode}</h1>
    <p>To change this message, create a "${this.statusCode}.html" file in your theme's root.</p>
  </body>
  </html>
  `;
  }
}

export namespace HTTPError {
  export class NotFound extends HTTPError {
    constructor(internalMessage: string) {
      super(404, internalMessage);
    }

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
}
