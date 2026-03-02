// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All dashboard pages are wrapped in the layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />

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
