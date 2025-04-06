import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.";
// import Users from "./Users"

const UserList = () => {
    const userContext = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingUser, setEditingUser] = useState<number | null>(null);
    const [localUsers, setLocalUsers] = useState<Array<{id: number, name: string, email: string}>>([]);

    useEffect(() => {
        if (userContext) {
            userContext.fetchUser();
        }
    }, [userContext]);
    
    // Sync context users with local state
    useEffect(() => {
        if (userContext && userContext.users) {
            setLocalUsers(userContext.users);
        }
    }, [userContext?.users]);

    if (!userContext) {
        return <p>context yükleniyor...</p>;
    }

    const { addUser, deleteUser, updateUser } = userContext;

    const handleAddUser = () => {
        if (name.trim() === "" || email.trim() === "") {
            alert("Lütfen ad ve e-posta girin");
            return;
        }

        const newUser = { id: Date.now(), name, email };

        if (editingUser !== null) {
            updateUser({ id: editingUser, name, email });
            // Update local state immediately for UI feedback
            setLocalUsers(localUsers.map(user => 
                user.id === editingUser ? { ...user, name, email } : user
            ));
            setEditingUser(null);
        } else {
            addUser(newUser);
            // Add to local state immediately for UI feedback
            setLocalUsers([...localUsers, newUser]);
        }
        
        // Clear form fields
        setName("");
        setEmail("");
    };

    const handleDeleteUser = (userId: number) => {
        deleteUser(userId);
        // Remove from local state immediately for UI feedback
        setLocalUsers(localUsers.filter(user => user.id !== userId));
    };

    const handleEditUser = (userId: number, userName: string, userEmail: string) => {
        setName(userName);
        setEmail(userEmail);
        setEditingUser(userId);
    };

    return (
        <div>
            <h2>{localUsers.length === 0 ? "Kullanıcı listesi boş" : "Kullanıcı listesi"}</h2>
            
            {localUsers.length > 0 ? (
                <ul>
                    {localUsers.map((user) => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> - {user.email}
                            <button onClick={() => handleDeleteUser(user.id)} style={{marginLeft: '10px'}}>Delete</button>
                            <button onClick={() => handleEditUser(user.id, user.name, user.email)} style={{marginLeft: '5px'}}>Edit</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Henüz kullanıcı eklenmedi.</p>
            )}

            <div style={{marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                <h3>{editingUser !== null ? "Kullanıcıyı güncelle" : "Yeni kullanıcı ekle"}</h3>
                <div style={{marginBottom: '10px'}}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{padding: '5px', marginRight: '5px'}}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{padding: '5px'}}
                    />
                </div>
                <button 
                    onClick={handleAddUser}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                >
                    {editingUser !== null ? "Update" : "Add"}
                </button>
            </div>
        </div>
    );
};

export default UserList;