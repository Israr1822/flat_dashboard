import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Occupants from "./components/Occupants";
import Flats from "./components/Flats";
import Payments from "./components/Payments";
import Room from "./components/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<Index />} />
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
