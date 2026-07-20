import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Menuleft from "./Layout/Menuleft";
import MenuAccount from "./Layout/MenuAccount";
import { useLocation } from "react-router-dom";
function App(props) {
  let location = useLocation();
  // console.log(location);
  return (
    <>
      <Header />

      <section>
        <div className="container">
          <div className="row">
            {location["pathname"].includes("member") ? (
              <MenuAccount />
            ) : (
              <Menuleft />
            )}{" "}
            {props.children}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
