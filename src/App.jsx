import { useState } from 'react';
import { useGetPostsQuery, useGetPostQuery } from './services/postsApi';

const formatTime = (value) =>
  value ? new Date(value).toLocaleTimeString() : 'Not fetched yet';

function StatusBadge({ active, kind = '', children }) {
  return <span className={`badge ${active ? kind : ''}`}>{children}</span>;
}

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <span>{message}</span>
      {onRetry && <button className="button button-small" onClick={onRetry}>Retry</button>}
    </div>
  );
}

function PostsList() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    fulfilledTimeStamp,
  } = useGetPostsQuery();

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">QUERY: GET POSTS</p>
          <h2>Posts collection</h2>
        </div>
        <button className="button button-primary" onClick={refetch} disabled={isFetching}>
          {isFetching ? 'Refreshingâ€¦' : 'â†» Refresh data'}
        </button>
      </div>

      <div className="status-row">
        <StatusBadge active={isLoading} kind="badge-amber">isLoading</StatusBadge>
        <StatusBadge active={isFetching} kind="badge-blue">isFetching</StatusBadge>
        <StatusBadge active={isError} kind="badge-red">isError</StatusBadge>
        <StatusBadge active={Boolean(data) && !isError} kind="badge-green">data cached</StatusBadge>
        <span className="timestamp">Last fulfilled: {formatTime(fulfilledTimeStamp)}</span>
      </div>

      {isLoading && (
        <div className="post-list" aria-label="Loading posts">
          {Array.from({ length: 5 }, (_, index) => <div className="skeleton" key={index} />)}
        </div>
      )}

      {isError && <ErrorMessage message={`Could not load posts: ${String(error?.status ?? error?.error ?? 'Unknown error')}`} onRetry={refetch} />}

      {data && !isError && (
        <div className="post-list">
          {data.map((post) => (
            <article className="post-row" key={post.id}>
              <span className="post-number">{String(post.id).padStart(2, '0')}</span>
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function SinglePost({ id, onSelectPost }) {
  const { data, isLoading, isFetching, isError, error, refetch, fulfilledTimeStamp } = useGetPostQuery(id);

  return (
    <section className="panel single-panel">
      <p className="eyebrow">QUERY: GET POST /:ID</p>
      <h2>Inspect one post</h2>
      <div className="post-tabs">
        {[1, 2, 3, 9999].map((postId) => (
          <button
            key={postId}
            className={`button ${id === postId ? 'button-selected' : ''}`}
            onClick={() => onSelectPost(postId)}
          >
            {postId === 9999 ? '404 demo' : `Post ${postId}`}
          </button>
        ))}
      </div>
      <div className="status-row">
        <StatusBadge active={isLoading} kind="badge-amber">isLoading</StatusBadge>
        <StatusBadge active={isFetching} kind="badge-blue">isFetching</StatusBadge>
        <StatusBadge active={isError} kind="badge-red">isError</StatusBadge>
        <span className="timestamp">Last fulfilled: {formatTime(fulfilledTimeStamp)}</span>
      </div>
      {isLoading && <div className="skeleton skeleton-large" />}
      {isError && <ErrorMessage message={`Post ${id}: ${String(error?.status ?? error?.error ?? 'Request failed')}`} onRetry={refetch} />}
      {data && !isError && (
        <article className="detail-card">
          <span className="detail-id">POST #{data.id}</span>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </article>
      )}
    </section>
  );
}

export default function App() {
  const [showPosts, setShowPosts] = useState(true);
  const [postId, setPostId] = useState(1);

  // Keep the selected post in React state without prop drilling through the event.
  useState(() => {
    const handler = (event) => setPostId(event.detail);
    window.addEventListener('select-post', handler);
    return () => window.removeEventListener('select-post', handler);
  });

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-mark">RTK<span>Q</span></div>
        <div>
          <p className="eyebrow hero-eyebrow">REACT TOOLKIT Â· DATA LAYER DEMO</p>
          <h1>RTK Query Cache Demo</h1>
          <p className="hero-description">Fetch, cache, and refresh API data with less boilerplate.</p>
        </div>
        <span className="live-pill"><span /> API demo</span>
      </header>

      <div className="intro-row">
        <div>
          <h2>Explore the cache</h2>
          <p>Watch query status, reuse cached responses, and trigger a manual refetch.</p>
        </div>
        <div className="tech-stack"><span>React</span><span>Redux Toolkit</span><span>JSONPlaceholder</span></div>
      </div>

      <main className="content-grid">
        <div className="main-column">
          <div className="list-controls">
            <button className="button" onClick={() => setShowPosts((visible) => !visible)}>
              {showPosts ? 'Unmount list' : 'Mount list'}
            </button>
            <span>Unmount and remount within 60 seconds to observe cache reuse.</span>
          </div>
          {showPosts
            ? <PostsList />
            : <section className="panel cache-note"><span className="cache-icon">âœ“</span><div><h3>List unmounted</h3><p>RTK Query keeps unused data in cache for 60 seconds.</p></div></section>}
        </div>
        <SinglePost id={postId} onSelectPost={setPostId} />
      </main>

      <footer>Built with React, Redux Toolkit Query, and the JSONPlaceholder API.</footer>
    </div>
  );
}
