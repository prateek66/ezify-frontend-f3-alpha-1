import { withRouter } from "react-router-dom";

import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import ApiContext from "./services/api.service";

import "./App.scss";
import Routes from "./routes/routes";
import { useEffect, useState } from "react";

function App({ history }) {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const HEADER_TO_INCLUDE = ["/", "/services", "/profile", "/bookings"];
  const FOOTER_TO_INCLUDE = ["/", "/services"];

  const toggleHeaderFooter = (path) => {
    HEADER_TO_INCLUDE.includes(path) ? setShowHeader(true) : setShowHeader(false);
    FOOTER_TO_INCLUDE.includes(path) ? setShowFooter(true) : setShowFooter(false);
  };

  history.listen((location, action) => {
    const path = location.pathname;
    toggleHeaderFooter(path);
  });

  useEffect(() => {
    const path = window.location.pathname;
    toggleHeaderFooter(path);
  }, []);

  return (
    <ApiContext>
      {showHeader && <Header showVendorBtn={true} />}
      <Routes />
      {showFooter && <Footer />}
    </ApiContext>
  );
}

export default withRouter(App);
