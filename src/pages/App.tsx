import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import SignIn from "./auth/signin";
import SignUp from "./auth/register";
import Forget_Password from "./auth/forget-password";
import Update_Password from "./auth/update-password";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} index />
        <Route element={<SignIn />} path="/auth/signin" />
        <Route element={<SignUp />} path="/auth/register" />
        <Route element={<Forget_Password />} path="/auth/forget-password" />
        <Route
          element={<Update_Password />}
          path="/auth/update-password/:token"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
