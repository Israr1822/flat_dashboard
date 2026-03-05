import React from "react";
import { NavLink, } from "react-router-dom";
import { Home, Building, CreditCard,   DoorOpen, Users } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/flats", icon: Building, label: "Flats" },
  {to: "/payments", icon: CreditCard, label: "Payments" },
  {to: "/room", icon: DoorOpen, label: "Room" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-600 flex flex-col">

      <div className="px-5 py-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-blue-600 text-lg font-bold">
          F
        </div>
        <div>
          <p className="text-base font-semibold text-white leading-tight">
            Flats Hub
          </p>
          <p className="text-sm text-blue-200">Residences 🏠</p>
        </div>
      </div>

      
      <nav className="flex-1 px-3 mt-1">
        <ul className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "text-blue-100 hover:bg-blue-500"
                  }`
                }
              >
                <Icon size={20} strokeWidth={1.8} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
