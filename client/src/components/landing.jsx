import React, { useState, useEffect } from "react";
import "../App.css";
import { Card, TextInput } from "flowbite-react";
import Logo from "./logo";
import Navbar from "./navbar"; // Adjust the import path as necessary

function Landing() {
  const [inputType, setInputType] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [showLogo, setShowLogo] = useState(true);
  const [fadeLogo, setFadeLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeLogo(true);
      setTimeout(() => {
        setShowLogo(false);
        setShowContent(true);
      }, 2000); // Match the duration of the fade-out animation
    }, 2000); // Adjust the duration as necessary

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (type) => {
    setInputType(type);
    setInputValue("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { [inputType]: inputValue };
    console.log("Sending data:", data); // Log the data being sent

    try {
      const response = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Received response:", result); // Log the response data
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div id="land" className="landing-container h-screen flex flex-col items-center justify-center">
      {showLogo && <Logo fadeOut={fadeLogo} />}
      {showContent && (
        <>
          <Navbar />
          <Card className="input-card fade-in-slow mt-6">
            <form className="card-content flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
              <div className="flex gap-4 mb-4 justify-center">
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${
                    inputType === "email" ? "bg-[#9748FF] text-white" : "bg-white text-[#333]"
                  }`}
                  onClick={() => handleTypeChange("email")}
                >
                  Email
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${
                    inputType === "username" ? "bg-[#9748FF] text-white" : "bg-white text-[#333]"
                  }`}
                  onClick={() => handleTypeChange("username")}
                >
                  Username
                </button>
              </div>
              <div className="w-full">
                <TextInput
                  className="input w-full"
                  id={inputType}
                  type={inputType === "email" ? "email" : "text"}
                  placeholder={`Enter your ${inputType}`}
                  value={inputValue}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className="w-32 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out flex items-center justify-center">
                <span className="font-medium text-[#333] group-hover:text-white">Submit</span>
              </button>
            </form>
          </Card>
        </>
      )}
    </div>
  );
}

export default Landing;
