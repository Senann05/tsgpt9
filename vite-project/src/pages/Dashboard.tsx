import UserList from "../components/UserList";
// import { Link } from "react-router-dom";
function Dashboard(){
    return(
        <div>
            <h1>Xos Geldiniz!</h1>
            <UserList/>
            {/* <button><Link to="/Users">Add User</Link></button> */}

        </div>
    )
}
export default Dashboard;