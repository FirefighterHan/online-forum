import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages & components
import Home from './pages/home'
import Navbar from './components/navbar'
import Login from './pages/login'
import Signup from './pages/signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
