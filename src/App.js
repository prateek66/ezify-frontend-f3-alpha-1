import { withRouter } from "react-router-dom";

import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import ApiContext from "./services/api.service";

import "./App.scss";
import Routes from "./routes/routes";
import { useEffect, useState } from "react";
import Toaster from "./components/atmoic/toaster";
import CustomSpinner from "./components/atmoic/spinner";
import NotificationContext from "./services/notification.service";

function App({ history }) {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const HEADER_TO_INCLUDE = ["/", "/services", "/profile", "/bookings", "/vendorhome", "/bookings", "/payment", "/orders", "/notAuthPage"];
  const FOOTER_TO_INCLUDE = ["/", "/services", "/vendorhome", "/notAuthPage"];

  const toggleHeaderFooter = (path) => {
    HEADER_TO_INCLUDE.includes(path) ? setShowHeader(true) : setShowHeader(false);
    FOOTER_TO_INCLUDE.includes(path) ? setShowFooter(true) : setShowFooter(false);
  };

  history.listen((location, action) => {
    const path = location.pathname;

    if (path.includes("/services/") && path.length > 32) {
      setShowHeader(true);
      setShowFooter(true);
      return;
    }

    toggleHeaderFooter(path);
  });

  useEffect(() => {
    const path = window.location.pathname;

    if (path.includes("/services/") && path.length > 32) {
      setShowHeader(true);
      setShowFooter(true);
      return;
    }

    toggleHeaderFooter(path);
  }, []);

  return (
    <ApiContext>
      <NotificationContext>
        {showHeader && <Header showVendorBtn={true} />}
        <Routes />
        {showFooter && <Footer />}

        <Toaster />
        <CustomSpinner />
      </NotificationContext>
    </ApiContext>
  );
}

export default withRouter(App);
