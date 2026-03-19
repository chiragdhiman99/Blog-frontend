import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const tags = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Career",
  "DevOps",
  "Python",
  "CSS",
];

const suggestions = [
  { name: "Arjun Singh", initials: "AS", role: "Full Stack Dev" },
  { name: "Kavya Nair", initials: "KN", role: "Frontend Engineer" },
  { name: "Rohan Mehta", initials: "RM", role: "Backend Developer" },
];

const avatarColors = [
  "bg-amber-400/20 text-amber-400",
  "bg-emerald-400/20 text-emerald-400",
  "bg-rose-400/20 text-rose-400",
  "bg-sky-400/20 text-sky-400",
];

// ── Profile Dropdown ──
const ProfileDropdown = ({ posts }) => {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  console.log(posts);

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-xs font-bold hover:bg-amber-400/30 transition-colors"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-56 bg-[#111009] border border-zinc-800 z-50">
          <div className="px-4 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">
                  {user.name}
                </p>
                <p className="text-[11px] text-zinc-600 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                setShowProfile(true);
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full text-left px-4 py-2.5 text-xs text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/40 transition-all tracking-wider flex items-center gap-3"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Profile
            </button>

            <button className="w-full text-left px-4 py-2.5 text-xs text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/40 transition-all tracking-wider flex items-center gap-3">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Write a post
            </button>

            <button className="w-full text-left px-4 py-2.5 text-xs text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/40 transition-all tracking-wider flex items-center gap-3">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Bookmarks
            </button>

            <button className="w-full text-left px-4 py-2.5 text-xs text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/40 transition-all tracking-wider flex items-center gap-3">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </button>
          </div>

          <div className="border-t border-zinc-800 py-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-xs text-rose-500/70 hover:text-rose-400 hover:bg-zinc-800/40 transition-all tracking-wider flex items-center gap-3"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const getUser = () => jwtDecode(localStorage.getItem("token"));

// ── Main Home ──
export default function Home() {
  const [activeTab, setActiveTab] = useState("For you");
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomusers, setRandomUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(5);
  const [followedUsers, setFollowedUsers] = useState(0);
  const navigate = useNavigate();

  const url = "https://blog-backend-2nfz.onrender.com/api/posts/getpost";



  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const toggleBookmark = (id) =>
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const toggleLike = (e, postId) => {
    e.stopPropagation();
    const user = getUser();

    setPosts((prev) =>
      prev.map((p) => {
        if (p._id !== postId) return p;
        const alreadyLiked = p.likes?.includes(user.id);
        return {
          ...p,
          likes: alreadyLiked
            ? p.likes.filter((id) => id !== user.id)
            : [...(p.likes || []), user.id],
        };
      }),
    );

    axios
      .put(`https://blog-backend-2nfz.onrender.com

/api/posts/${postId}/like`, {
        userId: user.id,
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios
      .get(`https://blog-backend-2nfz.onrender.com

/api/users/getusers?userId=${user.id}`)
      .then((res) => {
        console.log(res.data);
        setRandomUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlefollow = (id) => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    setRandomUsers((prev) =>
      prev.map((u) =>
        u._id === id
          ? { ...u, status: u.status === "follow" ? "following" : "follow" }
          : u,
      ),
    );

    axios
      .put(`https://blog-backend-2nfz.onrender.com

/api/users/${id}/follow`, {
        userId: user.id,
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let count = 0;

    for (let i = 0; i < randomusers.length; i++) {
      if (randomusers[i].status === "following") {
        count++;
      }
    }

    setFollowedUsers(count);
  }, [randomusers]);
  console.log(followedUsers);

  return (
    <div className="min-h-screen bg-[#0c0a07] text-white">
      {/* ── Navbar ── */}
      <nav className="border-b border-zinc-800/60 sticky top-0 z-40 bg-[#0c0a07]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span
            className="text-amber-400 font-bold text-lg tracking-[5px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            BLOGIFY
          </span>
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab("For you")}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200 ${activeTab === "For you" ? "text-amber-400 border-b border-amber-400" : "text-zinc-600 hover:text-zinc-400"}`}
            >
              For you
            </button>
            <button
              onClick={() => (setActiveTab("Following"),

                navigate("/following"))
              }
              className={`cursor-pointer px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200 ${activeTab === "Following" ? "text-amber-400 border-b border-amber-400" : "text-zinc-600 hover:text-zinc-400"}`}
            >
              Following
            </button>
          </div>
          <div className="flex items-center cursor-pointer gap-4">
            <button
              onClick={() => navigate("/write")}
              className="hidden cursor-pointer md:block text-xs text-zinc-600 hover:text-amber-400 transition-colors tracking-widest uppercase"
            >
              Write
            </button>
            <ProfileDropdown posts={posts} />
          </div>
        </div>
      </nav>

      {/* ── Main Layout ── */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-12">
        <main className="flex-1 min-w-0">
          <div className="flex md:hidden gap-1 mb-8 border-b border-zinc-800">
            {["For you", "Following", "Trending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all ${activeTab === tab ? "text-amber-400 border-b border-amber-400" : "text-zinc-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-20">
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
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-600 text-sm tracking-wider">
                No posts yet — be the first to write!
              </p>
              <button
                onClick={() => navigate("/write")}
                className="mt-4 text-xs text-amber-400 tracking-widest uppercase border border-amber-400/30 px-6 py-2 hover:bg-amber-400/10 transition-all"
              >
                Write a post
              </button>
            </div>
          )}

          {!loading && (
            <div className="flex flex-col divide-y divide-zinc-800/60">
              {posts.map((post, i) => {
                const user = getUser();
                const isLiked = post.likes?.includes(user.id);
                return (
                  <article
                    key={post._id}
                    className="py-8 group cursor-pointer"
                    onClick={() => navigate(`/post/${post._id}`)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${avatarColors[i % avatarColors.length]}`}
                      >
                        {post.user?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-zinc-300">
                        {post.user}
                      </span>
                    </div>

                    <div className="flex gap-6 items-start">
                      <div className="flex-1 overflow-hidden">
                        <h2
                          className="text-white text-lg font-medium leading-snug mb-2 group-hover:text-amber-400/90 transition-colors duration-200"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {post.title}
                        </h2>
                        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 break-words">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-zinc-800/60 text-zinc-500 rounded border border-zinc-700/30 hover:border-amber-400/30 hover:text-amber-400/70 transition-all cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                      <div className="ml-auto flex items-center gap-4">
                        <button
                          onClick={(e) => toggleLike(e, post._id)}
                          className={`flex items-center gap-1.5 text-xs transition-colors ${isLiked ? "text-amber-400" : "text-zinc-600 hover:text-zinc-400"}`}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={isLiked ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          {post.likes?.length || 0}
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          {post.comments?.length || 0}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(post._id);
                          }}
                          className={`transition-colors ${bookmarks.includes(post._id) ? "text-amber-400" : "text-zinc-600 hover:text-zinc-400"}`}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={
                              bookmarks.includes(post._id)
                                ? "currentColor"
                                : "none"
                            }
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="text-center pt-6">
            <button className="text-xs text-zinc-600 hover:text-amber-400 transition-colors tracking-widest uppercase border border-zinc-800 hover:border-amber-400/30 px-8 py-3">
              Load more
            </button>
          </div>
        </main>

        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="mb-10">
            <p className="text-[10px] tracking-[4px] uppercase text-zinc-600 mb-4">
              Recommended topics
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="text-[11px] tracking-wider px-3 py-1.5 border border-zinc-800 text-zinc-500 hover:border-amber-400/40 hover:text-amber-400/80 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-800/60 mb-10" />

          <div className="mb-10">
            <p className="text-[10px] tracking-[4px] uppercase text-zinc-600 mb-4">
              Who to follow
            </p>
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto scroll-smooth custom-scroll">
              {randomusers.slice(0, visibleUsers).map((user, i) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${avatarColors[i % avatarColors.length]}`}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        {user.name}
                      </p>

                      {/* 👇 email + profession */}
                      <p className="text-[11px] text-zinc-600">
                        {user.profession || user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlefollow(user._id)}
                    className="text-[10px] tracking-widest uppercase text-zinc-600 border border-zinc-800 px-3 py-1 hover:border-amber-400/40 hover:text-amber-400 transition-all"
                  >
                    {user.status}
                  </button>
                </div>
              ))}
            </div>
            {visibleUsers < randomusers.length && (
              <button
                onClick={() => setVisibleUsers((prev) => prev + 5)}
                className="mt-4 cursor-pointer px-4 py-2 text-[11px] tracking-widest uppercase 
  text-amber-400 border border-amber-400/30 
  hover:bg-amber-400 hover:text-black 
  transition-all duration-300 ease-in-out 
  rounded-md flex items-center gap-2 group"
              >
                Load more
                {/* 👇 arrow icon with hover animation */}
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            )}
          </div>

          <div className="w-full h-px bg-zinc-800/60 mb-8" />

          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {["Help", "Status", "About", "Privacy", "Terms"].map((link) => (
              <span
                key={link}
                className="text-[10px] text-zinc-700 hover:text-zinc-500 cursor-pointer transition-colors tracking-wider"
              >
                {link}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-zinc-800 mt-3 tracking-widest">
            BLOGIFY 2025
          </p>
        </aside>
      </div>
    </div>
  );
}
