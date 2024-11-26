import WorkoutTemplates from "./components/Templates/WorkoutTemplates";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <div className="bg-sky-100 w-full h-screen flex justify-center items-center">
      {/* <WorkoutTemplates/> */}
      {/* <Login /> */}
      <Signup />
    </div>
  );
}

export default App;
