import { NavLink } from "react-router-dom";

export default function Header(props) {
  const navlinks = [
    { link: "/", name: "SKU Generator" },
    { link: "/test-page-2", name: "Test Page 2" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-orange-500 from-50% to-orange-700 to-90% py-5 text-white">
        <div className="max-w-7xl px-5 mx-auto text-2xl font-medium">
          Design Tools{" "}
          <span className="text-xs italic font-medium text-orange-800">
            by MJ
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white min-h-screen">
        <div className="py-3 px-5 mb-2">
          <div className="pt-3 text-sm">
            {navlinks &&
              navlinks.map((x) => {
                return (
                  <NavLink
                    to={x.link}
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
        <div className="m-4 p-3 border border-orange-300 rounded-md">
          {props.children}
        </div>
      </div>
    </div>
  );
}
