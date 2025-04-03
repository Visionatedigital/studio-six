import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const caption = formData.get('caption') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate a unique filename
    const uniqueId = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uniqueId}.${fileExtension}`;
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the upload directory and file path
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);

    // Ensure the upload directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save the file
    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json(
        { error: 'Failed to save file', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // Create the post with the uploaded file path
    try {
      const post = await prisma.post.create({
        data: {
          imageUrl: `/uploads/${fileName}`,
          caption: caption || '',
          type: type || 'image',
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

      // Transform the response to match the frontend interface
      const transformedPost = {
        id: post.id,
        imageUrl: post.imageUrl,
        caption: post.caption || '',
        type: post.type,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        likesCount: post.likes || 0,
        sharesCount: post.shares || 0,
        commentsCount: post.commentsCount || 0,
        isLiked: false,
        author: {
          name: post.user.name || 'Anonymous',
          image: post.user.image || '/default-avatar.png'
        }
      };

      return NextResponse.json({ post: transformedPost });
    } catch (error) {
      console.error('Error creating post:', error);
      return NextResponse.json(
        { 
          error: 'Failed to create post',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in upload route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process upload',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 