// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

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

          {/* Add more later */}
          {/* <Route path="/occupants" element={<OccupantsPage />} /> */}
          {/* <Route path="/payments" element={<PaymentsPage />} /> */}
          {/* <Route path="/flats/:id" element={<FlatDetail />} /> */}
          {/* <Route path="/rooms/:id" element={<RoomDetail />} /> */}
        </Route>

        {/* Optional: 404 page or login outside layout */}
        <Route
          path="*"
          element={<div className="p-10 text-center">404 - Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
