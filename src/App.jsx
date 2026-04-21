import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import ParentLayout from './pages/parent/ParentLayout.jsx'
import ParentDashboardPage from './pages/parent/ParentDashboardPage.jsx'
import ParentEnrolStudentPage from './pages/parent/ParentEnrolStudentPage.jsx'
import ParentSectionPlaceholder from './pages/parent/ParentSectionPlaceholder.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/parent" element={<ParentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ParentDashboardPage />} />
        <Route path="enrol-student" element={<ParentEnrolStudentPage />} />
        <Route path="applications" element={<ParentSectionPlaceholder />} />
        <Route path="notifications" element={<ParentSectionPlaceholder />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
