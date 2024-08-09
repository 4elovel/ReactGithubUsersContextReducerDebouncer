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
      return { ...state, users: action.payload, filteredUsers: action.payload };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
        filteredUsers: [...state.filteredUsers, action.payload],
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        filteredUsers: state.filteredUsers.filter(
          (user) => user.id !== action.payload
        ),
      };
    case "FILTER_USERS":
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
