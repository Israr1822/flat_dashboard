export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Welcome to Flat Dashboard. Your occupants overview will appear here.
        </p>
        {/* Add occupants table, stats cards, etc. here */}
      </div>
    </div>
  );
}
