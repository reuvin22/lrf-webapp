import { Routes, Route } from 'react-router-dom';
import Layout from './app/Layout';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;