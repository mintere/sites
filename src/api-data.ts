export interface DeploymentData  {
  uid: string;

  // These may change between renders (for example, a deployment may be made public and set to production "publishing")
  environment: string;
  status: string;
  deploymentUrl: string;

  recaptchaV3PublicKey: string;

  formSubmissionUrl: string;
}

export interface ThemeManifest {
  files: {
    [f: string]: FileManifest | undefined;
  };
  size?: number;
}

export interface FileManifest {
  fileType?: string;
  static?: string;
  compilerMetadata?: any;
  size?: number;

  frontmatter?: string;
}