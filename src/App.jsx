import { useState } from 'react';
import {
  useGetPostsQuery,
  useGetPostQuery,
} from './services/postsApi';
import './App.css';

function Posts() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetPostsQuery();

  if (isLoading) return <p>Loading posts...</p>;

  if (isError) {
    return <p className="error">Unable to load posts. Please try again.</p>;
  }

  return (
    <section>
      <button onClick={refetch}>Refresh posts</button>
      {isFetching && <span> Updating...</span>}

      <div className="posts">
        {data?.map((post) => (
          <article className="card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SinglePost({ id }) {
  const { data, isLoading, isError } = useGetPostQuery(id);

  if (isLoading) return <p>Loading post...</p>;
  if (isError) return <p className="error">Post not found.</p>;

  return (
    <article className="card">
      <h3>{data?.title}</h3>
      <p>{data?.body}</p>
    </article>
  );
}

export default function App() {
  const [showPosts, setShowPosts] = useState(true);
  const [postId, setPostId] = useState(1);

  return (
    <main className="container">
      <h1>RTK Query Cache Demo</h1>
      <p>Explore API fetching, caching, and refetching with Redux Toolkit.</p>

      <h2>Posts</h2>

      <button onClick={() => setShowPosts((previous) => !previous)}>
        {showPosts ? 'Hide posts' : 'Show posts'}
      </button>

      <p className="hint">
        Hide and show the posts to observe cached data being reused.
      </p>

      {showPosts && <Posts />}

      <h2>Single post</h2>

      <div className="buttons">
        {[1, 2, 3, 9999].map((id) => (
          <button key={id} onClick={() => setPostId(id)}>
            {id === 9999 ? 'Test error' : `Post ${id}`}
          </button>
        ))}
      </div>

      <SinglePost id={postId} />
    </main>
  );
}