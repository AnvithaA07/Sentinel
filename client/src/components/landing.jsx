import React, { useState } from "react";
import "../App.css";
import { Card, Label, TextInput, Radio } from "flowbite-react";

function Landing() {
  const [inputType, setInputType] = useState("email");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    setInputValue("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { [inputType]: inputValue };
    console.log("Sending data:", data);  // Log the data being sent

    try {
      const response = await fetch('http://127.0.0.1:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log("Received response:", result);  // Log the response data
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div id="land" className="landing-container h-screen">
      <Card className="input-card">
        <form className="card-content flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex-col w-full">
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor={inputType}
                value={`Enter your ${inputType} here:`}
              />
            </div>
            <TextInput
              className="input"
              id={inputType}
              type={inputType === "email" ? "email" : "text"}
              placeholder={`Enter your ${inputType}`}
              value={inputValue}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <Radio
                id="email-option"
                name="input-type"
                value="email"
                checked={inputType === "email"}
                onChange={handleTypeChange}
              />
              <span className="ml-2 text-white">Email</span>
            </label>
            <label className="flex items-center">
              <Radio
                id="username-option"
                name="input-type"
                value="username"
                checked={inputType === "username"}
                onChange={handleTypeChange}
              />
              <span className="ml-2 text-white">Username</span>
            </label>
          </div>
          <button className="w-32 h-12 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out flex items-center justify-center">
            <span className="font-medium text-[#333] group-hover:text-white">
              Submit
            </span>
          </button>
        </form>
      </Card>
    </div>
  );
}

export default Landing;

