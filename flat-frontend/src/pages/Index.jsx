import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useOccupants } from "../hooks/useOccupants";
import { OccupantModal, ConfirmDialog } from "../components/Occupants";



function StatCard({ title, value, subtitle, icon: Icon, variant = "default" }) {
  const variantStyles = {
    primary: "text-primary",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    overdue: "text-red-600 dark:text-red-400",
    default: "text-foreground",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-card dark:border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`text-2xl font-bold ${variantStyles[variant] || ""}`}>
            {value}
          </p>
        </div>
        {Icon && <Icon className="h-8 w-8 text-muted-foreground/70" />}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export default function Home() {
  const {
    occupants,
    loading,
    error,
    addOccupant,
    updateOccupant,
    deleteOccupant,
  } = useOccupants();

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredOccupants = occupants.filter((person) => {
    const searchStr =
      `${person.name || ""} ${person.room || ""} ${person.flatnumber || ""} ${person.contact || ""}  ${person.department || ""}`.toLowerCase();
    return searchStr.includes(search.toLowerCase());
  });

  const totalOccupied = occupants.length;
  const totalflats = 3;

  
  async function handleModalSubmit(formData) {
    if (modal?.mode === "edit") {
      await updateOccupant(modal.occupant.id, formData);
    } else {
      await addOccupant(formData);
    }
  }

  async function handleDeleteConfirm() {
    if (!confirmDelete) return;
    await deleteOccupant(confirmDelete.id);
    setConfirmDelete(null);
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading occupants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 pb-12">
        <div className="mb-8 animate-fade-in text-left">
          <h1 className="text-3xl font-bold text-foreground">Hi👋</h1>
          <p className="mt-1 text-muted-foreground">
            Here's how your rental family is doing today
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Occupants"
            value={totalOccupied}
            subtitle=""
            variant="primary"
          />
          <StatCard
            title="Active Flats"
            value={totalflats}
            subtitle=""
            variant="primary"
          />
          <StatCard title="Room" value={0} subtitle="" variant="primary" />
          <StatCard
            title="Unpaid Payments"
            value={0}
            subtitle=""
            variant="primary"
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm animate-fade-in overflow-hidden dark:bg-card dark:border-border">
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-gray-200 dark:border-border">
            <div>
              <h2 className="font-bold text-lg">All Occupants</h2>
              <p className="text-sm text-muted-foreground">
                Everyone living in your flats❤️
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-64 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search name,  dept..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:bg-background dark:border-border"
                />
              </div>

              <button
                onClick={() => setModal({ mode: "add" })}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-black bg-primary rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add Occupant
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 text-muted-foreground dark:bg-muted/50 border-b border-gray-200 dark:border-border">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Flat</th>
                  <th className="px-5 py-3 font-medium">Room</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Position</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-border">
                {filteredOccupants.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="h-32 text-center text-muted-foreground"
                    >
                      {occupants.length === 0
                        ? "No occupants yet. Add someone to get started."
                        : "No matching occupants found."}
                    </td>
                  </tr>
                ) : (
                  filteredOccupants.map((person, index) => (
                    <tr
                      key={person.id ?? `row-${index}`}
                      className="hover:bg-gray-50/50 dark:hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">
                        {person.name}
                      </td>
                      <td className="px-5 py-3">{person.contact}</td>
                      <td className="px-5 py-3">{person.flatnumber}</td>
                      <td className="px-5 py-3">{person.room}</td>
                      <td className="px-5 py-3">{person.department}</td>
                      <td className="px-5 py-3">{person.position}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-muted"
                            onClick={() =>
                              setModal({ mode: "edit", occupant: person })
                            }
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg transition-colors"
                            onClick={() =>
                              setConfirmDelete({
                                id: person.id,
                                name: person.name,
                              })
                            }
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modal && (
        <OccupantModal
          mode={modal.mode}
          initial={modal.occupant}
          onClose={() => setModal(null)}
          onSubmit={handleModalSubmit}
        />
      )}
      {confirmDelete && (
        <ConfirmDialog
          name={confirmDelete.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </>
  );
}
