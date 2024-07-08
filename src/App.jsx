import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm"
const App = () => {
  // You can experiment with displaying the components by changing the initial state of user from null to something like { username: 'Shawn Doe' } and back to view the different templates.
  const [user, setUser] = useState(null);

  return (
    <>
      <NavBar user={user} />
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard user={user} />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}

        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        {/* passing setUser as a prop to our SignupForm component */}
      </Routes>
    </>
  );
};

export default App;
