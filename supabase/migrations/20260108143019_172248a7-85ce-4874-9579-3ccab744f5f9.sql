-- Create storage bucket for chat file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'chat-uploads', 
  'chat-uploads', 
  true,
  20971520, -- 20MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'text/csv', 'application/json']
);

-- Allow authenticated users to upload files
CREATE POLICY "Users can upload chat files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'chat-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow anyone to view chat files (public bucket)
CREATE POLICY "Chat files are publicly accessible"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'chat-uploads');

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own chat files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'chat-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);