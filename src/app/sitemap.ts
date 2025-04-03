import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all public posts
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      createdAt: true,
    },
  });

  // Base URL
  const baseUrl = 'https://studiosix.ai';

  // Static routes
  const routes = [
    '',
    '/sign-in',
    '/sign-up',
    '/explore',
    '/pricing',
    '/about',
    '/contact',
    '/features',
    '/blog',
    '/docs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic post routes
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.id}`,
    lastModified: post.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...postRoutes];
} 