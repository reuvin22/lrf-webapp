export const SETTINGS_SECTIONS = [
  {
    section: 'Break Deduction',
    fields: [
      { name: 'break_deduction_tier1_threshold', label: 'Tier 1 Threshold',  type: 'number', defaultValue: 4   },
      { name: 'break_deduction_tier1_minutes',   label: 'Tier 1 Minutes',    type: 'number', defaultValue: 0  },
      { name: 'break_deduction_tier2_threshold', label: 'Tier 2 Threshold',  type: 'number', defaultValue: 8   },
      { name: 'break_deduction_tier2_minutes',   label: 'Tier 2 Minutes',    type: 'number', defaultValue: 45  },
      { name: 'break_deduction_tier3_minutes',   label: 'Tier 3 Minutes',    type: 'number', defaultValue: 90  },
    ],
  },
  {
    section: 'Work Hours',
    fields: [
      { name: 'standard_work_hours',          label: 'Standard Work Hours',          type: 'number', defaultValue: 8      },
      { name: 'subcontractor_standard_hours', label: 'Subcontractor Standard Hours', type: 'number', defaultValue: 8      },
      { name: 'work_start_earliest',          label: 'Work Start Earliest',          type: 'time',   defaultValue: '09:00' },
      { name: 'subcontractor_default_start',  label: 'Subcontractor Default Start',  type: 'time',   defaultValue: '09:00' },
      { name: 'closing_day',                  label: 'Closing Day',                  type: 'number', defaultValue: 10     },
    ],
  },
  {
    section: 'Rates',
    fields: [
      { name: 'overtime_rate',               label: 'Overtime Rate',               type: 'number', step: '0.01', defaultValue: 1.25 },
      { name: 'night_rate',                  label: 'Night Rate',                  type: 'number', step: '0.01', defaultValue: 1.50 },
      { name: 'legal_holiday_rate',          label: 'Legal Holiday Rate',          type: 'number', step: '0.01', defaultValue: 1.35 },
      { name: 'scheduled_holiday_rate',      label: 'Scheduled Holiday Rate',      type: 'number', step: '0.01', defaultValue: 1.25 },
      { name: 'night_overtime_rate',         label: 'Night Overtime Rate',         type: 'number', step: '0.01', defaultValue: 1.50 },
      { name: 'subcontractor_overtime_rate', label: 'Subcontractor Overtime Rate', type: 'number', step: '0.01', defaultValue: 1.25 },
    ],
  },
];

export const SETTINGS_DEFAULTS = SETTINGS_SECTIONS
  .flatMap((s) => s.fields)
  .reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue }), {});
