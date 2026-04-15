import { Routes, Route } from 'react-router-dom';
import Layout from './app/Layout';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import AttendanceList from './Pages/Attendance/AttendanceList';
import Employee from './Pages/Master/Employee';
import Sites from './Pages/Master/Sites';
import Subcontractors from './Pages/Master/Subcontractors';
import Workers from './Pages/Master/Workers';
import SiteAssignments from './Pages/Master/SiteAssignments';
import Rates from './Pages/Master/Rates';
import Categories from './Pages/Master/Categories';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/"                         element={<Dashboard />}      />
        <Route path="/attendance-list"          element={<AttendanceList />} />

        {/* Master Data */}
        <Route path="/master/employees"         element={<Employee />}        />
        <Route path="/master/sites"             element={<Sites />}           />
        <Route path="/master/subcontractors"    element={<Subcontractors />}  />
        <Route path="/master/workers"           element={<Workers />}         />
        <Route path="/master/site-assignments"  element={<SiteAssignments />} />
        <Route path="/master/rates"             element={<Rates />}           />
        <Route path="/master/categories"        element={<Categories />}      />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
