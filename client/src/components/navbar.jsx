import React from "react";
import Logo1 from "../assets/logo.png";

function Navbar(props) {
  return (
    <header className="text-gray-400 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <a href="#" className="mr-5 text-black">First Link</a>
          <a href="#" className="mr-5 text-black">Second Link</a>
          <a href="#" className="mr-5 text-black">Third Link</a>
          <a href="#" className="text-black">Fourth Link</a>
        </nav>
        <a href="#" className="flex flex-col items-center order-first lg:order-none lg:w-1/5 title-font font-medium text-white lg:items-center lg:justify-center mb-4 md:mb-0">
          <p className="text-4xl">ARMADILLO</p>
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
