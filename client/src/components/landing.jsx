import React, { useState, useEffect } from "react";
import "../App.css";
import { Card, TextInput } from "flowbite-react";
import Logo from "./logo";
import Navbar from "./navbar";
import Plot from "react-plotly.js";

function Landing() {
  const [inputType, setInputType] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [showLogo, setShowLogo] = useState(true);
  const [fadeLogo, setFadeLogo] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [breachData, setBreachData] = useState([]);
  const [risk, setRisk] = useState([]);
  const [years, setYears] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeLogo(true);
      setTimeout(() => {
        setShowLogo(false);
        setShowContent(true);
      }, 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTypeChange = (type) => {
    setInputType(type);
    setInputValue("");
    setBreachData([]);
    setRisk([]);
    setYears([]);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { [inputType]: inputValue };
    console.log("Sending data:", data);

    try {
      const response = await fetch(`http://127.0.0.1:8000/${inputType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Received response:", result);

      if (inputType === "email") {
        setBreachData(result[0]);
        setRisk(result[1]);
        setYears(result[2]);
      } else {
        setBreachData(result[0]);
        if (result[1] === "success") setStatus(true);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div id="land" className="landing-container min-h-screen flex flex-col items-center justify-center">
      {showLogo && <Logo fadeOut={fadeLogo} />}
      {showContent && (
        <>
          <Navbar />
          <Card className="input-card fade-in-slow mt-6 my-10" style={{ filter: "drop-shadow(4px 4px 6px #010101)" }}>
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
                    inputType === "domain" ? "bg-[#9748FF] text-white" : "bg-white text-[#333]"
                  }`}
                  onClick={() => handleTypeChange("domain")}
                >
                  Domain
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded ${
                    inputType === "password" ? "bg-[#9748FF] text-white" : "bg-white text-[#333]"
                  }`}
                  onClick={() => handleTypeChange("password")}
                >
                  Password
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
          {submitted && breachData.length > 0 && inputType === "email" ? (
            <div className="charts-container flex flex-row gap-4">
              <Plot
                data={[
                  {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: risk,
                    title: { text: "Risk Score" },
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                      axis: { range: [null, 150] },
                      bar: { color: risk < 25 ? "green" : "red" },
                    },
                  },
                ]}
                layout={{
                  width: 600,
                  height: 500,
                  paper_bgcolor: "black",
                  font: { color: "white", family: "Arial" },
                  margin: { t: 0, b: 0 },
                }}
              />
              <Plot
                data={[
                  {
                    x: Object.keys(years),
                    y: Object.values(years),
                    type: "scatter",
                  },
                ]}
                layout={{
                  width: 645,
                  height: 400,
                  title: "Breaches over the years",
                  plot_bgcolor: "black",
                  paper_bgcolor: "black",
                  font: { color: "white" },
                }}
              />
            </div>
          ) : null}
          <div className="mt-6">
            {breachData.length > 0 ? (
              breachData.map((item, index) => (
                <Card key={index} className="mx-auto my-4 p-4 bg-gray-900">
                  <img src={item.logo} alt={item.domain} className="w-16 h-16 " />
                  {inputType === "email" ? (
                    <>
                      <p className="font-bold text-center text-2xl">{item.domain}</p>
                      <p className="text-center">Data: {item.data}</p>
                      <p className="text-center">Date: {item.date}</p>
                      <p className="text-center">Records: {item.records}</p>
                    </>
                  ) : (
                    status && (
                      <>
                        <p className="font-bold text-center text">Records Breached : {item.records}</p>
                        <p className="text-center">Date: {item.date}</p>
                        <p className="text-center">Description: {item.description}</p>
                        <p className="text-center">Records: {item.fields}</p>
                        <p className="text-center">
                          To know more:{" "}
                          <a className="hover:underline" style={{color: "blue"}} href={item.url} >
                            {item.url}
                          </a>
                        </p>
                      </>
                    )
                  )}
                </Card>
              ))
            ) : (
              submitted && <p className="text-white text-center mb-4 text-4xl font-bold">You're safe!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Landing;
