import React, { useState } from 'react';
import { X } from 'lucide-react';

function InfoGroup({ title, items }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h3>
      <dl className="space-y-1.5">
        {items.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{label}</dt>
            <dd className="text-xs font-medium text-gray-800 dark:text-gray-200 text-right truncate">{value ?? '—'}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CategoryPickerModal({ categories, onSelect, onClose }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-80 max-h-[70%] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Select Category</h3>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={16} />
          </button>
        </div>
        <ul className="overflow-y-auto flex-1 divide-y divide-gray-100 dark:divide-gray-700">
          {categories.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500">No categories available</li>
          ) : categories.map((cat) => (
            <li
              key={cat.category_id ?? cat.id}
              onClick={() => onSelect(cat.category_id ?? cat.id)}
              className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              {cat.category_name ?? cat.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OcrViewModal({ record, categories = [], onClose, onConfirm, onReturnError, onChangeCategory, onReprocess, isLoading }) {
  const [catPickerOpen, setCatPickerOpen] = useState(false);

  if (!record) return null;

  const imageUrl     = record.image_path;
  const categoryName = typeof record.category === 'object' && record.category !== null
    ? (record.category.category_name ?? record.category.name)
    : (record.category_name ?? record.category);
  const siteName     = typeof record.site === 'object' && record.site !== null
    ? (record.site.site_name ?? record.site.name)
    : (record.site_name ?? record.site);
  const uploaderName = record.uploader_name;

  const handleCategorySelect = (catId) => {
    setCatPickerOpen(false);
    onChangeCategory?.(record, catId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh]">

        {/* Category picker overlay */}
        {catPickerOpen && (
          <CategoryPickerModal
            categories={categories}
            onSelect={handleCategorySelect}
            onClose={() => setCatPickerOpen(false)}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
            {record.row_number != null ? `#${record.row_number} OCR Details` : 'OCR Details'}
          </h2>
          <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* Left: Image */}
          <div className="w-1/2 border-r border-gray-100 dark:border-gray-700 flex items-center justify-center bg-gray-50 dark:bg-gray-900/40 p-4">
            {imageUrl ? (
              <img src={imageUrl} alt="OCR Upload" className="max-w-full max-h-full object-contain rounded-lg" />
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500">No image available</p>
            )}
          </div>

          {/* Right: Info groups */}
          <div className="w-1/2 flex flex-col gap-3 p-4 overflow-y-auto">
            <InfoGroup
              title="OCR Result"
              items={[
                { label: 'Amount', value: record.ocr_amount != null ? `¥${Number(record.ocr_amount).toLocaleString()}` : null },
                { label: 'Date',   value: record.ocr_date },
              ]}
            />
            <InfoGroup
              title="Metadata"
              items={[
                { label: 'Category', value: categoryName },
                { label: 'Site',     value: siteName },
                { label: 'Uploader', value: uploaderName },
                { label: 'Source',   value: record.upload_source },
              ]}
            />
            <InfoGroup
              title="Correction"
              items={[
                { label: 'Amount', value: record.corrected_amount != null ? `¥${Number(record.corrected_amount).toLocaleString()}` : null },
                { label: 'Date',   value: record.corrected_date },
              ]}
            />
          </div>
        </div>

        {/* Footer: Action buttons */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 justify-end shrink-0">
          <button
            onClick={() => onConfirm?.(record)}
            disabled={isLoading}
            className="cursor-pointer px-4 py-2 rounded-lg bg-[#0F9D7A] hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            Mark As Confirmed
          </button>
          <button
            onClick={() => onReturnError?.(record)}
            disabled={isLoading}
            className="cursor-pointer px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            Return as Error
          </button>
          <button
            onClick={() => setCatPickerOpen(true)}
            disabled={isLoading}
            className="cursor-pointer px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            Change Category
          </button>
          <button
            onClick={() => onReprocess?.(record)}
            disabled={isLoading}
            className="cursor-pointer px-4 py-2 rounded-lg bg-[#1D69D7] hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            Reprocess
          </button>
        </div>
      </div>
    </div>
  );
}

export default OcrViewModal;
