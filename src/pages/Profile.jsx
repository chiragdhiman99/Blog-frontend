import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";

const avatarColors = [
  "bg-amber-400/20 text-amber-400",
  "bg-emerald-400/20 text-emerald-400",
  "bg-rose-400/20 text-rose-400",
  "bg-sky-400/20 text-sky-400",
];

const dummyPosts = [
  {
    _id: "1",
    title: "Difference between SQL and MySQL",
    content: "SQL is a programming language used to manage and query data in databases...",
    tags: ["React", "Node.js", "MongoDB"],
    likes: ["u1", "u2", "u3"],
    comments: ["c1", "c2"],
    createdAt: "2025-03-18T10:00:00Z",
  },
  {
    _id: "2",
    title: "How I built a full-stack app in 30 days",
    content: "Started with zero backend knowledge. Here's everything I learned...",
    tags: ["JavaScript", "Backend"],
    likes: ["u1"],
    comments: ["c1"],
    createdAt: "2025-03-15T10:00:00Z",
  },
  {
    _id: "3",
    title: "JWT vs Sessions — which one should you use?",
    content: "A practical comparison for beginners building their first auth system...",
    tags: ["Auth", "Security"],
    likes: ["u1", "u2"],
    comments: [],
    createdAt: "2025-03-10T10:00:00Z",
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const [activeTab, setActiveTab] = useState("Posts");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Building in public. Writing about web development and real-world projects.");
  const [editBio, setEditBio] = useState(bio);
  const[posts, setPosts] = useState([]);
  const [randomusers, setRandomUsers] = useState([]);
const [followedUsers, setFollowedUsers] = useState(0);
const [totalLikes, setTotalLikes] = useState(0);
const[userposts, setUserPosts] = useState([]);

  const handleSaveBio = () => {
    setBio(editBio);
    setIsEditing(false);
  };

  const url = "https://blog-backend-2nfz.onrender.com/api/posts/getpost";



  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  
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

useEffect(() => {
  axios.get(`https://blog-backend-2nfz.onrender.com

/api/posts/user/${user.name}`)
    .then((res) => {
      console.log(res.data)
      setUserPosts(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}, [])



  
    useEffect(() => {

         let count = 0;

  for (let i = 0; i < randomusers.length; i++) {
    if (randomusers[i].status === "following") {
      count++;
    }
  }

  setFollowedUsers(count);
    }, [randomusers]);
  
  

  useEffect(() => {

    let totallikes=0;

    for (let i = 0; i < userposts.length; i++) {
      totallikes += userposts[i].likes.length;
    }
    console.log(totallikes);

    setTotalLikes(totallikes);
  
  }, [posts]);



  return (
    <div className="min-h-screen bg-[#0c0a07] text-white">

      {/* ── Navbar ── */}
      <nav className="border-b border-zinc-800/60 sticky top-0 z-50 bg-[#0c0a07]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/home")} className="text-zinc-600 hover:text-white transition-colors cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <span className="text-amber-400 font-bold text-base tracking-[5px]" style={{ fontFamily: "Georgia, serif" }}>
              BLOGIFY
            </span>
          </div>
          <button
            onClick={() => navigate("/write")}
            className="text-xs text-zinc-600 hover:text-amber-400 transition-colors tracking-widest uppercase border border-zinc-800 px-4 py-2 hover:border-amber-400/30 cursor-pointer"
          >
            Write
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Cover + Avatar ── */}
        <div className="relative mb-16">
          <div className="h-36 bg-[#111009] border border-zinc-800/60 w-full" style={{
            backgroundImage: "linear-gradient(135deg, #1a1510 0%, #111009 50%, #0d0a06 100%)",
          }}>
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(#d4a84b 1px, transparent 1px), linear-gradient(90deg, #d4a84b 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-full bg-amber-400/20 border-4 border-[#0c0a07] flex items-center justify-center text-amber-400 text-2xl font-bold">
              {initials}
            </div>
          </div>

          {/* Edit button */}
          <div className="absolute bottom-3 right-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[10px] tracking-widest uppercase text-zinc-600 border border-zinc-800 px-4 py-2 hover:border-amber-400/40 hover:text-amber-400 transition-all cursor-pointer"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* ── User Info ── */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-medium mb-1" style={{ fontFamily: "Georgia, serif" }}>
            {user.name}
          </h1>
          <p className="text-zinc-600 text-sm mb-4">{user.email}</p>

          {isEditing ? (
            <div className="mb-4">
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={3}
                className="w-full bg-transparent border border-zinc-800 text-zinc-300 text-sm p-3 outline-none focus:border-amber-400 transition-colors resize-none"
                placeholder="Write your bio..."
              />
              <button
                onClick={handleSaveBio}
                className="mt-2 text-[10px] tracking-widest uppercase bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xl mb-4">{bio}</p>
          )}

          {/* Stats */}
          <div className="flex gap-8 pt-4 border-t border-zinc-800/60">
            <div className="cursor-pointer group">
              <p className="text-amber-400 text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                {userposts.length}
              </p>
              <p className="text-zinc-600 text-[10px] tracking-wider uppercase">Posts</p>
            </div>
            <div className="cursor-pointer group">
              <p className="text-amber-400 text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>0</p>
              <p className="text-zinc-600 text-[10px] tracking-wider uppercase">Followers</p>
            </div>
            <div className="cursor-pointer group">
              <p className="text-amber-400 text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>{followedUsers}</p>
              <p className="text-zinc-600 text-[10px] tracking-wider uppercase">Following</p>
            </div>
            <div>
              <p className="text-amber-400 text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
                {totalLikes}
              </p>
              <p className="text-zinc-600 text-[10px] tracking-wider uppercase">Total Likes</p>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-0 border-b border-zinc-800/60 mb-8">
          {["Posts", "Bookmarks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[11px] tracking-[3px] uppercase px-6 py-3 transition-all border-b-2 cursor-pointer
                ${activeTab === tab
                  ? "text-amber-400 border-amber-400"
                  : "text-zinc-600 border-transparent hover:text-zinc-400"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Posts Tab ── */}
        {activeTab === "Posts" && (
          <div className="flex flex-col divide-y divide-zinc-800/60">
            {userposts.map((post, i) => (
              <div
                key={post._id}
                className="py-6 group cursor-pointer"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                <div className="flex gap-6 items-start">
                  <div className="flex-1 overflow-hidden">
                    <h2
                      className="text-white text-lg font-medium leading-snug mb-2 group-hover:text-amber-400/90 transition-colors"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                      {post.content}
                    </p>
                  </div>
               
                </div>

                <div className="flex items-center gap-3 mt-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-zinc-800/60 text-zinc-500 rounded border border-zinc-700/30">
                      {tag}
                    </span>
                  ))}
                  <div className="ml-auto flex items-center gap-4 text-zinc-600 text-xs">
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      {post.likes.length}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {post.comments.length}
                    </span>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] tracking-widest uppercase text-zinc-700 hover:text-rose-400 transition-colors border border-zinc-800 hover:border-rose-400/30 px-3 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Liked Tab ── */}
        {activeTab === "Liked" && (
          <div className="text-center py-16">
            <p className="text-zinc-700 text-sm tracking-wider">No liked posts yet</p>
          </div>
        )}

        {/* ── Bookmarks Tab ── */}
        {activeTab === "Bookmarks" && (
          <div className="text-center py-16">
            <p className="text-zinc-700 text-sm tracking-wider">No bookmarks yet</p>
          </div>
        )}

      </div>
    </div>
  );
}