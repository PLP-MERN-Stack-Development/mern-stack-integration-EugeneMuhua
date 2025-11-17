import React from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}</p>
      {post.featuredImage && <img src={post.featuredImage} alt="" style={{ maxWidth: '100%' }} />}
      <div style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>{post.body}</div>
      <hr />
      <Comments postId={post._id} />
    </div>
  );
}

function Comments({ postId }) {
  const [comments, setComments] = React.useState([]);
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/comments/post/${postId}`);
        setComments(res.data);
      } catch (err) { console.error(err); }
    })();
  }, [postId]);

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post('/comments', { postId, content });
      setContent('');
      const res = await api.get(`/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
      alert('Login required to comment');
    }
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={submit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows="3" style={{ width: '100%' }} />
        <button type="submit">Add Comment</button>
      </form>
      {comments.map(c => (
        <div key={c._id} style={{ borderTop: '1px solid #eee', padding: 8 }}>
          <small>{c.author?.name} • {new Date(c.createdAt).toLocaleString()}</small>
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  );
}
