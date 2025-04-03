import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Starting posts fetch...');
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    
    if (!session?.user) {
      console.log('No authenticated user found');
      return NextResponse.json(
        { error: 'Unauthorized', details: 'No authenticated user found' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    console.log('Fetching posts for user:', userId);

    // Fetch all posts with their authors and like status
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likedBy: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('Found posts:', posts.length);

    // Transform the posts to include isLiked status and rename user to author
    const transformedPosts = posts.map(post => {
      const { likedBy, user, ...postWithoutLikes } = post;
      return {
        ...postWithoutLikes,
        isLiked: likedBy.length > 0,
        likesCount: post.likes || 0,
        commentsCount: post.commentsCount || 0,
        author: {
          name: user.name,
          image: user.image
        }
      };
    });

    console.log('Transformed posts:', transformedPosts.length);

    return NextResponse.json({ 
      success: true,
      posts: transformedPosts 
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 