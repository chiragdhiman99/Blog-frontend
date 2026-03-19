import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const InputField = ({ label, type = "text", value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="relative mb-6">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-zinc-700 pt-5 pb-2 text-white text-sm outline-none focus:border-amber-400 transition-all duration-300 pr-12"
      />
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none
          ${focused || value ? "top-0 text-[11px] text-amber-400 tracking-widest uppercase" : "top-4 text-sm text-zinc-500"}`}
      >
        {label}
      </label>
      <span
        className={`absolute bottom-0 left-0 h-px bg-amber-400 transition-all duration-300 ${focused ? "w-full" : "w-0"}`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-0 top-4 text-zinc-600 hover:text-amber-400 transition-colors text-[10px] tracking-widest"
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      )}
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:5000/api/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      axios
        .post(url, { email, password })
        .then((res) => {
          console.log(res);
          setLoading(false);
          localStorage.setItem("token", res.data.token);
                    toast.success(res.data.message);
                    setTimeout(() => {
                      window.location.href = "/home";
                    }, 1000);

        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error(
            error.response.data.error ||
              error.response.data.message ||
              "Something went wrong",
          );
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-[#0c0a07] flex overflow-hidden">
      {/* ── Left Panel (decorative) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#d4a84b 1px, transparent 1px), linear-gradient(90deg, #d4a84b 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full border border-amber-400/10 animate-ping"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute top-24 right-24 w-52 h-52 rounded-full border border-amber-400/10 animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <div className="absolute top-28 right-28 w-40 h-40 rounded-full border border-amber-400/20" />
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <p
            className="text-[130px] font-black leading-none text-amber-400/[0.04]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            LOG
            <br />
            IN.
          </p>
        </div>
        <div className="relative z-10">
          <span
            className="text-amber-400 font-bold text-2xl tracking-[6px]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            BLOGIFY
          </span>
        </div>
        <div className="relative z-10">
          <div className="w-8 h-px bg-amber-400 mb-5" />
          <p className="text-zinc-500 text-sm leading-7 max-w-xs">
            "The scariest moment is always just before you start. After that,
            things can only get better."
          </p>
          <p className="text-zinc-700 text-xs mt-4 tracking-widest">
            — STEPHEN KING
          </p>
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          {/* mobile logo */}
          <div className="mb-10 lg:hidden">
            <span
              className="text-amber-400 font-bold text-xl tracking-[6px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              BLOGIFY
            </span>
          </div>

          {/* heading */}
          <div className="mb-10">
            <p className="text-zinc-600 text-xs tracking-[4px] uppercase mb-2">
              Welcome back
            </p>
            <h1
              className="text-white text-4xl font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Sign in
            </h1>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-between items-center mb-8 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 border border-zinc-700 group-hover:border-amber-400 transition-colors flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
                <span className="text-xs text-zinc-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-xs text-zinc-600 hover:text-amber-400 transition-colors tracking-wide"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold py-4 tracking-[4px] uppercase transition-all duration-300 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
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
                  SIGNING IN...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <p className="text-center text-zinc-600 text-sm mt-8">
            New here?{" "}
            <Link
              to="/signup"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Create an account
            </Link>
          </p>

          <div className="mt-14 flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-800 text-[10px] tracking-[4px]">
              BLOGIFY 2025
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
