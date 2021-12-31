import "./App.scss";
import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import ApiContext from "./services/api.service";

function App() {
  return (
    <ApiContext>
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </ApiContext>
  );
}

export default App;
