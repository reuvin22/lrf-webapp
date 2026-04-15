import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaFileInvoice,
  FaMoneyBill,
  FaChartBar,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaBuilding,
  FaHardHat,
  FaLink,
  FaTags,
} from 'react-icons/fa';

import Section from './SideNav/Section';
import MenuItem from './SideNav/MenuItem';

function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({
    attendance: true,
    payroll:    false,
    cost:       false,
    master:     true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={`shrink-0 h-screen flex flex-col bg-[#1C2536] text-white transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'} relative`}
    >
      {/* Header — fixed, never scrolls */}
      <div className="shrink-0 p-4">
        {!collapsed && (
          <>
            <h2 className="text-sm font-semibold">工事管理システム</h2>
            <p className="text-xs text-gray-400">Construction Admin</p>
          </>
        )}
      </div>

      {/* Nav items — scrolls independently when content overflows */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2 space-y-2 pb-4">
        <MenuItem icon={<FaTachometerAlt />} label="Dashboard" collapsed={collapsed} to="/" />

        <Section
          title="ATTENDANCE"
          collapsed={collapsed}
          open={openSections.attendance}
          onClick={() => toggleSection('attendance')}
        >
          <MenuItem icon={<FaCalendarAlt />}  label="Attendance List"       collapsed={collapsed} to="/attendance-list" />
          <MenuItem icon={<FaUsers />}        label="Subcontractor Reports" collapsed={collapsed} />
          <MenuItem icon={<FaFileInvoice />}  label="Closing Management"    collapsed={collapsed} />
        </Section>

        <Section
          title="PAYROLL"
          collapsed={collapsed}
          open={openSections.payroll}
          onClick={() => toggleSection('payroll')}
        >
          <MenuItem icon={<FaMoneyBill />} label="Payroll Base Data" collapsed={collapsed} />
          <MenuItem icon={<FaChartBar />}  label="MoneyForward"      collapsed={collapsed} />
        </Section>

        <Section
          title="COST MANAGEMENT"
          collapsed={collapsed}
          open={openSections.cost}
          onClick={() => toggleSection('cost')}
        >
          <MenuItem icon={<FaChartBar />}   label="Cost Summary"  collapsed={collapsed} />
          <MenuItem icon={<FaMoneyBill />}  label="Site Expenses" collapsed={collapsed} />
          <MenuItem icon={<FaFileInvoice />}label="Dotto Genka"   collapsed={collapsed} />
        </Section>

        <MenuItem icon={<FaFileInvoice />} label="OCR Management" collapsed={collapsed} />

        <Section
          title="MASTER DATA"
          collapsed={collapsed}
          open={openSections.master}
          onClick={() => toggleSection('master')}
        >
          <MenuItem icon={<FaUsers />}       label="Employees"        collapsed={collapsed} to="/master/employees"        />
          <MenuItem icon={<FaBuilding />}    label="Sites"            collapsed={collapsed} to="/master/sites"            />
          <MenuItem icon={<FaFileInvoice />} label="Subcontractors"   collapsed={collapsed} to="/master/subcontractors"   />
          <MenuItem icon={<FaHardHat />}     label="Workers"          collapsed={collapsed} to="/master/workers"          />
          <MenuItem icon={<FaLink />}        label="Site Assignments"  collapsed={collapsed} to="/master/site-assignments" />
          <MenuItem icon={<FaMoneyBill />}   label="Rates"            collapsed={collapsed} to="/master/rates"            />
          <MenuItem icon={<FaCalendarAlt />} label="Calendar"         collapsed={collapsed} />
          <MenuItem icon={<FaTags />}        label="Categories"       collapsed={collapsed} to="/master/categories"       />
          <MenuItem icon={<FaCog />}         label="Settings"         collapsed={collapsed} />
        </Section>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="cursor-pointer absolute -right-3 top-6 bg-white text-black rounded-full p-1 shadow"
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>
    </div>
  );
}

export default Sidenav;
