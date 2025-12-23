import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import RoomListingPage from "./pages/rooms/RoomListingPage";
import RoomDetailsPage from "./pages/rooms/RoomDetailsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DestinationsPage from "./pages/explore/DestinationsPage";
import ExperiencesPage from "./pages/explore/ExperiencesPage";
import VillasPage from "./pages/explore/VillasPage";
import AboutUsPage from "./pages/company/AboutUsPage";
import CareersPage from "./pages/company/CareersPage";
import PressPage from "./pages/company/PressPage";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="villas" element={<VillasPage />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="press" element={<PressPage />} />
            <Route 
              path="hotels" 
              element={
                <ProtectedRoute>
                  <RoomListingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="rooms/:id" 
              element={
                <ProtectedRoute>
                  <RoomDetailsPage />
                </ProtectedRoute>
              } 
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
