import "./App.scss";
import Header from "./components/header/Header";
import ApiContext from "./services/api.service";

function App() {
  return (
    <ApiContext>
      <Header></Header>
    </ApiContext>
  );
}

export default App;
