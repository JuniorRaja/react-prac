import { useState } from "react";
import OTPComponent from "./otpInput";

const PhoneOTPLogin = () => {
  const [phoneNo, setPhoneNumber] = useState("");
  const [ShowOTPInput, setShowOTPInput] = useState(false);

  const handlePhoneNo = (event) => {
    setPhoneNumber(event.target.value);
  };

  const SendOTP = (event) => {
    event.preventDefault();

    //Number Validation
    const regex = /[^0-9]/g;
    if (phoneNo.length < 10 || regex.test(phoneNo)) {
      alert("Invalid Phone Number");
    } else {
      //Call OTP API
      //Show OTP Input
      setShowOTPInput(true);
    }
  };

  const onOTPSubmit = (OTP) => {
    console.log(OTP + " OTP Verified. Login Successful");
  };

  return (
    <div>
      {!ShowOTPInput ? (
        <form onSubmit={SendOTP}>
          <input
            type="text"
            value={phoneNo}
            onChange={handlePhoneNo}
            placeholder="Enter Phone Number"
          />
          <button type="submit" onChange={SendOTP}>
            Sent OTP
          </button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNo}</p>
          <OTPComponent length={4} onOTPSubmit={onOTPSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOTPLogin;
