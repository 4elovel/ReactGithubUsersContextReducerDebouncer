import styled from "styled-components";

interface Props {
  users: User[];
  deleteUser: (id: number) => void;
}

export interface User {
  id: number;
  login: string;
  avatar_url: string;
}

const DeleteButton = styled.button`
  font-size: 15px;
  border-radius: 25px;
  background-color: #9b1212;
  border-color: #721212;
  border-radius: 20px;
  border-style: groove;
`;

const Users = ({ users, deleteUser }: Props) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p style={{ display: "grid" }}>
              {user.login}{" "}
              <DeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  deleteUser(user.id);
                }}
              >
                Delete
              </DeleteButton>
            </p>
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              width="50"
              height="50"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
