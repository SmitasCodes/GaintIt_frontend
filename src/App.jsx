import WorkoutTemplates from "./components/Templates/WorkoutTemplates";
import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="bg-sky-100 w-full h-screen flex justify-center items-center">
      {/* <WorkoutTemplates/> */}
      <Login />
    </div>
  );
}

export default App;
