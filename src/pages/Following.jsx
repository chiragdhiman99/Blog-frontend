import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const avatarColors = [
  "bg-amber-400/20 text-amber-400",
  "bg-emerald-400/20 text-emerald-400",
  "bg-rose-400/20 text-rose-400",
  "bg-sky-400/20 text-sky-400",
  "bg-purple-400/20 text-purple-400",
];

const dummyFollowing = [
  { _id: "1", name: "Rahul Kumar", profession: "Frontend Developer" },
  { _id: "2", name: "Priya Sharma", profession: "Backend Developer" },
  { _id: "3", name: "Arjun Singh", profession: "Full Stack Dev" },
  { _id: "4", name: "Kavya Nair", profession: "UI/UX Designer" },
  { _id: "5", name: "Manish Verma", profession: "React Developer" },
];

export default function FollowingSection({ users = dummyFollowing }) {
  const navigate = useNavigate();
  const [unfollowed, setUnfollowed] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const handleUnfollow = (id) => {
    setUnfollowed((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
    );
  };

  const activeUsers = users.filter((u) => !unfollowed.includes(u._id));

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios
      .get(`http://localhost:5000/api/users/getusers?userId=${user.id}`)
      .then((res) => {
        console.log(res.data);
        setRandomUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filtered = randomUsers
      .filter((u) => u.status === "following")
      .map((u) => ({
        _id: u._id,
        name: u.name,
        profession: u.profession,
      }));

    setFollowedUsers(filtered);
  }, [randomUsers]);

  console.log(followedUsers);

  return (
    <div className="min-h-screen bg-[#0c0a07] text-white">
      {/* ── Navbar ── */}
      <nav className="border-b border-zinc-800/60 sticky top-0 z-50 bg-[#0c0a07]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
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
          <p className="text-zinc-600 text-xs tracking-widest uppercase">
            {followedUsers.length} Following
          </p>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] tracking-[4px] uppercase text-zinc-600 mb-1">
            Your network
          </p>
          <h1
            className="text-white text-2xl font-medium"
            style={{ fontFamily: "Georgia, serif" }}
          >
            People you follow
          </h1>
        </div>

        {/* Empty state */}
        {activeUsers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-600 text-sm tracking-wider mb-4">
              You are not following anyone yet
            </p>
            <button
              onClick={() => navigate("/home")}
              className="text-xs text-amber-400 tracking-widest uppercase border border-amber-400/30 px-6 py-2 hover:bg-amber-400/10 transition-all"
            >
              Discover people
            </button>
          </div>
        )}

        {/* Users list */}
        <div className="flex flex-col divide-y divide-zinc-800/60">
          {followedUsers.map((user, i) => (
            <div
              key={user._id}
              className="py-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    {user.profession}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUnfollow(user._id)}
                  className="text-[10px] tracking-widest uppercase border border-zinc-800 px-3 py-1.5 text-zinc-600 hover:border-rose-400/40 hover:text-rose-400 transition-all cursor-pointer"
                >
                  following
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
