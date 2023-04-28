import { NavLink } from "react-router-dom";

export default function Header(props) {
  const navlinks = [
    { key: 0, link: "/", name: "SKU Generator" },
    { key: 1, link: "/blank", name: "Blank" },
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="bg-gradient-to-r from-orange-500 from-50% to-orange-700 to-90% py-5 text-white fixed w-full">
        <div className="max-w-7xl px-5 mx-auto text-2xl font-medium">
          Design Tools{" "}
          <span className="text-xs italic font-medium text-orange-800">MJ</span>
        </div>
      </div>

      <div className="pt-16 pb-5 max-w-7xl mx-auto bg-white min-h-screen shadow-lg">
        <div className="hidden mx-auto justify-center bg-orange-100 text-gray-600 w-full pt-2">
          This tool is still under development !
        </div>
        <div className="py-3 px-5 mb-2">
          <div className="pt-3 text-base">
            {navlinks &&
              navlinks.map((x) => {
                return (
                  <NavLink
                    to={x.link}
                    key={x.key}
                    className={({ isActive }) => {
                      return (
                        "px-3 py-2 font-medium " +
                        (isActive
                          ? "text-white bg-orange-500 rounded-sm"
                          : "hover:bg-orange-300")
                      );
                    }}
                  >
                    {x.name}
                  </NavLink>
                );
              })}
          </div>
        </div>
        <div className="m-4 p-3 border border-gray-300 rounded-md shadow-md">
          {props.children}
        </div>
      </div>
    </div>
  );
}
