import { User } from "./components/Users";
type ActionType =
  | { type: "SET_USERS"; payload: User[] }
  | { type: "ADD_USER"; payload: User }
  | { type: "DELETE_USER"; payload: number }
  | { type: "FILTER_USERS"; payload: string };

interface State {
  users: User[];
  filteredUsers: User[];
}

function userReducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "SET_USERS":
      console.log("set");
      console.log(action);
      return { users: action.payload, filteredUsers: action.payload };
    case "ADD_USER":
      console.log("add");
      console.log(action);
      return {
        ...state,
        users: [...state.users, action.payload],
        filteredUsers: [...state.filteredUsers, action.payload],
      };
    case "DELETE_USER":
      console.log("delete");
      console.log(action);
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        filteredUsers: state.filteredUsers.filter(
          (user) => user.id !== action.payload
        ),
      };
    case "FILTER_USERS":
      console.log("filter");
      console.log(action);
      return {
        ...state,
        filteredUsers: state.users.filter((user) =>
          user.login.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    default:
      return state;
  }
}
export default userReducer;
