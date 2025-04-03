import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.log('Unauthorized attempt to create post');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Creating post for user:', session.user.id);

    const { imageUrl, caption } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        imageUrl,
        caption: caption || '',
        type: 'image',
        userId: session.user.id,
      },
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

    console.log('Post created successfully:', post.id);

    return NextResponse.json({ 
      message: 'Post created successfully',
      post 
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ 
      error: 'Failed to create post',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 