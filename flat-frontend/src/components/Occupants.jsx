import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import { useOccupants } from "../hooks/useOccupants";

// ── Reusable form field ──────────────────────────────────────────────────────
function Field({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || label}
        className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:bg-background dark:border-border"
      />
    </div>
  );
}

// ── Occupant modal (shared for Add & Edit) ───────────────────────────────────
export function OccupantModal({ mode, initial, onClose, onSubmit }) {
  const isEdit = mode === "edit";
  const empty = {
    Name: "",
    flatnumber: "",
    contactnumber: "",
    cnicnumber: "",
    department: "",
    position: "",
    room_id: "",
  };

  const [form, setForm] = useState(
    isEdit && initial
      ? {
          Name: initial.name === "—" ? "" : initial.name,
          flatnumber: initial.flatnumber === "—" ? "" : initial.flatnumber,
          contactnumber: initial.contact === "—" ? "" : initial.contact,
          cnicnumber: initial.cnicnumber || "",
          department: initial.department === "—" ? "" : initial.department,
          position: initial.position === "—" ? "" : initial.position,
          room_id: initial.room === "—" ? "" : initial.room,
        }
      : empty,
  );
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setFormError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div className="relative bg-white dark:bg-card w-full max-w-lg mx-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-border animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-border">
          <div className="flex items-center gap-2">
            {isEdit ? (
              <Pencil className="h-5 w-5 text-primary" />
            ) : (
              <UserPlus className="h-5 w-5 text-primary" />
            )}
            <h2 className="text-base font-semibold text-foreground">
              {isEdit ? "Edit Occupant" : "Add New Occupant"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Full Name"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              required
            />
            <Field
              label="Contact Number"
              name="contactnumber"
              value={form.contactnumber}
              onChange={handleChange}
              type="tel"
            />
            <Field
              label="CNIC Number"
              name="cnicnumber"
              value={form.cnicnumber}
              onChange={handleChange}
            />
            <Field
              label="Flat Number"
              name="flatnumber"
              value={form.flatnumber}
              onChange={handleChange}
            />
            <Field
              label="Room"
              name="room_id"
              value={form.room_id}
              onChange={handleChange}
            />
            <Field
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
            <Field
              label="Position"
              name="position"
              value={form.position}
              onChange={handleChange}
            />
          </div>

          {formError && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              {formError}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-gray-200 dark:border-border rounded-lg hover:bg-gray-50 dark:hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-black bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Add Occupant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Confirmation dialog ──────────────────────────────────────────────────────
export function ConfirmDialog({ name, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="bg-white dark:bg-card w-full max-w-sm mx-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-border p-6 space-y-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🗑️</span>
          <div>
            <h3 className="font-semibold text-foreground">Delete Occupant?</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              <span className="font-medium text-foreground">{name}</span> will
              be permanently removed. This cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-muted-foreground border border-gray-200 dark:border-border rounded-lg hover:bg-gray-50 dark:hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Occupants page ──────────────────────────────────────────────────────
export default function Occupants() {
  const {
    occupants,
    loading,
    error,
    addOccupant,
    updateOccupant,
    deleteOccupant,
  } = useOccupants();

  const [search, setSearch] = useState("");

  // Modal state: null | { mode: "add" } | { mode: "edit", occupant: {...} }
  const [modal, setModal] = useState(null);

  // Confirm-delete state: null | { id, name }
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const filtered = occupants.filter((p) => {
    const s =
      `${p.name} ${p.room} ${p.flatnumber} ${p.contact} ${p.department}`.toLowerCase();
    return s.includes(search.toLowerCase());
  });

  // ── handlers ────────────────────────────────────────────────────────────────
  async function handleDelete() {
    if (!confirmDelete) return;
    setDeleteError(null);
    try {
      await deleteOccupant(confirmDelete.id);
      setConfirmDelete(null);
    } catch (err) {
      setDeleteError(err.message);
    }
  }

  async function handleModalSubmit(formData) {
    if (modal?.mode === "edit") {
      await updateOccupant(modal.occupant.id, formData);
    } else {
      await addOccupant(formData);
    }
  }

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <div>
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="text-primary" size={28} />
            <h1 className="text-2xl font-bold text-foreground">Occupants</h1>
          </div>
          <button
            onClick={() => setModal({ mode: "add" })}
            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm"
          >
            <UserPlus size={18} />
            Add Occupant
          </button>
        </div>

        {/* Search bar */}
        <div className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border shadow-sm mb-4 p-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search occupants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:bg-background"
            />
          </div>
        </div>

        {/* Delete error banner */}
        {deleteError && (
          <div className="mb-4 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600">
            {deleteError}
          </div>
        )}

        {/* Table card */}
        <div className="bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
              Loading occupants…
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-40 text-red-600 text-sm">
              Error: {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-muted/50 text-muted-foreground border-b border-gray-200 dark:border-border">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Contact</th>
                    <th className="px-5 py-3 font-medium">Flat</th>
                    <th className="px-5 py-3 font-medium">Room</th>
                    <th className="px-5 py-3 font-medium">Department</th>
                    <th className="px-5 py-3 font-medium">Position</th>
                    <th className="px-5 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-border">
                  {filtered.length === 0 ? (
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
                    filtered.map((person, index) => (
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
                              className="p-2 text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-muted rounded-lg transition-colors"
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
          )}
        </div>
      </div>

      {/* Add / Edit modal */}
      {modal && (
        <OccupantModal
          mode={modal.mode}
          initial={modal.occupant}
          onClose={() => setModal(null)}
          onSubmit={handleModalSubmit}
        />
      )}

      {/* Delete confirmation dialog */}
      {confirmDelete && (
        <ConfirmDialog
          name={confirmDelete.name}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmDelete(null);
            setDeleteError(null);
          }}
        />
      )}
    </>
  );
}
