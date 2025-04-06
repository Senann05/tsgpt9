import { useState } from "react"
import { Link } from "react-router-dom";
const Login =()=>{
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");

    const hanleLogin=(e: React.FormEvent)=>{
        e.preventDefault();
        console.log("Login:" ,{email, password});
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={hanleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <br/>
           <button type="submit"><Link to="/Dashboard">Login</Link></button>
            </form> 
        </div>
    )
}
export default Login