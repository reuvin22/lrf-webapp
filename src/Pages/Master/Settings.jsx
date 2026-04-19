import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetSettingsQuery, useUpdateSettingMutation } from '../../store/api/master/SettingsApi';
import { SETTINGS_SECTIONS, SETTINGS_DEFAULTS } from '../../constants/SettingsConstants';

function Settings() {
  const { data, isLoading } = useGetSettingsQuery();
  const [updateSetting] = useUpdateSettingMutation();
  const [values, setValues]   = useState(SETTINGS_DEFAULTS);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.values) setValues({ ...SETTINGS_DEFAULTS, ...data.values });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const serverValues = data?.values ?? {};
      const changed = Object.entries(values).filter(
        ([key, value]) => String(value) !== String(serverValues[key] ?? '')
      );
      if (changed.length > 0) {
        await Promise.all(
          changed.map(([key, value]) =>
            updateSetting({
              system_settings_id: data?.idMap?.[key],
              key,
              value,
            }).unwrap()
          )
        );
      }
      toast.success('Settings saved successfully.');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {SETTINGS_SECTIONS.map(({ section, fields }) => (
          <div key={section} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-4">
              {section}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={values[f.name] ?? ''}
                    onChange={handleChange}
                    step={f.step}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
