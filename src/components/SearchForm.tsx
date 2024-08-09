import { useEffect, useState } from "react";
import { User } from "./Users";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";

interface Props {
  filterUsers: (query: string) => void;
  addUser: (user: User) => void;
}

const BlueInput = styled.input`
  border-radius: 25px;
  background-color: #262b30;
  border-color: #5b95c9;
  border-radius: 20px;
  border-style: groove;
`;

const AddButton = styled.button`
  font-size: 15px;
  border-radius: 25px;
  background-color: #5b95c9;
  border-color: #3a6a85;
  margin-left: 10px;
`;

const SearchForm = ({ filterUsers, addUser }: Props) => {
  const [userSearch, setUserSearch] = useState("");
  const [newUserLogin, setNewUserLogin] = useState("");
  const debouncedValue = useDebounce(userSearch);

  useEffect(() => {
    filterUsers(debouncedValue);
  }, [debouncedValue]);

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now(),
      login: newUserLogin,
      avatar_url: "https://via.placeholder.com/50",
    };
    addUser(newUser);
    setNewUserLogin("");
  };

  return (
    <>
      <div>
        <BlueInput
          placeholder="Search users..."
          onChange={(e) => setUserSearch(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <BlueInput
          placeholder="New user login..."
          value={newUserLogin}
          onChange={(e) => setNewUserLogin(e.target.value)}
        />
        <AddButton onClick={handleAddUser}>Add User</AddButton>
      </div>
    </>
  );
};

export default SearchForm;
