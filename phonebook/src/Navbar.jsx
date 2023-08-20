// Import necessary components and functions from the react-router-dom library
import { Link, useMatch, useResolvedPath } from "react-router-dom";

// Define the Navbar component
export default function Navbar() {
  // Render a navigation bar with links
  return (
    <nav className="nav">
      <ul>
        {/* Create custom navigation links */}
        <CustomLink to="/phonebook">Phonebook</CustomLink>
        <CustomLink to="/addEntry">Add Entry</CustomLink>
        <CustomLink to="/addPhonebook">Add Phonebook</CustomLink>
      </ul>
    </nav>
  );
}

// Define a custom link component that applies styling to active links
function CustomLink({ to, children, ...props }) {
  // Resolve the path for the current link
  const resolvePath = useResolvedPath(to);
  // Check if the link is currently active in the route
  const isActive = useMatch({ path: resolvePath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      {/* Create a link with appropriate styling */}
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

// Define inline styles for the navigation components
const navStyle = {
  backgroundColor: "#333",
  color: "white",
  padding: "10px",
};

const ulStyle = {
  listStyle: "none",
  padding: "0",
  display: "flex",
};

const liStyle = {
  marginRight: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const activeStyle = {
  ...liStyle,
  fontWeight: "bold",
};
