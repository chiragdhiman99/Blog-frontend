import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { formatDistanceToNow } from "date-fns";

const avatarColors = [
  "bg-amber-400/20 text-amber-400",
  "bg-emerald-400/20 text-emerald-400",
  "bg-rose-400/20 text-rose-400",
  "bg-sky-400/20 text-sky-400",
];

function SinglePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState(0);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/posts/getpost/${id}`).then((res) => {
      setPost(res.data);
      setLikes(res.data.likes.length);
      setComments(res.data.comments); // ye add karo
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      setLiked(res.data.likes.includes(user.id));
      setLoading(false);
    });
  }, [id]);

  const handlelike = (id) => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    setLiked((prev) => !prev);

    axios
      .put(`http://localhost:5000/api/posts/${id}/like`, { userId: user.id })
      .then((res) => {
        setLikes(res.data.likes);
      })
      .catch((err) => console.log(err));
  };

  const handleComment = (e) => {
    if (!comment) return;
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    axios
      .post(`http://localhost:5000/api/posts/${id}/comment`, {
        userId: user.id,
        userName: user.name,
        comment: comment,
      })
      .then((res) => {
        setComments(res.data.comments);
        setComment("");
      })
      .catch((err) => console.log(err));
  };

  const [exist, setExist] = useState(false);

  useEffect(() => {
    if (post) {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      setExist(user.name === post.user);
    }
  }, [post]);

  console.log(exist);
  if (loading)
    return (
      <div className="min-h-screen bg-[#0c0a07] flex items-center justify-center">
        <svg
          className="animate-spin h-6 w-6 text-amber-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );

  if (!post) return null;

  const wordCount = post.content?.trim().split(/\s+/).length || 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}/comment/${commentId}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-[#0c0a07] text-white">
      {/* ── Navbar ── */}
      <nav className="border-b border-zinc-800/60 sticky top-0 z-50 bg-[#0c0a07]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="text-zinc-600 hover:text-white transition-colors cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <span
              className="text-amber-400 font-bold text-base tracking-[5px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              BLOGIFY
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`transition-colors cursor-pointer ${bookmarked ? "text-amber-400" : "text-zinc-600 hover:text-zinc-400"}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={bookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="text-xs text-zinc-600 hover:text-amber-400 transition-colors tracking-widest uppercase border border-zinc-800 px-4 py-2 hover:border-amber-400/30 cursor-pointer">
              Share
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Layout ── */}
      <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">
        {/* ── Article ── */}
        <article className="flex-1 min-w-0">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-zinc-800/60 text-zinc-500 border border-zinc-700/30 hover:border-amber-400/30 hover:text-amber-400/70 transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-white text-4xl font-bold leading-tight mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {post.title}
          </h1>

          {/* Author row */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-800/60">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-bold">
              {post.user?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300">{post.user}</p>
              <p className="text-xs text-zinc-600 mt-0.5">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            { !exist && (
              <button className="ml-auto text-[10px] tracking-widest uppercase text-zinc-600 border border-zinc-800 px-3 py-1.5 hover:border-amber-400/40 hover:text-amber-400 transition-all cursor-pointer">
                Follow
              </button>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {post.content?.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-zinc-300 text-base leading-8 mb-6 break-words"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Like / Share bar */}
          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-zinc-800/60">
            <button
              onClick={() => handlelike(post._id)}
              className={`flex items-center gap-2 text-sm transition-colors cursor-pointer ${liked ? "text-amber-400" : "text-zinc-600 hover:text-zinc-400"}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {likes}
            </button>

            <button className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {comments.length} Comments
            </button>

            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`transition-colors cursor-pointer ${bookmarked ? "text-amber-400" : "text-zinc-600 hover:text-zinc-400"}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={bookmarked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Comments ── */}
          <div className="mt-12">
            <p className="text-[10px] tracking-[4px] uppercase text-zinc-600 mb-6">
              {comments.length} Comments
            </p>

            <form onSubmit={handleComment} className="flex gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">
                Y
              </div>
              <div className="flex-1 border-b border-zinc-800 focus-within:border-amber-400 transition-colors pb-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-transparent text-white text-sm outline-none placeholder-zinc-700"
                />
              </div>
              <button
                type="submit"
                className="text-[10px] tracking-widest uppercase text-black bg-amber-400 hover:bg-amber-300 px-4 py-1.5 transition-colors cursor-pointer flex-shrink-0"
              >
                Post
              </button>
            </form>
            <div className="flex flex-col gap-6">
              {comments.map((c, i) => {
                const currentUser = jwtDecode(localStorage.getItem("token"));
                return (
                  <div key={c._id} className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}
                    >
                      {c.userName?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium text-zinc-300">
                          {c.userName}
                        </span>
                        <span className="text-xs text-zinc-700">
                          {formatDistanceToNow(new Date(c.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                        {c.userId === currentUser.id && (
                          <button
                            onClick={() => handleDeleteComment(c._id)}
                            className="ml-auto text-[10px] tracking-widest uppercase text-zinc-700 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="border border-zinc-800/60 p-5 mb-6">
            <p className="text-[10px] tracking-[4px] uppercase text-zinc-600 mb-4">
              Written by
            </p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-bold">
                {post.user?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-300">{post.user}</p>
                <p className="text-[11px] text-zinc-600">Developer</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              Building in public. Writing about web development and real-world
              projects.
            </p>
            <button className="w-full text-[10px] tracking-widest uppercase text-zinc-600 border border-zinc-800 py-2 hover:border-amber-400/40 hover:text-amber-400 transition-all cursor-pointer">
              Follow
            </button>
          </div>

          <div>
            <p className="text-[10px] tracking-[4px] uppercase text-zinc-600 mb-4">
              More from author
            </p>
            <div className="flex flex-col gap-4">
              {[
                "JWT vs Sessions",
                "MongoDB Aggregation Guide",
                "Why I use Vite",
              ].map((title, i) => (
                <div key={i} className="cursor-pointer group">
                  <p
                    className="text-sm text-zinc-400 group-hover:text-amber-400 transition-colors leading-snug"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {title}
                  </p>
                  <div className="w-6 h-px bg-zinc-800 mt-2 group-hover:bg-amber-400/40 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SinglePage;
