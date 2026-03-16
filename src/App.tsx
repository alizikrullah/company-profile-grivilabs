import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { TeamsProvider } from "./store/TeamsContext";
import { BlogProvider } from "./store/BlogContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import GuestRoute from "./components/layout/GuestRoute";
import ScrollToTop from "./components/layout/ScrollToTop";

// ------------------------------------
// LAZY ROUTES
// ------------------------------------

const Home       = lazy(() => import("./pages/Home"));
const About      = lazy(() => import("./pages/About"));
const Services   = lazy(() => import("./pages/Services"));
const Teams      = lazy(() => import("./pages/Teams"));
const BlogList   = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const EditBlog   = lazy(() => import("./pages/EditBlog"));
const Login      = lazy(() => import("./pages/Login"));
const Register   = lazy(() => import("./pages/Register"));
const NotFound   = lazy(() => import("./pages/NotFound"));

// ------------------------------------
// PAGE LOADER
// ------------------------------------

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 rounded-full border-2 border-[#2ad882]/30 border-t-[#2ad882] animate-spin" />
      <span className="font-inter text-xs tracking-[0.3em] text-[#9ca3af] uppercase">
        Loading...
      </span>
    </div>
  </div>
);

// ------------------------------------
// APP
// ------------------------------------

export default function App() {
  return (
    <TeamsProvider>
      <BlogProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/about"       element={<About />} />
              <Route path="/services"    element={<Services />} />
              <Route path="/teams"       element={<Teams />} />
              <Route path="/blog"        element={<BlogList />} />
              <Route path="/blog/:slug"  element={<BlogDetail />} />
              <Route path="/login"       element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/register"    element={<GuestRoute><Register /></GuestRoute>} />
              <Route
                path="/blog/create"
                element={<ProtectedRoute requireAdmin><CreateBlog /></ProtectedRoute>}
              />
              <Route
                path="/blog/edit/:slug"
                element={<ProtectedRoute requireAdmin><EditBlog /></ProtectedRoute>}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BlogProvider>
    </TeamsProvider>
  );
}
