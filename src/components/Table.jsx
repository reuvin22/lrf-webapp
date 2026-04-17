import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronDown, Eye, Pencil, UserMinus, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
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
 */

const PAGE_SIZE = 5;

const Table = ({
  title = 'Records',
  columns = [],
  data: dataProp = [],
  loading = false,
  fields = [],
  formColumns = 2,
  defaultValues = {},
  segmentTabs = [],
  activeSegment = '',
  onSegmentChange,
  searchKeys = [],
  searchPlaceholder = 'Search...',
  statusOptions = [],
  statusFilterKey = 'status',
  addTitle,
  editTitle,
  viewTitle,
  deleteMessage,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [records, setRecords]             = useState(dataProp ?? []);
  const [search, setSearch]               = useState('');
  const [statusFilter, setStatusFilter]   = useState('');
  const [page, setPage]                   = useState(1);
  const [formModal, setFormModal]         = useState({ isOpen: false, mode: 'add', record: null });
  const [pendingDelete, setPendingDelete] = useState(null);
  const [submitting, setSubmitting]       = useState(false);

  // Sync when the parent passes fresh data (e.g. after an async fetch resolves)
  useEffect(() => { setRecords(dataProp ?? []); }, [dataProp]);

  useEffect(() => { setPage(1); }, [search, statusFilter, activeSegment]);

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

  const openAdd   = ()    => setFormModal({ isOpen: true, mode: 'add',  record: null });
  const openEdit  = (rec) => setFormModal({ isOpen: true, mode: 'edit', record: rec  });
  const openView  = (rec) => setFormModal({ isOpen: true, mode: 'view', record: rec  });
  const closeForm = ()    => setFormModal({ isOpen: false, mode: 'add', record: null });

  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (formModal.mode === 'add') {
        const newRecord = { id: Date.now(), ...values };
        await onAdd?.(newRecord);
        setRecords((prev) => [...prev, newRecord]);
        toast.success('All set! Record added successfully.');
      } else {
        const updated = { ...formModal.record, ...values };
        await onEdit?.(updated);
        setRecords((prev) =>
          prev.map((r) => (r.id === formModal.record.id ? updated : r))
        );
        toast.success('Done! Changes saved successfully.');
      }
      closeForm();
    } catch {
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setSubmitting(true);
    try {
      await onDelete?.(pendingDelete);
      setRecords((prev) => prev.filter((r) => r.id !== pendingDelete.id));
      toast.success('Record removed successfully.');
      setPendingDelete(null);
    } catch {
      toast.error("Oops! Couldn't remove the record. Please try again.");
      setPendingDelete(null);
    } finally {
      setSubmitting(false);
    }
  };

  const renderCell = (col, value) => {
    if (col.render) {
      const output = col.render(value);
      if (typeof output === 'string' || typeof output === 'number') {
        return <span className="text-sm text-gray-800 dark:text-gray-200">{output}</span>;
      }
      return output;
    }

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

    return <span className="text-sm text-gray-800 dark:text-gray-200">{value ?? '—'}</span>;
  };

  const thAlign = (align) => {
    if (align === 'center') return 'text-center';
    if (align === 'right')  return 'text-right';
    return '';
  };

  const showingFrom = filtered.length === 0 ? 0 : pageStart + 1;
  const showingTo   = Math.min(pageStart + PAGE_SIZE, filtered.length);

  return (
    <div className="p-4 md:p-6 bg-[#F6F8FB] dark:bg-gray-900 min-w-0 flex-1 transition-colors duration-200">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
          <button
            onClick={openAdd}
            className="cursor-pointer w-full sm:w-auto bg-[#1D69D7] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        {/* ── Segment Tabs ────────────────────────────────────────────────────── */}
        {segmentTabs.length > 0 && (
          <div className="px-4 md:px-5 flex gap-1 border-b border-gray-100 dark:border-gray-700">
            {segmentTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onSegmentChange?.(tab.value)}
                className={`cursor-pointer px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeSegment === tab.value
                    ? 'border-[#0F9D7A] text-[#0F9D7A] dark:text-[#0F9D7A]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Search & Filter ─────────────────────────────────────────────────── */}
        <div className="px-4 md:px-5 py-3 flex flex-col md:flex-row gap-3 border-b border-gray-100 dark:border-gray-700">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>
          {statusOptions.length > 0 && (
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="cursor-pointer appearance-none h-full pl-3 pr-8 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 whitespace-nowrap transition-colors"
              >
                <option value="">All Statuses</option>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={14}
              />
            </div>
          )}
        </div>

        {/* ── Table ──────────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto scrollbar-table">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-gray-50/70 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap ${thAlign(col.align)}`}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="h-[265px]">
                    <div className="flex flex-col items-center justify-center gap-3 h-full">
                      <div className="w-11 h-11 rounded-full border-4 border-gray-200 dark:border-gray-600 border-t-[#0F9D7A] animate-spin" />
                      <p className="text-sm text-gray-400 dark:text-gray-500">Working on it...</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <>
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-5 py-6 text-center text-sm text-gray-400 dark:text-gray-500"
                    >
                      Nothing here yet — let's create something amazing.
                    </td>
                  </tr>
                  {Array.from({ length: PAGE_SIZE - 1 }).map((_, i) => (
                    <tr key={`empty-${i}`} className="h-[53px]">
                      <td colSpan={columns.length + 1} />
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  {pageRows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition-colors h-[53px]">
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-5 py-3 whitespace-nowrap ${thAlign(col.align)}`}
                        >
                          {renderCell(col, row[col.key])}
                        </td>
                      ))}
                      <td className="px-5 py-3 whitespace-nowrap">
                        <div className="flex justify-end gap-3 text-gray-400 dark:text-gray-500">
                          <button
                            onClick={() => openView(row)}
                            className="cursor-pointer hover:text-[#0F9D7A] transition-colors"
                            aria-label="View"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => openEdit(row)}
                            className="cursor-pointer hover:text-blue-500 transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setPendingDelete(row)}
                            className="cursor-pointer hover:text-red-700 transition-colors"
                            aria-label="Delete"
                          >
                            <UserMinus size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
        <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {filtered.length === 0
              ? 'No records'
              : `Showing ${showingFrom}–${showingTo} of ${filtered.length} record${filtered.length !== 1 ? 's' : ''}`
            }
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="cursor-pointer p-1.5 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const nearCurrent = Math.abs(p - safePage) <= 1;
              const isEdge      = p === 1 || p === totalPages;
              if (!nearCurrent && !isEdge) {
                const prevNearCurrent = Math.abs((p - 1) - safePage) <= 1;
                const prevIsEdge      = (p - 1) === 1 || (p - 1) === totalPages;
                if (!prevNearCurrent && !prevIsEdge) return null;
                return <span key={`ellipsis-${p}`} className="px-1 text-xs text-gray-300 dark:text-gray-600">…</span>;
              }
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`cursor-pointer w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                    p === safePage
                      ? 'bg-[#1D69D7] text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="cursor-pointer p-1.5 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
        initialValues={formModal.mode === 'add' ? defaultValues : (formModal.record ?? {})}
        submitting={submitting}
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
        loading={submitting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default Table;
