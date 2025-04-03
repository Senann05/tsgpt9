import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.";

const Users = () => {
  const { users, fetchUser } = useContext(UserContext)!;

  useEffect(() => {
    fetchUser(); 
  }, [fetchUser]);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Users;
