import { Login } from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          { }
          <Route
            exact path="/Login"
            element={<Login />}
          />
          { }
          <Route
            path="/Register" element={<Register />}
          />
          { }
          <Route
            path="/home" element={<Home />}
          />
        </Routes>
      </Router>
    </>
    // <div>
    //   <Login/>
    // </div>
  );
}

export default App;
