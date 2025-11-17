import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostView from './pages/PostView';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/create" style={{ marginRight: 12 }}>Create</Link>
        <Link to="/login">Login</Link>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
