import WorkoutTemplates from "./components/Templates/WorkoutTemplates";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
import MainWindow from "./MainWIndow";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-neutral w-full h-screen flex justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            path="/login"
          />
          <Route
            element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
            path="/signup"
          />
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainWindow />} path="/" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
