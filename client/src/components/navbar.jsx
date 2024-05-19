import React from "react";
import Logo1 from "../assets/logo.png";

function Navbar(props) {
  return (
    <header className="static top-0 z-10 text-gray-400 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <a href="#" className="mr-5 text-transparent">First Link</a>
          <a href="#" className="mr-5 text-transparent">Second Link</a>
          <a href="#" className="mr-5 text-transparent">Third Link</a>
          <a href="#" className="text-transparent">Fourth Link</a>
        </nav>
        <a href="#" className="flex flex-col items-center order-first lg:order-none lg:w-1/5 title-font font-medium text-white lg:items-center lg:justify-center mb-4 md:mb-0">
          <p className="armadillo text-4xl">ARMADILLO</p>
          <img src={Logo1} alt="Logo" className="logo mt-2 w-40 h-30" />
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <button className=" text-black inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded mt-4 md:mt-0">
            Button
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
