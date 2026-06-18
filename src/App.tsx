import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ContentEditor from './pages/admin/ContentEditor'
import ProjectManager from './pages/admin/ProjectManager'
import GalleryManager from './pages/admin/GalleryManager'
import ExperienceManager from './pages/admin/ExperienceManager'
import SkillsManager from './pages/admin/SkillsManager'
import SEOManager from './pages/admin/SEOManager'
import SettingsPage from './pages/admin/SettingsPage'
import ProtectedRoute from './components/shared/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import { useCMSStore } from './store/cmsStore'

function App() {
  const { initializeCMS } = useCMSStore()

  useEffect(() => {
    initializeCMS()
  }, [initializeCMS])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/project/:slug" element={<ProjectDetailPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="content" element={<ContentEditor />} />
        <Route path="projects" element={<ProjectManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="experience" element={<ExperienceManager />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="seo" element={<SEOManager />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
