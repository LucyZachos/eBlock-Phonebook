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