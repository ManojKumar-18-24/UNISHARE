// import {  Container,Logo, LogoutBtn } from "./index";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function Header() {
//   const authStatus = useSelector((state) => state.status);
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       name: "Home",
//       slug: "/",
//       active: true,
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "Categories",
//       slug: "/categories", /*need some work here*/
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     },
//     {
//       name : "Notifications",
//       slug : "/notifications",
//       active: authStatus,
//     }
//   ];

//   return (
//     <header className="py-4 bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-200 shadow-md">
//       <Container>
//         <nav className="flex items-center justify-between">
//           {/* Logo and Text Section */}
//           <div className="flex items-center space-x-3">
//             <Link to="/" className="flex items-center space-x-3">
//               <Logo width="70px" />
//               <span className="text-3xl font-extrabold text-gray-800 tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-transparent bg-clip-text">
//                 Unishare
//               </span>
//             </Link>
//           </div>

//           {/* Navigation Links */}
//           <ul className="flex space-x-6">
//             {navItems.map(
//               (item) =>
//                 item.active && (
//                   <li key={item.name}>
//                     <button
//                       onClick={() => navigate(item.slug)}
//                       className="px-8 py-3 text-lg font-medium text-gray-800 bg-white rounded-full shadow-lg 
//                                  hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105"
//                     >
//                       {item.name}
//                     </button>
//                   </li>
//                 )
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// }

// export default Header;


import { Container, Logo, LogoutBtn } from "./index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function Header() {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const hideTimeout = useRef(null);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Categories",
      slug: "/categories",
      active: true,
      isDropdown: true,
      dropdownItems: [
        { name: "Books", slug: "/categories/books" },
        { name: "Gadgets", slug: "/categories/gadgets" },
        { name: "Sports Equipment", slug: "/categories/sports-equipment" },
        { name: "Costumes", slug: "/categories/costumes" },
      ],
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Notifications",
      slug: "/notifications",
      active: authStatus,
    },
  ];

  // Show dropdown immediately on hover
  const handleMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowCategories(true);
  };

  // Hide dropdown after a short delay when mouse leaves
  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setShowCategories(false);
    }, 300); // 300ms delay before hiding
  };

  return (
    <header className="py-4 bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-200 shadow-md">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <Logo width="70px" />
              <span className="text-3xl font-extrabold text-gray-800 tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 text-transparent bg-clip-text">
                Unishare
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex space-x-6 relative">
            {navItems.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className="relative"
                  onMouseEnter={item.isDropdown ? handleMouseEnter : null}
                  onMouseLeave={item.isDropdown ? handleMouseLeave : null}
                >
                  {item.isDropdown ? (
                    <>
                      <button
                        className="px-8 py-3 text-lg font-medium text-gray-800 bg-white rounded-full shadow-lg 
                                   hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105"
                        style={{ borderRadius: "12px" }} // Ensuring border-radius consistency
                      >
                        {item.name}
                      </button>

                      {showCategories && (
                        <ul
                          className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden"
                          onMouseEnter={handleMouseEnter} // Prevent hiding when hovering inside
                          onMouseLeave={handleMouseLeave} // Only hide if cursor leaves completely
                        >
                          {item.dropdownItems.map((subItem) => (
                            <li
                              key={subItem.name}
                              className="px-4 py-2 cursor-pointer transition-all duration-200 text-gray-800"
                              onClick={() => navigate(subItem.slug)}
                              style={{ borderRadius: "12px" }} // Matching border-radius
                            >
                              <span className="block px-4 py-2 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-400 hover:text-white rounded-lg transition-all duration-300">
                                {subItem.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-8 py-3 text-lg font-medium text-gray-800 bg-white rounded-full shadow-lg 
                                 hover:bg-gradient-to-r hover:from-blue-300 hover:to-purple-400 hover:text-white transition-all duration-300 transform hover:scale-105"
                      style={{ borderRadius: "12px" }} // Matching border-radius
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;




