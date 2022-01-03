import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import ApiContext from "./services/api.service";

import "./App.scss";
import Routes from "./routes/routes";

function App() {
  return (
    <ApiContext>
      <Header></Header>
      <Routes />
      <Footer></Footer>
    </ApiContext>
  );
}

export default App;
