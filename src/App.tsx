import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Users from "./components/Users";
import SearchForm from "./components/SearchForm";
import { User } from "./components/Users";
import userReducer from "./userReducer";
import { ThemeContext } from "./context";
import ThemeHandler from "./ThemeHandler";

interface State {
  users: User[];
  filteredUsers: User[];
}

const initialState: State = {
  users: [],
  filteredUsers: [],
};

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [theme, setTheme] = useState<"black" | "white">(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "black"
      : "white"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: "SET_USERS", payload: data });
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const addUser = async (user: User) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      dispatch({ type: "ADD_USER", payload: data });
    } catch (error) {
      console.error("Add user error:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      dispatch({ type: "DELETE_USER", payload: id });
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeHandler>
        <>
          <button
            onClick={() => {
              theme === "black" ? setTheme("white") : setTheme("black");
            }}
          >
            Change Theme
          </button>
          <SearchForm
            filterUsers={(query) =>
              dispatch({ type: "FILTER_USERS", payload: query })
            }
            addUser={addUser}
          />
          <Users users={state.filteredUsers} deleteUser={deleteUser} />
        </>
      </ThemeHandler>
    </ThemeContext.Provider>
  );
}

export default App;
