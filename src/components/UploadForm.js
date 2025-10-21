import React, { useState } from 'react';

export default function UploadForm({ onUpload }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Please provide a title');
    if (!file) return alert('Please select a video file or provide a link');

    setLoading(true);
    try {
      const base64 = await toBase64(file);
      const payload = {
        title,
        description,
        src: base64, // Base64 encoded video
        thumbnail: thumbnail || '',
        views: 0,
        createdAt: new Date().toISOString(),
      };

      await onUpload(payload);

      // Reset form
      setTitle('');
      setDescription('');
      setFile(null);
      setThumbnail('');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video title"
        />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />
      </div>

      <div className="form-row">
        <label>Thumbnail URL (optional)</label>
        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="https://...jpg"
        />
      </div>

      <div className="form-row">
        <label>Choose video file (mp4 recommended)</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="small">
          Note: file will be encoded to base64 and saved to db.json (not
          suitable for large files)
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </form>
  );
}
