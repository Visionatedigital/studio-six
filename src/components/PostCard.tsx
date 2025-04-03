import { Post } from '@/types';
import Image from 'next/image';
import { Icon } from '@/components/Icons';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (post: Post) => void;
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E0DAF3] p-4 mb-6">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium text-[#202126]">{post.author.name}</div>
          <div className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        {post.type === 'image' && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.caption}
              fill
              className="object-cover"
            />
          </div>
        )}
        {post.type === 'video' && (
          <video
            src={post.imageUrl}
            controls
            className="w-full rounded-lg"
          />
        )}
        {post.type === 'document' && (
          <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg">
            <Icon name="file" size={24} />
            <span className="text-sm truncate">{post.caption}</span>
          </div>
        )}
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="text-gray-700 mb-4">{post.caption}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onLike?.(post.id)}
          className={`flex items-center gap-1.5 ${
            post.isLiked ? 'text-purple-600' : 'text-gray-500'
          }`}
        >
          <Icon name="heart" size={20} />
          <span>{post.likesCount}</span>
        </button>
        <button
          onClick={() => onComment?.(post.id)}
          className="flex items-center gap-1.5 text-gray-500"
        >
          <Icon name="comment" size={20} />
          <span>{post.commentsCount}</span>
        </button>
        <button
          onClick={() => onShare?.(post)}
          className="flex items-center gap-1.5 text-gray-500"
        >
          <Icon name="share" size={20} />
          <span>{post.sharesCount}</span>
        </button>
      </div>
    </div>
  );
} 