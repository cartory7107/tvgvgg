export interface Tool {
  n: string; // name
  d: string; // description
  c: string; // category
  g: string; // group / subcategory
  p: string; // pricing
  u: string; // url
  fl?: string; // full logo / image
  ex?: boolean; // exclusive
  tr?: boolean; // trending
  badges?: string[];
  pos?: number;
}

export interface Catalog {
  tools: Tool[];
  categories: Record<string, number>;
  categoryEmojis: Record<string, string>;
}

export interface AINewsItem {
  title: string;
  time: string;
  url?: string;
  source?: string;
}
