import React from "react";

function navbar(props) {
  return (
    // <header className="text-gray-400 body-font">
    //   <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    //     <a href className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         className={`w-10 h-10 text-white p-2 bg-${props.theme}-500 rounded-full`}
    //         viewBox="0 0 24 24"
    //       >
    //         <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    //       </svg>
    //       <span className="ml-3 text-xl">Sentenial</span>
    //     </a>
    //     <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-black mt-4 md:mt-0">
    //       Button
    //       <svg
    //         fill="none"
    //         stroke="currentColor"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         className="w-4 h-4 ml-1"
    //         viewBox="0 0 24 24"
    //       >
    //         <path d="M5 12h14M12 5l7 7-7 7" />
    //       </svg>
    //     </button>
    //   </div>
    // </header>
    <header className="text-gray-400 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <a href className="mr-5 text-black">First Link</a>
          <a href className="mr-5 text-black">Second Link</a>
          <a href className="mr-5 text-black">Third Link</a>
          <a href className="text-black">Fourth Link</a>
        </nav>
        <a href className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className={`w-12 h-12 text-white p-2 rounded-full`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-3xl xl:block lg:hidden">Sentinel</span>
        </a>
        <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
          <button className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded mt-4 md:mt-0">
          </button>
        </div>
      </div>
    </header>
  );
}


export default navbar;