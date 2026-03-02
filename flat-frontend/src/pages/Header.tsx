
export default function Header() {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Avantlabs flats</span>
          {/* Add avatar, notifications, logout later */}
        </div>
      </header>
    );
  }