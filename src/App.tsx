import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Teams from './pages/Teams'
import BlogList from './pages/BlogList'
import CreateBlog from './pages/CreateBlog'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App