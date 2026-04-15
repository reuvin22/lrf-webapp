import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronDown, Eye, Pencil, UserMinus, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmModal from './modals/ConfirmModal';
import FormModal from './modals/FormModal';

/**
 * Generic data table with built-in Add / Edit / View / Delete and pagination.
 *
 * Column shape:
 *   { key, label, align?, type?, badgeColors?, render?(value) }
 *   - type 'status'  → Active = blue badge, others = gray badge
 *   - type 'badge'   → requires badgeColors: { value: 'tailwind classes' }
 *   - render fn      → full custom cell (overrides type)
 *
 * @param {Object}   props
 * @param {string}   [props.title='Records']
 * @param {Array}    [props.columns=[]]
 * @param {Array}    [props.data=[]]               - Each row must have a unique `id`.
 * @param {Array}    [props.fields=[]]             - FormModal FieldConfig array.
 * @param {1|2|3|4}  [props.formColumns=2]         - FormModal grid column count.
 * @param {string[]} [props.searchKeys=[]]         - Keys to search (defaults to all column keys).
 * @param {string}   [props.searchPlaceholder]
 * @param {Array}    [props.statusOptions=[]]      - { value, label }[] for filter dropdown.
 * @param {string}   [props.statusFilterKey='status']
 * @param {string}   [props.addTitle]
 * @param {string}   [props.editTitle]
 * @param {string}   [props.viewTitle]
 * @param {Function} [props.deleteMessage]         - (row) => string
 */

const PAGE_SIZE = 9;

const Table = ({
  title = 'Records',
  columns = [],
  data: dataProp = [],
  fields = [],
  formColumns = 2,
  searchKeys = [],
  searchPlaceholder = 'Search...',
  statusOptions = [],
  statusFilterKey = 'status',
  addTitle,
  editTitle,
  viewTitle,
  deleteMessage,
}) => {
  const [records, setRecords]             = useState(dataProp);
  const [search, setSearch]               = useState('');
  const [statusFilter, setStatusFilter]   = useState('');
  const [page, setPage]                   = useState(1);
  const [formModal, setFormModal]         = useState({ isOpen: false, mode: 'add', record: null });
  const [pendingDelete, setPendingDelete] = useState(null);

  // Reset to page 1 whenever search or filter changes
  useEffect(() => { setPage(1); }, [search, statusFilter]);

  // ── Derived data ─────────────────────────────────────────────────────────────
  const keysToSearch = searchKeys.length > 0 ? searchKeys : columns.map((c) => c.key);

  const filtered = records.filter((row) => {
    const matchesSearch =
      !search ||
      keysToSearch.some((k) =>
        String(row[k] ?? '').toLowerCase().includes(search.toLowerCase())
      );
    const matchesStatus = !statusFilter || row[statusFilterKey] === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage    = Math.min(page, totalPages);
  const pageStart   = (safePage - 1) * PAGE_SIZE;
  const pageRows    = filtered.slice(pageStart, pageStart + PAGE_SIZE);
  const fillerCount = PAGE_SIZE - pageRows.length;

  // ── Modal helpers ────────────────────────────────────────────────────────────
  const openAdd   = ()    => setFormModal({ isOpen: true, mode: 'add',  record: null });
  const openEdit  = (rec) => setFormModal({ isOpen: true, mode: 'edit', record: rec  });
  const openView  = (rec) => setFormModal({ isOpen: true, mode: 'view', record: rec  });
  const closeForm = ()    => setFormModal({ isOpen: false, mode: 'add', record: null });

  const handleFormSubmit = (values) => {
    if (formModal.mode === 'add') {
      setRecords((prev) => [...prev, { id: Date.now(), ...values }]);
    } else {
      setRecords((prev) =>
        prev.map((r) => (r.id === formModal.record.id ? { ...r, ...values } : r))
      );
    }
    closeForm();
  };

  const handleDeleteConfirm = () => {
    setRecords((prev) => prev.filter((r) => r.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  // ── Cell rendering ───────────────────────────────────────────────────────────
  const renderCell = (col, value) => {
    if (col.render) return col.render(value);

    if (col.type === 'status') {
      return (
        <span
          className={`px-3 py-1 rounded-md text-xs font-bold text-white ${
            value === 'Active' ? 'bg-[#1D69D7]' : 'bg-gray-400'
          }`}
        >
          {value}
        </span>
      );
    }

    if (col.type === 'badge' && col.badgeColors) {
      const cls = col.badgeColors[value] ?? 'bg-gray-100 text-gray-700';
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
          {value}
        </span>
      );
    }

    return <span className="text-sm text-gray-800">{value ?? '—'}</span>;
  };

  const thAlign = (align) => {
    if (align === 'center') return 'text-center';
    if (align === 'right')  return 'text-right';
    return '';
  };

  const showingFrom = filtered.length === 0 ? 0 : pageStart + 1;
  const showingTo   = Math.min(pageStart + PAGE_SIZE, filtered.length);

  return (
    <div className="p-4 md:p-6 bg-[#F6F8FB] min-w-0 flex-1">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">{title}</h1>
          <button
            onClick={openAdd}
            className="cursor-pointer w-full sm:w-auto bg-[#1D69D7] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        {/* ── Search + Status filter ──────────────────────────────────────────── */}
        <div className="px-4 md:px-5 py-3 flex flex-col md:flex-row gap-3 border-b border-gray-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          {statusOptions.length > 0 && (
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="cursor-pointer appearance-none h-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 whitespace-nowrap"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
            </div>
          )}
        </div>

        {/* ── Table ──────────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto scrollbar-table">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap ${thAlign(col.align)}`}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <>
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-5 py-6 text-center text-sm text-gray-400"
                    >
                      Nothing here yet — let's create something amazing.
                    </td>
                  </tr>
                  {/* Filler rows keep the empty-state card the same height */}
                  {Array.from({ length: PAGE_SIZE - 1 }).map((_, i) => (
                    <tr key={`empty-${i}`} className="h-[53px]">
                      <td colSpan={columns.length + 1} />
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {pageRows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/60 transition-colors h-[53px]">
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-5 py-3 whitespace-nowrap ${thAlign(col.align)}`}
                        >
                          {renderCell(col, row[col.key])}
                        </td>
                      ))}
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="flex justify-end gap-3 text-gray-400">
                          <button
                            onClick={() => openView(row)}
                            className="cursor-pointer hover:text-[#0F9D7A] transition-colors"
                            aria-label="View"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => openEdit(row)}
                            className="cursor-pointer hover:text-blue-600 transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setPendingDelete(row)}
                            className="cursor-pointer text-[#EF4444] hover:text-red-700 transition-colors"
                            aria-label="Delete"
                          >
                            <UserMinus size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Filler rows keep the last page the same height as full pages */}
                  {Array.from({ length: fillerCount }).map((_, i) => (
                    <tr key={`filler-${i}`} className="h-[53px]">
                      <td colSpan={columns.length + 1} />
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────────── */}
        <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            {filtered.length === 0
              ? 'No records'
              : `Showing ${showingFrom}–${showingTo} of ${filtered.length} record${filtered.length !== 1 ? 's' : ''}`
            }
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="cursor-pointer p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              // Always show first, last, current ±1, and ellipsis for gaps
              const nearCurrent = Math.abs(p - safePage) <= 1;
              const isEdge      = p === 1 || p === totalPages;
              if (!nearCurrent && !isEdge) {
                // Show ellipsis only once per gap
                const prevNearCurrent = Math.abs((p - 1) - safePage) <= 1;
                const prevIsEdge      = (p - 1) === 1 || (p - 1) === totalPages;
                if (!prevNearCurrent && !prevIsEdge) return null;
                return <span key={`ellipsis-${p}`} className="px-1 text-xs text-gray-300">…</span>;
              }
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`cursor-pointer w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                    p === safePage
                      ? 'bg-[#1D69D7] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="cursor-pointer p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ── FormModal ──────────────────────────────────────────────────────────── */}
      <FormModal
        isOpen={formModal.isOpen}
        mode={formModal.mode}
        title={
          formModal.mode === 'add'  ? (addTitle  ?? 'Add New') :
          formModal.mode === 'edit' ? (editTitle ?? 'Edit')    :
                                     (viewTitle  ?? 'Details')
        }
        fields={fields}
        columns={formColumns}
        initialValues={formModal.record ?? {}}
        onSubmit={handleFormSubmit}
        onClose={closeForm}
      />

      {/* ── ConfirmModal ────────────────────────────────────────────────────────── */}
      <ConfirmModal
        isOpen={!!pendingDelete}
        variant="danger"
        title="Remove this record?"
        message={
          pendingDelete
            ? (deleteMessage?.(pendingDelete) ?? "You're about to remove this record. This action can't be undone.")
            : ''
        }
        confirmLabel="Yes, remove"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default Table;
