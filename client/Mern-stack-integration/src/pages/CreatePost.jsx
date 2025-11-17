import React, { useContext, useState } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('body', body);
      if (featuredImage) fd.append('featuredImage', featuredImage);
      const res = await api.post('/posts', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      navigate(`/posts/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error creating post');
    }
  }

  if (!token) return <p>Please login to create posts.</p>;

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={submit}>
        <div><input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /></div>
        <div><textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} rows="8" /></div>
        <div><input type="file" onChange={e => setFeaturedImage(e.target.files[0])} /></div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
