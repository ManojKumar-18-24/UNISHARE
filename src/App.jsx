import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from './components/index'
import Footer from './components/index'
import { Outlet } from "react-router-dom";


function App() {
  return ( 
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
}

export default App;
