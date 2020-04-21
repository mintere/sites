export interface ThemeSchema {
  templates: TemplateSchema[]
}

export interface TemplateSchema {
  uid: string;
  frontMatter: any;
}

