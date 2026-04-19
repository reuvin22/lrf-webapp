import { Routes, Route } from 'react-router-dom';
import Layout from './app/Layout';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import AttendanceList from './Pages/Attendance/AttendanceList';
import Table from './components/Table';

import Employee from './Pages/Master/Employee';
import Sites from './Pages/Master/Sites';
import Workers from './Pages/Master/Workers';
import Rates from './Pages/Master/Rates';
import Subcontractors from './Pages/Master/Subcontractors';
import Categories from './Pages/Master/Categories';
import SiteAssignments from './Pages/Master/SiteAssignments';
import Calendar from './Pages/Master/Calendar';
import Settings from './Pages/Master/Settings';
import OcrManagement from './Pages/OcrManagement';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<Table />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        <Route path="/ocr-management" element={<OcrManagement />} />

        <Route path="/master">
          <Route path="employees" element={<Employee />} />
          <Route path="sites" element={<Sites />} />
          <Route path="workers" element={<Workers />} />
          <Route path="rates" element={<Rates />} />
          <Route path="subcontractors" element={<Subcontractors />} />
          <Route path="categories" element={<Categories />} />
          <Route path="site-assignments" element={<SiteAssignments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;