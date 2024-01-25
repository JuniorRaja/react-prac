import React, { useEffect, useRef, useState } from "react";

const OTPComponent = ({ length = 4, onOTPSubmit = () => {} }) => {
  const [OTP, setOTP] = useState(new Array(length).fill(""));

  const inputRefs = useRef([]);

  // To Focus on first input field
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const inputValue = e.target.value;
    if (isNaN(inputValue)) return;

    const newOTP = [...OTP];
    newOTP[index] = inputValue.substring(inputValue.length - 1);

    //UseState is Async Fn
    setOTP(newOTP);

    const combinedOTP = newOTP.join("");
    if (combinedOTP.length === length) onOTPSubmit(combinedOTP);

    if (inputValue && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index, e) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };

  // Moving focus to prev input box on backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !OTP[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {OTP.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            value={value}
            ref={(input) => {
              inputRefs.current[index] = input;
            }}
            onChange={(e) => handleChange(index, e)}
            onClick={(e) => handleClick(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="OTP-Input"
          ></input>
        );
      })}
    </div>
  );
};

export default OTPComponent;
