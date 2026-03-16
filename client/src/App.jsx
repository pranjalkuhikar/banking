import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transfer from "./pages/Transfer";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import Accounts from "./pages/Accounts";
import ProfilePage from "./pages/ProfilePage";

const ProtectedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0c0f1a] text-gray-900 dark:text-white overflow-hidden w-full relative transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {React.cloneElement(children, { onMenuClick: () => setIsSidebarOpen(true) })}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/transfer" element={<ProtectedLayout><Transfer /></ProtectedLayout>} />
          <Route path="/accounts" element={<ProtectedLayout><Accounts /></ProtectedLayout>} />
          <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<ProtectedLayout><NotFound /></ProtectedLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
