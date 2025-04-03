import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const postId = params.postId;
    const userId = session.user.id;

    // Check if the user has already liked the post
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Update the post's likes count
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ liked: false });
    } else {
      // Like the post
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      // Update the post's likes count
      await prisma.post.update({
        where: { id: postId },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error in like route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 