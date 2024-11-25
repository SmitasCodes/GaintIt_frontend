import WorkoutTemplates from "./components/Templates/WorkoutTemplates";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/auth/Login";

function App() {

  const { isLoggedIn, checkAuth, logout } = useAuth();

  return (
    <div className="bg-sky-100 w-full h-screen flex justify-center items-center">
      {/* <WorkoutTemplates/> */}
      {isLoggedIn ? <p>LOGGED IN</p> : ""}
      <button onClick={logout}>Logout</button>
      <Login />
    </div>
  );
}

export default App;
