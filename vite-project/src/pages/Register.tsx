import { useState } from "react";
import { Link } from "react-router-dom";
const Register=()=>{
    const[name,setName]=useState("");
    const[email, setEmail]= useState("");
    const[password, setPassword]=useState("");

    const handleRegister=(e: React.FormEvent)=>{
        e.preventDefault;
        console.log("Register:",{name, email, password});
    };
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
            <input type="text" value={name} placeholder="Name" onChange={(e)=> setName(e.target.value)}/>
            <br/>
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <br/>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button type="submit"><Link to="/Dashboard">Login</Link></button>

        </form></div>
    )
}
export default Register;