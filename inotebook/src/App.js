import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDetails from "./components/UserDetails";

function App() {
  const [alert, setAlert] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [text, setText] = useState("Enable Dark");
  const handleMode = () => {
    if (text === "Enable Dark") {
      document.body.style.backgroundColor = "#021231";
      document.body.style.color = "white";
      setText("Enable Light");
      showAlert("Dark mode Enabled", "success");
      document.title = "iNotebook - DarkMode";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      setText("Enable Dark");
      showAlert("Light mode Enabled", "success");
      document.title = "iNotebook - LightMode";
    }
  };
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const handleUserDetails = async () => {
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details. Status: ${response.status}`
      );
    }
    const json = await response.json();
    console.log(json.user);
    setUserDetails(json.user);
  };

  return (
    <NoteState>
      <Router>
        <div>
          <Navbar
            showAlert={showAlert}
            handleUserDetails={handleUserDetails}
            handleMode={handleMode}
            text={text}
          />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home showAlert={showAlert} />}
              ></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/logout"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/userdetails"
                element={
                  <UserDetails
                    showAlert={showAlert}
                    userDetails={userDetails}
                  />
                }
              ></Route>
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
