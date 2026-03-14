import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}

export default Navbar