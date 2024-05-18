
import React, { useState, useEffect } from "react";
import "../App.css";
import { Card, TextInput } from "flowbite-react";
import Logo from "./logo";
import Navbar from "./navbar";

function Landing() {
  const [inputType, setInputType] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [showLogo, setShowLogo] = useState(true);
  const [fadeLogo, setFadeLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [breachData, setBreachData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeLogo(true);
      setTimeout(() => {
        setShowLogo(false);
        setShowContent(true);
      }, 2000);
    }, 500);
    // const apiResponse = [
    //   {
    //     domain: "pizap.com",
    //     logo: "https://xon-beta.pages.dev/static/logos/Pizap.png",
    //     data: "Email addresses;Genders;Names;Geographic locations;Social media profiles",
    //     date: "2017",
    //     records: 41779112,
    //   },
    //   {
    //     domain: "dubsmash.com",
    //     logo: "https://xon-beta.pages.dev/static/logos/Dubsmash.png",
    //     data: "Email addresses;Usernames;Passwords",
    //     date: "2018",
    //     records: 161835382,
    //   },
    //   {
    //     domain: "zynga.com",
    //     logo: "https://xon-beta.pages.dev/static/logos/Zynga.png",
    //     data: "Email addresses;Usernames;Passwords;Phone numbers",
    //     date: "2019",
    //     records: 172817913,
    //   },
    // ];

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
    console.log("Sending data:", data);

    try {
      const response = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Received response:", result);
      setBreachData(result);
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
          <Card className="input-card fade-in-slow mt-6" style={{ filter: "drop-shadow(4px 4px 6px #010101)" }}>
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
          <div className="mt-6">
            {breachData.map((item, index) => (
              <Card key={index} className="mx-auto my-4 p-4 bg-gray-900">
                <img src={item.logo} alt={item.domain} className="w-16 h-16 " />
                <p className="font-bold text-center text">{item.domain}</p>
                <p className="text-center">Data: {item.data}</p>
                <p className="text-center">Date: {item.date}</p>
                <p className="text-center">Records: {item.records}</p>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Landing;
