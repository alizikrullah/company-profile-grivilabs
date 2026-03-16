import { Routes, Route } from "react-router-dom";
import { TeamsProvider } from "./store/TeamsContext";
import { BlogProvider } from "./store/BlogContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import GuestRoute from "./components/layout/GuestRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Teams from "./pages/Teams";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditBlog from "./pages/EditBlog";

export default function App() {
  return (
    <TeamsProvider>
      <BlogProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
            <Route path="/blog/create" element={<ProtectedRoute requireAdmin><CreateBlog /></ProtectedRoute>}/>
            <Route path="/blog/edit/:slug" element={<ProtectedRoute requireAdmin><EditBlog /></ProtectedRoute>}/>
          </Routes>
        </main>
        <Footer />
      </BlogProvider>
    </TeamsProvider>
  );
}