import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Starting posts fetch...');
    
    // Test database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Database connection failed',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }

    const session = await getServerSession(authOptions);
    console.log('Session:', JSON.stringify(session, null, 2));
    
    if (!session?.user) {
      console.log('No authenticated user found');
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized', 
          details: 'No authenticated user found' 
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    console.log('Fetching posts for user:', userId);

    try {
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

      console.log('Raw posts from database:', JSON.stringify(posts, null, 2));

      // Transform the posts to include isLiked status and rename user to author
      const transformedPosts = posts.map(post => {
        try {
          const { likedBy, user, ...postWithoutLikes } = post;
          return {
            id: post.id,
            imageUrl: post.imageUrl || '',
            caption: post.caption || '',
            type: post.type || 'image',
            createdAt: post.createdAt.toISOString(),
            updatedAt: post.updatedAt.toISOString(),
            likesCount: post.likes || 0,
            sharesCount: post.shares || 0,
            commentsCount: post.commentsCount || 0,
            isLiked: likedBy.length > 0,
            author: {
              name: user?.name || 'Anonymous',
              image: user?.image || '/default-avatar.png'
            }
          };
        } catch (transformError) {
          console.error('Error transforming post:', transformError, 'Post data:', post);
          return null;
        }
      }).filter(Boolean); // Remove any null posts from transformation errors

      console.log('Transformed posts:', JSON.stringify(transformedPosts, null, 2));

      return NextResponse.json({ 
        success: true,
        posts: transformedPosts 
      });
    } catch (dbError) {
      console.error('Error fetching posts from database:', dbError);
      if (dbError instanceof Error) {
        console.error('Error stack:', dbError.stack);
      }
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch posts',
          details: dbError instanceof Error ? dbError.message : 'Unknown database error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in posts route:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 