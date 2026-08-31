import { ResourceItem, DirectoryStats, CategoryType } from './types';

export const CATEGORIES: CategoryType[] = [
  'All',
  'AI & ML',
  'Developer Tools',
  'APIs & Data',
  'Design Systems',
  'Cloud & Infra',
  'Vercel Ecosystem',
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'vercel-ai-sdk',
    title: 'Vercel AI SDK',
    description: 'The TypeScript toolkit for building AI-powered applications with React, Next.js, Svelte, and Vue.',
    url: 'https://sdk.vercel.ai/docs',
    category: 'AI & ML',
    tags: ['Next.js', 'LLM', 'Streaming', 'TypeScript'],
    upvotes: 1420,
    featured: true,
    author: {
      name: 'Vercel Labs',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      handle: '@vercel',
    },
    createdAt: '2026-08-15',
    pricing: 'Open Source',
    stars: 12400,
    codeSnippet: `import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const { text } = await generateText({
  model: openai('gpt-4o'),
  prompt: 'Write a haiku about deployment speed.',
});`,
  },
  {
    id: 'next-og',
    title: 'Vercel OG Image Generation',
    description: 'Dynamic Open Graph image generation using HTML and CSS for Next.js applications powered by Satori.',
    url: 'https://vercel.com/docs/functions/og-image-generation',
    category: 'Vercel Ecosystem',
    tags: ['Satori', 'SEO', 'OpenGraph', 'Next.js'],
    upvotes: 980,
    featured: true,
    author: {
      name: 'Shu Ding',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      handle: '@shuding_',
    },
    createdAt: '2026-07-20',
    pricing: 'Free',
    stars: 8900,
    codeSnippet: `import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    <div style={{ fontSize: 40, color: 'black', background: 'white' }}>
      Hello World
    </div>
  );
}`,
  },
  {
    id: 'shadcn-ui',
    title: 'shadcn/ui',
    description: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    url: 'https://ui.shadcn.com',
    category: 'Design Systems',
    tags: ['TailwindCSS', 'Radix UI', 'React', 'TypeScript'],
    upvotes: 3120,
    featured: true,
    author: {
      name: 'shadcn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      handle: '@shadcn',
    },
    createdAt: '2026-06-10',
    pricing: 'Open Source',
    stars: 64000,
    codeSnippet: `pnpm dlx shadcn@latest add button card dialog`,
  },
  {
    id: 'supabase-db',
    title: 'Supabase Postgres & Auth',
    description: 'The Open Source Firebase alternative. Postgres database, Authentication, Instant APIs, Realtime subscriptions.',
    url: 'https://supabase.com',
    category: 'Cloud & Infra',
    tags: ['PostgreSQL', 'Auth', 'Realtime', 'Database'],
    upvotes: 2150,
    featured: false,
    author: {
      name: 'Paul Copplestone',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      handle: '@kiwicopple',
    },
    createdAt: '2026-05-18',
    pricing: 'Freemium',
    stars: 71000,
    codeSnippet: `import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);`,
  },
  {
    id: 'lucide-icons',
    title: 'Lucide React Icons',
    description: 'Beautiful & consistent icon toolkit made by the community. Open-source library with over 1,400 clean icons.',
    url: 'https://lucide.dev',
    category: 'Developer Tools',
    tags: ['Icons', 'React', 'SVG', 'UI'],
    upvotes: 840,
    featured: false,
    author: {
      name: 'Lucide Team',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      handle: '@lucideicons',
    },
    createdAt: '2026-04-12',
    pricing: 'Open Source',
    stars: 14200,
  },
  {
    id: 'resend-email',
    title: 'Resend Email API',
    description: 'The best email API for developers. Reach humans instead of spam folders. Build, test, and deliver transactional emails.',
    url: 'https://resend.com',
    category: 'APIs & Data',
    tags: ['Email', 'API', 'React Email', 'Delivery'],
    upvotes: 1890,
    featured: true,
    author: {
      name: 'Zeno Rocha',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      handle: '@zenorocha',
    },
    createdAt: '2026-07-01',
    pricing: 'Freemium',
    stars: 9400,
    codeSnippet: `import { Resend } from 'resend';
const resend = new Resend('re_123456789');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'user@example.com',
  subject: 'Welcome to Public Directory',
  html: '<p>Deployed seamlessly on Vercel!</p>'
});`,
  },
  {
    id: 'upstash-redis',
    title: 'Upstash Serverless Redis',
    description: 'Serverless Redis and Kafka with per-request pricing. Redis client for Vercel Edge functions and Next.js App Router.',
    url: 'https://upstash.com',
    category: 'Cloud & Infra',
    tags: ['Redis', 'Rate Limiting', 'Edge', 'Cache'],
    upvotes: 1140,
    featured: false,
    author: {
      name: 'Enes Akar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      handle: '@enesakar',
    },
    createdAt: '2026-03-29',
    pricing: 'Freemium',
    stars: 5300,
  },
  {
    id: 'biome-linter',
    title: 'Biome Formatter & Linter',
    description: 'One toolchain for your web project. Format, lint, and perform static analysis in tens of milliseconds.',
    url: 'https://biomejs.dev',
    category: 'Developer Tools',
    tags: ['Rust', 'Linter', 'Formatter', 'Fast'],
    upvotes: 1560,
    featured: false,
    author: {
      name: 'Biome Core',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      handle: '@biomejs',
    },
    createdAt: '2026-06-25',
    pricing: 'Open Source',
    stars: 18500,
  },
];

export const DIRECTORY_STATS: DirectoryStats = {
  totalResources: INITIAL_RESOURCES.length,
  categoriesCount: CATEGORIES.length - 1,
  openSourceCount: INITIAL_RESOURCES.filter((r) => r.pricing === 'Open Source').length,
  communityMembers: 4820,
};
