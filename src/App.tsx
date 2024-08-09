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
        const response = await fetch("https://api.github.com/users");
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
            addUser={(user) => dispatch({ type: "ADD_USER", payload: user })}
          />
          <Users
            users={state.filteredUsers}
            deleteUser={(id) => dispatch({ type: "DELETE_USER", payload: id })}
          />
        </>
      </ThemeHandler>
    </ThemeContext.Provider>
  );
}

export default App;
