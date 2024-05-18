// import React from 'react';
// import "../App.css";
// import Logo1 from "../assets/logo.png";

// function Logo({ fadeOut }) {
//   return (
//     <div className={`logo-container ${fadeOut ? 'fade-out-slow' : ''}`}>
//       <img src={Logo1} alt="Logo" className="logo" />
//     </div>
//   );
// }

// export default Logo;

import React from "react";
import Logo1 from "../assets/logo.png";

function Logo({ fadeOut }) {
  return (
    <div className={`logo-container ${fadeOut ? 'fade-out' : ''}`}>
      <img src={Logo1} alt="Logo" className="logo" />
    </div>
  );
}

export default Logo;

