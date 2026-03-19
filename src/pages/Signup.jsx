import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const strengthConfig = [
  { label: "Weak", color: "bg-red-500", width: "w-1/4" },
  { label: "Fair", color: "bg-orange-400", width: "w-2/4" },
  { label: "Good", color: "bg-yellow-400", width: "w-3/4" },
  { label: "Strong", color: "bg-amber-400", width: "w-full" },
];

const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const strength = getStrength(password);
  const cfg = strengthConfig[Math.max(0, strength - 1)];

  const url = "https://blog-backend-2nfz.onrender.com/api/auth/signup";



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) {
      toast.error("All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      axios
        .post(url, { name, email, password })
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            window.location.href = "/home";
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(
            err.response.data.error ||
              err.response.data.message ||
              "Something went wrong",
          );
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(
        err.response.data.error ||
          err.response.data.message ||
          "Something went wrong",
      );
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  return (
    <div className="min-h-screen bg-[#0c0a07] flex overflow-hidden">
      {/* ── Left Panel (form) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 relative">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          {/* logo */}
          <div className="mb-10">
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
              Join us today
            </p>
            <h1
              className="text-white text-4xl font-light"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Create account
            </h1>
          </div>

          {/* step indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div
              className={`h-px flex-1 transition-all duration-500 ${step >= 1 ? "bg-amber-400" : "bg-zinc-800"}`}
            />
            <span
              className={`text-[10px] tracking-[3px] transition-colors duration-300 ${step >= 1 ? "text-amber-400" : "text-zinc-700"}`}
            >
              INFO
            </span>
            <div
              className={`h-px flex-1 transition-all duration-500 ${step >= 2 ? "bg-amber-400" : "bg-zinc-800"}`}
            />
            <span
              className={`text-[10px] tracking-[3px] transition-colors duration-300 ${step >= 2 ? "text-amber-400" : "text-zinc-700"}`}
            >
              SECURE
            </span>
            <div
              className={`h-px flex-1 transition-all duration-500 ${step >= 3 ? "bg-amber-400" : "bg-zinc-800"}`}
            />
          </div>

          {/* form */}
          <form onSubmit={handleSubmit}>
            <InputField
              label="Full name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStep(2);
              }}
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setStep(2);
              }}
            />

            {/* password strength */}
            {password && (
              <div className="mb-6 -mt-2">
                <div className="h-0.5 bg-zinc-800 w-full rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${cfg.color} ${cfg.width}`}
                  />
                </div>
                <p
                  className={`text-[10px] mt-1.5 tracking-widest ${cfg.color.replace("bg-", "text-")}`}
                >
                  {cfg.label} password
                </p>
              </div>
            )}

            <InputField
              label="Confirm password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            {/* terms */}
            <div className="mb-8 mt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-zinc-700 mt-0.5 flex-shrink-0 group-hover:border-amber-400 transition-colors" />
                <span className="text-xs text-zinc-600 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-amber-400 cursor-pointer hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-amber-400 cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              onClick={() => setStep(3)}
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
                  CREATING...
                </>
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          <p className="text-center text-zinc-600 text-sm mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Sign in
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

      {/* ── Right Panel (decorative) ── */}
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
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full border border-amber-400/10 animate-ping"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-24 left-24 w-52 h-52 rounded-full border border-amber-400/10 animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <div className="absolute bottom-28 left-28 w-40 h-40 rounded-full border border-amber-400/20" />
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <p
            className="text-[120px] font-black leading-none text-amber-400/[0.04]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            JOIN
            <br />
            NOW.
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
        <div className="relative z-10 space-y-8">
          {[
            { num: "12k+", label: "Writers publishing daily" },
            { num: "48k+", label: "Stories shared so far" },
            { num: "200k+", label: "Monthly readers" },
          ].map(({ num, label }) => (
            <div key={num}>
              <p
                className="text-amber-400 text-4xl font-bold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {num}
              </p>
              <p className="text-zinc-600 text-sm mt-1">{label}</p>
              <div className="w-8 h-px bg-zinc-800 mt-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signup;
