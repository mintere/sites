export interface RenderData {
  title: string,
  uid: string,
  metaDescription: string,
  settings: any,
  blocks: any
}

export interface RenderContext {
  environment: string;

  recaptchaV3PublicKey: string;
  formSubmissionUrl: string;
}
