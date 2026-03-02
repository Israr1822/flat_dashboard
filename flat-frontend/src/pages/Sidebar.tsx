
import { NavLink } from 'react-router-dom';
import { Home, Users, Building, DollarSign, Calendar } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">Flat Dashboard</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Home size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/occupants"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Users size={20} />
              <span>Occupants</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/flats"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Building size={20} />
              <span>Flats</span>
            </NavLink>
          </li>
          {/* Add more links later: Payments, Rooms, Schedule */}
        </ul>
      </nav>
    </aside>
  );
}