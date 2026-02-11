import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./components/homePage"
import AdminLogin from "./components/admin/adminLogin"
import AdminDashboard from "./components/admin/adminDashboard"
import { Header } from "./components/header"
import PrincipalPage from "./components/principlePage"
import TrusteesPage from "./components/trusteePage"
import SyllabusPage from "./components/syllabis"
import TeachingStaffPage from "./components/teachingStaff"
import AdmissionPage from "./components/admission"
import { Toaster } from "react-hot-toast"
import AdminPanel from "./components/admin/adminPanel"
import MPD from "./components/mfd"
import NewsAndEventsPage from "./components/events-news"

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          }
        }}
      />

      <BrowserRouter>
        <Routes>

          <Route element={<Header />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about/principal" element={<PrincipalPage />} />
            <Route path="/about/trustee" element={<TrusteesPage />} />
            <Route path="/academics/syllabus" element={<SyllabusPage />} />
            <Route path="/academics/teachingStaff" element={<TeachingStaffPage />} />
            <Route path="/mpd" element={<MPD />} />
            <Route path="/admission" element={<AdmissionPage />} />
            <Route path="/news-events" element={<NewsAndEventsPage />} />
          </Route>

          <Route path="/admin">
            <Route index element={<Navigate to="/admin/login" replace />} />
            <Route path="login" element={<AdminLogin replace />} />
            <Route path="panel" element={<AdminPanel />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App