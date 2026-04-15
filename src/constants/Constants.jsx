// src/constants/Constants.jsx
// Static reference data for the LRF webapp.
// Replace with service calls once the backend is ready.

export const MONTHS = ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026"];

export const INVOICE_STATUSES = {
  PENDING: "Pending",
  SENT: "Sent",
  PAID: "Paid",
};

export const WORKER_ROLES = {
  CARPENTER: "Carpenter",
  STEEL_WORKER: "Steel Worker",
  ELECTRICIAN: "Electrician",
  PLUMBER: "Plumber",
  SCAFFOLDER: "Scaffolder",
  CONCRETE_WORKER: "Concrete Worker",
  MACHINE_OPERATOR: "Machine Operator",
  SAFETY_OFFICER: "Safety Officer",
};

/**
 * Monthly performance data.
 * Shape per month:
 *   summary   – top-level KPIs shown in the summary cards
 *   deployments – per-site subcontractor assignments with worker detail
 *     id            – unique identifier
 *     site          – site display name
 *     subcontractor – billing entity
 *     invoiceStatus – one of INVOICE_STATUSES
 *     workers[]     – { name, role, days, rate }  (rate = yen per day)
 */
export const MONTHLY_DATA = {
  "Jan 2026": {
    summary: {
      attendanceRate: 82,
      attendanceDays: "21 / 26",
      costTotal: "¥10,800,000",
      sitesCount: 5,
      closingStatus: "Completed",
      closingDaysLeft: 0,
    },
    deployments: [
      {
        id: 1,
        site: "Shinjuku Tower A",
        subcontractor: "Tanaka Construction Co.",
        invoiceStatus: "Paid",
        workers: [
          { name: "Yamada T.", role: "Carpenter",    days: 19, rate: 25000 },
          { name: "Ito M.",    role: "Scaffolder",   days: 21, rate: 22000 },
        ],
      },
      {
        id: 2,
        site: "Osaka Refinery B",
        subcontractor: "Kato Building Services",
        invoiceStatus: "Paid",
        workers: [
          { name: "Sato H.",     role: "Steel Worker",     days: 18, rate: 28000 },
          { name: "Watanabe R.", role: "Concrete Worker",  days: 20, rate: 23000 },
          { name: "Suzuki K.",   role: "Plumber",          days: 17, rate: 27000 },
        ],
      },
      {
        id: 3,
        site: "Yokohama Port C",
        subcontractor: "Matsumoto Works",
        invoiceStatus: "Paid",
        workers: [
          { name: "Tanaka I.",    role: "Electrician",     days: 20, rate: 30000 },
          { name: "Kobayashi Y.", role: "Machine Operator", days: 19, rate: 32000 },
        ],
      },
      {
        id: 4,
        site: "Nagoya Station D",
        subcontractor: "Hayashi Contractors",
        invoiceStatus: "Paid",
        workers: [
          { name: "Nakamura S.", role: "Safety Officer", days: 14, rate: 35000 },
        ],
      },
      {
        id: 5,
        site: "Sapporo Complex E",
        subcontractor: "Inoue Engineering",
        invoiceStatus: "Paid",
        workers: [
          { name: "Ito M.",    role: "Scaffolder", days: 5, rate: 22000 },
          { name: "Yamada T.", role: "Carpenter",  days: 4, rate: 25000 },
        ],
      },
    ],
  },

  "Feb 2026": {
    summary: {
      attendanceRate: 85,
      attendanceDays: "22 / 26",
      costTotal: "¥12,500,000",
      sitesCount: 5,
      closingStatus: "In Progress",
      closingDaysLeft: 15,
    },
    deployments: [
      {
        id: 1,
        site: "Shinjuku Tower A",
        subcontractor: "Tanaka Construction Co.",
        invoiceStatus: "Pending",
        workers: [
          { name: "Yamada T.", role: "Carpenter",  days: 20, rate: 25000 },
          { name: "Ito M.",    role: "Scaffolder", days: 22, rate: 22000 },
          { name: "Suzuki K.", role: "Plumber",    days: 18, rate: 27000 },
        ],
      },
      {
        id: 2,
        site: "Osaka Refinery B",
        subcontractor: "Kato Building Services",
        invoiceStatus: "Sent",
        workers: [
          { name: "Sato H.",     role: "Steel Worker",    days: 19, rate: 28000 },
          { name: "Watanabe R.", role: "Concrete Worker", days: 21, rate: 23000 },
        ],
      },
      {
        id: 3,
        site: "Yokohama Port C",
        subcontractor: "Matsumoto Works",
        invoiceStatus: "Paid",
        workers: [
          { name: "Tanaka I.",    role: "Electrician",      days: 21, rate: 30000 },
          { name: "Kobayashi Y.", role: "Machine Operator", days: 20, rate: 32000 },
        ],
      },
      {
        id: 4,
        site: "Nagoya Station D",
        subcontractor: "Hayashi Contractors",
        invoiceStatus: "Pending",
        workers: [
          { name: "Nakamura S.", role: "Safety Officer", days: 15, rate: 35000 },
          { name: "Yamada T.",   role: "Carpenter",      days:  8, rate: 25000 },
        ],
      },
      {
        id: 5,
        site: "Sapporo Complex E",
        subcontractor: "Inoue Engineering",
        invoiceStatus: "Sent",
        workers: [
          { name: "Ito M.", role: "Scaffolder", days: 6, rate: 22000 },
        ],
      },
    ],
  },

  "Mar 2026": {
    summary: {
      attendanceRate: 88,
      attendanceDays: "23 / 26",
      costTotal: "¥13,200,000",
      sitesCount: 5,
      closingStatus: "Open",
      closingDaysLeft: 28,
    },
    deployments: [
      {
        id: 1,
        site: "Shinjuku Tower A",
        subcontractor: "Tanaka Construction Co.",
        invoiceStatus: "Pending",
        workers: [
          { name: "Yamada T.",   role: "Carpenter",       days: 22, rate: 25000 },
          { name: "Ito M.",      role: "Scaffolder",      days: 23, rate: 22000 },
          { name: "Suzuki K.",   role: "Plumber",         days: 20, rate: 27000 },
          { name: "Watanabe R.", role: "Concrete Worker", days: 18, rate: 23000 },
        ],
      },
      {
        id: 2,
        site: "Osaka Refinery B",
        subcontractor: "Kato Building Services",
        invoiceStatus: "Pending",
        workers: [
          { name: "Sato H.",     role: "Steel Worker",     days: 21, rate: 28000 },
          { name: "Kobayashi Y.", role: "Machine Operator", days: 22, rate: 32000 },
        ],
      },
      {
        id: 3,
        site: "Yokohama Port C",
        subcontractor: "Matsumoto Works",
        invoiceStatus: "Pending",
        workers: [
          { name: "Tanaka I.", role: "Electrician", days: 23, rate: 30000 },
        ],
      },
      {
        id: 4,
        site: "Nagoya Station D",
        subcontractor: "Hayashi Contractors",
        invoiceStatus: "Pending",
        workers: [
          { name: "Nakamura S.", role: "Safety Officer", days: 20, rate: 35000 },
          { name: "Sato H.",     role: "Steel Worker",   days: 12, rate: 28000 },
        ],
      },
      {
        id: 5,
        site: "Sapporo Complex E",
        subcontractor: "Inoue Engineering",
        invoiceStatus: "Pending",
        workers: [
          { name: "Ito M.",    role: "Scaffolder", days: 10, rate: 22000 },
          { name: "Yamada T.", role: "Carpenter",  days:  8, rate: 25000 },
        ],
      },
    ],
  },

  "Apr 2026": {
    summary: {
      attendanceRate: 79,
      attendanceDays: "10 / 13",
      costTotal: "¥5,600,000",
      sitesCount: 4,
      closingStatus: "Open",
      closingDaysLeft: 17,
    },
    deployments: [
      {
        id: 1,
        site: "Shinjuku Tower A",
        subcontractor: "Tanaka Construction Co.",
        invoiceStatus: "Pending",
        workers: [
          { name: "Yamada T.", role: "Carpenter", days: 10, rate: 25000 },
          { name: "Suzuki K.", role: "Plumber",   days:  9, rate: 27000 },
        ],
      },
      {
        id: 2,
        site: "Osaka Refinery B",
        subcontractor: "Kato Building Services",
        invoiceStatus: "Pending",
        workers: [
          { name: "Sato H.",     role: "Steel Worker",    days: 11, rate: 28000 },
          { name: "Watanabe R.", role: "Concrete Worker", days: 10, rate: 23000 },
        ],
      },
      {
        id: 3,
        site: "Yokohama Port C",
        subcontractor: "Matsumoto Works",
        invoiceStatus: "Pending",
        workers: [
          { name: "Tanaka I.",    role: "Electrician",      days: 12, rate: 30000 },
          { name: "Kobayashi Y.", role: "Machine Operator", days: 10, rate: 32000 },
        ],
      },
      {
        id: 4,
        site: "Nagoya Station D",
        subcontractor: "Hayashi Contractors",
        invoiceStatus: "Pending",
        workers: [
          { name: "Nakamura S.", role: "Safety Officer", days: 8, rate: 35000 },
        ],
      },
    ],
  },
};
