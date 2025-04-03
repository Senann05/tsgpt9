import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.";

const UserList=()=>{
    const userContext = useContext(UserContext);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[editingUser,setEditingUser]=useState<number | null>(null);

    useEffect(()=>{
       if(userContext){
        userContext.fetchUser()}
    },[useContext]);
    if(!userContext){
        return <p>context yukleniyor...</p>
    }
    const {users, addUser, deleteUser, updateUser} = userContext;

    const handleAddUser=()=>{
        if(name.trim()==="" || email.trim()==="")return;

        if (editingUser !==null){
            updateUser({id:editingUser, name, email})
            setEditingUser(null);
        }else{
            addUser({id:0,name,email})
        }
        setName("");
        setEmail("");
    };
    const handleEditUser=(userId:number, userName:string, userEmail:string)=>{
        setName(userName);
        setEmail(userEmail);
        setEditingUser(userId);
    }
    return(
        <div>
            <h2>{users.length===0? "kullanici listesi bos": "kullanici listei"}</h2>
            <ul>
                {users.map((user)=> (
                    <li key={user.id}>{user.name} - {user.email}
                    <button onClick={()=> deleteUser(user.id)}>Delete</button>
                    <button onClick={()=> handleEditUser(user.id, user.name, user.email)}>Edit</button>
                    </li>
                ))}
            </ul>

            <h3>{editingUser !== null? "kullaniciyi guncelle": "yeni kullanici ekle"}</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <button onClick={handleAddUser}>{handleEditUser !==null?"Add" : "Update"}</button>
        </div>
    )

}
export default UserList;