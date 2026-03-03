import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Occupants from "./components/Occupants";
import Flats from "./components/Flats";
import Payments from "./components/Payments";
import Room from "./components/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Dashboard
                </h1>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-600">
                    Welcome to Flat Dashboard. Your occupants overview will
                    appear here.
                  </p>
                </div>
              </div>
            }
          />
          <Route path="/occupants" element={<Occupants />} />
          <Route path="/flats" element={<Flats />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/room" element={<Room />} />
        </Route>

        <Route
          path="*"
          element={<div className="p-10 text-center">404 - Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
