import './App.css';
import NavBar from './Component/NavBar/NarBar';
import Layout from './Component/MainPage/Layout';
import LoginPage from './Component/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      {
        localStorage.getItem("token")==undefined ? <LoginPage /> : <span> <NavBar /> <Layout />  </span>
      }
    </div>
  );
}

export default App;
