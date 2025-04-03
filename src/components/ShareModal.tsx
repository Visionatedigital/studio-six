import React from 'react';
import { Dialog } from '@headlessui/react';
import { Icon } from './Icons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postUrl: string;
  postCaption: string;
}

export default function ShareModal({ isOpen, onClose, postUrl, postCaption }: ShareModalProps) {
  const shareOptions = [
    {
      name: 'Copy Link',
      icon: 'link',
      action: async () => {
        try {
          await navigator.clipboard.writeText(postUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
          alert('Failed to copy link. Please try again.');
        }
      }
    },
    {
      name: 'X',
      icon: 'x',
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postCaption)}&url=${encodeURIComponent(postUrl)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      action: () => {
        const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postCaption)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${postCaption}\n${postUrl}`)}`;
        window.open(url, '_blank');
      }
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      action: async () => {
        try {
          await navigator.clipboard.writeText(postUrl);
          alert('Link copied to clipboard! You can now paste it in Instagram.');
        } catch (err) {
          console.error('Failed to copy link:', err);
          alert('Failed to copy link. Please try again.');
        }
      }
    }
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-medium">
              Share Post
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
              <Icon name="close" size={24} />
                  </button>
                </div>

          <div className="grid grid-cols-3 gap-4">
            {shareOptions.map((option) => (
                        <button
                key={option.name}
                onClick={option.action}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon name={option.icon} size={24} />
                <span className="mt-2 text-sm text-gray-600">{option.name}</span>
                        </button>
                      ))}
                </div>
              </Dialog.Panel>
        </div>
      </Dialog>
  );
} 