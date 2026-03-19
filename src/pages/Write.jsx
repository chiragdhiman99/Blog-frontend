import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const availableTags = ["JavaScript", "React", "Node.js", "MongoDB", "Career", "DevOps", "Python", "CSS", "Backend", "Frontend"];

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [wordCount, setWordCount] = useState(0);
  
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: [],
    user: user.name
  });

  const navigate = useNavigate();

  const handleContentChange = (e) => {
    setContent(e.target.value);
    const words = e.target.value.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setPostData(prev => ({ ...prev, content: e.target.value }));
  };

  const toggleTag = (tag) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : selectedTags.length < 5 ? [...selectedTags, tag] : selectedTags;
    setSelectedTags(updated);
    setPostData(prev => ({ ...prev, tags: updated }));
  };

  const readTime = Math.max(1, Math.ceil(wordCount / 200));

   const url = "http://localhost:5000/api/posts/createpost";

  const handlePublish = async () => {
   
    try {
      await axios.post(url, postData)
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a07] text-white">

      {/* ── Topbar ── */}
      <nav className="border-b border-zinc-800/60 sticky top-0 z-50 bg-[#0c0a07]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="text-zinc-600 hover:text-white transition-colors cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <span className="text-amber-400 font-bold text-base tracking-[5px]" style={{ fontFamily: "Georgia, serif" }}>
              BLOGIFY
            </span>
          </div>

          {/* right */}
          <div className="flex items-center gap-3">
            {wordCount > 0 && (
              <span className="text-zinc-700 text-xs tracking-wider hidden sm:block">
                {wordCount} words · {readTime} min read
              </span>
            )}
            <button className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-widest uppercase border border-zinc-800 px-4 py-2 hover:border-zinc-700 cursor-pointer">
              Save Draft
            </button>
            <button
              onClick={() => console.log(postData)}
              className="text-xs font-bold tracking-widest uppercase bg-amber-400 hover:bg-amber-300 text-black px-5 py-2 transition-colors cursor-pointer"
            >
              Publish →
            </button>
          </div>
        </div>
      </nav>

      {/* ── Editor ── */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Title */}
        <textarea
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setPostData(prev => ({ ...prev, title: e.target.value }));
          }}
          maxLength={100}
          rows={2}
          className="w-full bg-transparent text-white placeholder-zinc-800 text-4xl font-bold resize-none outline-none leading-tight mb-2"
          style={{ fontFamily: "Georgia, serif" }}
        />

        {title.length > 0 && (
          <p className="text-zinc-800 text-xs mb-6 tracking-wider">{title.length}/100</p>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-zinc-800/60" />
          <span className="text-zinc-800 text-[10px] tracking-[4px] uppercase">Your story</span>
          <div className="flex-1 h-px bg-zinc-800/60" />
        </div>

        {/* Content */}
        <textarea
          placeholder="Write your story here..."
          value={content}
          onChange={handleContentChange}
          className="w-full bg-transparent text-zinc-300 placeholder-zinc-800 text-base leading-8 resize-none outline-none min-h-[200px]"
          style={{ fontFamily: "Georgia, serif" }}
        />

        {/* Tags section */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60">
          <p className="text-[10px] tracking-[4px] uppercase text-zinc-600 mb-4">
            Add topics <span className="text-zinc-800">(max 5)</span>
          </p>

          {/* Selected tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTags.map(tag => (
                <span
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="text-[11px] tracking-wider uppercase px-3 py-1.5 bg-amber-400/10 text-amber-400 border border-amber-400/30 cursor-pointer hover:bg-amber-400/20 transition-all"
                >
                  {tag} ×
                </span>
              ))}
            </div>
          )}

          {/* Available tags */}
          <div className="flex flex-wrap gap-2">
            {availableTags.filter(t => !selectedTags.includes(t)).map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="text-[11px] tracking-wider uppercase px-3 py-1.5 border border-zinc-800 text-zinc-600 hover:border-amber-400/40 hover:text-amber-400/80 transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Custom tag input */}
          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Or type a custom tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && tagInput.trim() && selectedTags.length < 5) {
                  const newTag = tagInput.trim();
                  const updated = [...selectedTags, newTag];
                  setSelectedTags(updated);
                  setPostData(prev => ({ ...prev, tags: updated }));
                  setTagInput("");
                }
              }}
              className="bg-transparent border-b border-zinc-800 text-white text-sm outline-none py-2 placeholder-zinc-800 flex-1 focus:border-amber-400 transition-colors"
            />
            <span className="text-zinc-800 text-xs">Enter to add</span>
          </div>
        </div>

        {/* Bottom publish bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800/60 flex items-center justify-between">
          <p className="text-zinc-700 text-xs tracking-wider">
            {selectedTags.length === 0 ? "No topics selected" : `${selectedTags.length} topic${selectedTags.length > 1 ? "s" : ""} selected`}
          </p>
          <div className="flex gap-3">
            <button className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-widest uppercase border border-zinc-800 px-4 py-2 hover:border-zinc-700 cursor-pointer">
              Save Draft
            </button>
            <button
              onClick={() => handlePublish()}
              className="text-xs font-bold tracking-widest uppercase bg-amber-400 hover:bg-amber-300 text-black px-6 py-2 transition-colors active:scale-[0.98] cursor-pointer"
            >
              Publish →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Write;