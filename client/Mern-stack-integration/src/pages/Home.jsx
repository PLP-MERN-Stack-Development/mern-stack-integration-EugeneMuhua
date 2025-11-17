import React, { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  async function load(qterm = '') {
    setLoading(true);
    try {
      const res = await api.get('/posts', { params: { q: qterm, limit: 10 } });
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  }

  React.useEffect(() => { load(); }, []);

  async function onSearch(e) {
    e.preventDefault();
    await load(q);
  }

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={onSearch} style={{ marginBottom: 12 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <div>
          {posts?.length ? posts.map(p => (
            <article key={p._id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
              <h3><Link to={`/posts/${p._id}`}>{p.title}</Link></h3>
              <p>{p.excerpt}</p>
            </article>
          )) : <p>No posts yet</p>}
        </div>
      )}
    </div>
  );
}
