export type CategoryType = 
  | 'All'
  | 'AI & ML'
  | 'Developer Tools'
  | 'APIs & Data'
  | 'Design Systems'
  | 'Cloud & Infra'
  | 'Vercel Ecosystem';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: CategoryType;
  tags: string[];
  upvotes: number;
  featured?: boolean;
  author: {
    name: string;
    avatar: string;
    handle: string;
  };
  createdAt: string;
  codeSnippet?: string;
  pricing: 'Free' | 'Freemium' | 'Open Source' | 'Paid';
  stars?: number;
}

export interface DirectoryStats {
  totalResources: number;
  categoriesCount: number;
  openSourceCount: number;
  communityMembers: number;
}
