import "./App.scss";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import ApiContext from "./services/api.service";

function App() {
  return (
    <ApiContext>
      <Header></Header>
      <Home></Home>
    </ApiContext>
  );
}

export default App;
