import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Menuleft from "./Layout/Menuleft";
function App(props) {
  return (
    <>
      <Header />

      <section>
        <div className="container">
          <div className="row">
            <Menuleft />
            {props.children}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
