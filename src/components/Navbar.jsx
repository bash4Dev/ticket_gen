import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Dev</div>
      <div className="navLinks">
        <ul>
          <li>Home</li>
          <li>Events</li>
          <li>About</li>
        </ul>
      </div>
      <div className="myTickets">My Tickets</div>
    </nav>
  );
}

export default Navbar;