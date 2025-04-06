// import { ReactNode , createContext, useEffect, useState } from "react";
// import { getUsers } from "../api/userService";

// interface User{
//     id: number;
//     name: string;
//     email: string;
// }
// interface UserContextType{
//     users: User[];
//     addUser: (user: User)=> void;
//     deleteUser: (id: number)=> void;
//     updateUser: (user: User)=> void;
//     fetchUser: ()=> void;
// }
// export const UserContext = createContext<UserContextType | null>(null);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//     const [users, setUsers] = useState<User[]>([])

//     const fetchUser = async() =>{
//         const fetchedUser = await getUsers();
//         setUsers(fetchedUser)
//     };
//     useEffect(()=>{
//         fetchUser();
//     },[])
    
//     const addUser=(user: User) => {
//         setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
//     };

//     const deleteUser= (id:number)=>{
//         setUsers((prev)=> prev.filter((u)=> u.id !==id))
//     };
    
//     const updateUser=(updatedUser: User)=>{
//         setUsers((prev)=>prev.map((u)=>(u.id === updatedUser.id? updatedUser : u)))
//     };

//     return(
//                 <UserContext.Provider value={{users, addUser ,updateUser, deleteUser, fetchUser}}>
//                 {children}
//             </UserContext.Provider>
//     )
// }
import { ReactNode, createContext, useEffect, useState } from "react";
import { getUsers } from "../api/userService";

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserContextType {
    users: User[];
    addUser: (user: User) => void;
    deleteUser: (id: number) => void;
    updateUser: (user: User) => void;
    fetchUser: () => void;
}

export const UserContext = createContext<UserContextType>({
    users: [],
    addUser: () => {},
    deleteUser: () => {},
    updateUser: () => {},
    fetchUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUser = async () => {
        const fetchedUser = await getUsers();
        setUsers(fetchedUser);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const addUser = (user: User) => {
        setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    };

    const deleteUser = (id: number) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const updateUser = (updatedUser: User) => {
        setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    };

    return (
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};
