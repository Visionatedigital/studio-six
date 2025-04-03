import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/auth.config';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.log('Unauthorized attempt to like post');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const postId = params.postId;
    const userId = session.user.id;

    console.log('Attempting to like post:', { postId, userId });

    // First, check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      console.log('Post not found:', postId);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Found post:', { postId, postUserId: post.userId });

    // Check if like already exists
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      console.log('Unlike post:', { postId, userId });
      // Unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Decrement likes count
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: {
            decrement: 1
          }
        },
      });

      return NextResponse.json({ liked: false });
    }

    console.log('Like post:', { postId, userId });
    // Create new like
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });

    // Increment likes count
    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: {
          increment: 1
        }
      },
    });

    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error('Error handling like:', error);
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    );
  }
} 