"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

type AvatarProps = {
  uid?: string;
  url: string | null;
  size: number;
  onUpload?: (url: string) => void;
  showUpload?: boolean;
};

export default function Avatar({ uid, url, size, onUpload, showUpload = false }: AvatarProps) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url && url.includes('storage/v1/object')) {
      // If it's already a full URL, use it directly
      setAvatarUrl(url);
    } else if (url) {
      downloadImage(url);
    } else {
      setAvatarUrl(null);
    }
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error('Error downloading avatar image:', error);
    }
  }

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onUpload || !uid) return;
    
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="rounded-xl object-cover"
            style={{ height: size, width: size }}
          />
        ) : (
          <div 
            className="rounded-full bg-neutral-200 dark:bg-neutral-700" 
            style={{ height: size, width: size }} 
          />
        )}
      </div>
      {showUpload && (
        <div>
          <label 
            className="button primary block cursor-pointer text-sm text-center px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700"
            htmlFor="single"
          >
            {uploading ? 'Uploading ...' : 'Upload'}
          </label>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
