import { Link } from "react-router-dom"

const Navbar=()=>{
    return(
        <nav>
            <h1> Xos Geldiniz</h1>
            <ul>
                <li><Link to="/Dashboard">Dashboard</Link></li>
                <li><Link to="/Login">Login</Link></li> 
                <li><Link to="/Register">Register</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar