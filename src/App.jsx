import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Singlepage from "./pages/Singlepage";
import Profile from "./pages/Profile";
import Following from "./pages/Following";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />{" "}
        <Route path="/write" element={<Write />} />
        <Route path="/post/:id" element={<Singlepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/following" element={<Following />} />
      </Routes>
    </BrowserRouter>
  );
}
