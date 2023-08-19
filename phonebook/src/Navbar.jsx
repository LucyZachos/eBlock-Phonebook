import {Link, useMatch,useResolvedPath} from "react-router-dom"

export default function Navbar() {

    return (
    <nav className="nav">
        <ul>
            <CustomLink to="/phonebook">Phonebook</CustomLink>
            <CustomLink to="/addEntry">Add Entry</CustomLink>
            <CustomLink to="/addPhonebook">Add Phonebook</CustomLink>
        </ul>
    </nav>
    )
}

function CustomLink ({to, children,  ...props }){
    const resolvePath = useResolvedPath(to)
    const isActive = useMatch({path:resolvePath.pathname, end:true})
    return(
        <li className={isActive  ? "active" : ""} >
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

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