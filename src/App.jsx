import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import StaffLoginPage from './pages/StaffLoginPage.jsx'
import ParentLayout from './pages/parent/ParentLayout.jsx'
import ParentDashboardPage from './pages/parent/ParentDashboardPage.jsx'
import ParentEnrolStudentPage from './pages/parent/ParentEnrolStudentPage.jsx'
import ParentSectionPlaceholder from './pages/parent/ParentSectionPlaceholder.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import AdminSectionPlaceholder from './pages/admin/AdminSectionPlaceholder.jsx'
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx'
import AdminRulesPage from './pages/admin/AdminRulesPage.jsx'
import AdminFormBuilderPage from './pages/admin/AdminFormBuilderPage.jsx'
import AdminSettingsPage from './pages/admin/AdminSettingsPage.jsx'
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage.jsx'
import AdminRegisterSchoolPage from './pages/admin/AdminRegisterSchoolPage.jsx'
import SltLayout from './pages/slt/SltLayout.jsx'
import SltHomePage from './pages/slt/SltHomePage.jsx'
import SltSectionPlaceholder from './pages/slt/SltSectionPlaceholder.jsx'
import ManagerLayout from './pages/manager/ManagerLayout.jsx'
import ManagerHomePage from './pages/manager/ManagerHomePage.jsx'
import ManagerSectionPlaceholder from './pages/manager/ManagerSectionPlaceholder.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/staff-login" element={<StaffLoginPage />} />
      <Route path="/parent" element={<ParentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboardPage />} />
        <Route path="enrol-student" element={<ParentEnrolStudentPage />} />
        <Route path="applications" element={<ParentSectionPlaceholder />} />
        <Route path="notifications" element={<ParentSectionPlaceholder />} />
      </Route>
      <Route path="/slt" element={<SltLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SltHomePage />} />
        <Route path="review-queue" element={<SltSectionPlaceholder />} />
        <Route path="interviews" element={<SltSectionPlaceholder />} />
        <Route path="reports" element={<SltSectionPlaceholder />} />
      </Route>
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ManagerHomePage />} />
        <Route path="applications" element={<ManagerSectionPlaceholder />} />
        <Route path="task-queue" element={<ManagerSectionPlaceholder />} />
        <Route path="assignments" element={<ManagerSectionPlaceholder />} />
        <Route path="reports" element={<ManagerSectionPlaceholder />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="form-builder" element={<AdminFormBuilderPage />} />
        <Route path="workflow" element={<Navigate to="register-school" replace />} />
        <Route path="register-school" element={<AdminRegisterSchoolPage />} />
        <Route path="rules" element={<AdminRulesPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
