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

      {/* Hiển thị slider  */}
      {location["pathname"] === "/" && (
        <section id="slider">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div
                  id="slider-carousel"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#slider-carousel"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                  </ol>

                  <div className="carousel-inner">
                    <div className="item active">
                      <div className="col-sm-6">
                        <h1>
                          <span>E</span>-SHOPPER
                        </h1>
                        <h2>Free E-Commerce Template</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <button type="button" className="btn btn-default get">
                          Get it now
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <img
                          src="/images/home/girl1.jpg"
                          className="girl img-responsive"
                          alt=""
                        />
                        <img
                          src="/images/home/pricing.png"
                          className="pricing"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="item">
                      <div className="col-sm-6">
                        <h1>
                          <span>E</span>-SHOPPER
                        </h1>
                        <h2>100% Responsive Design</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <button type="button" className="btn btn-default get">
                          Get it now
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <img
                          src="/images/home/girl2.jpg"
                          className="girl img-responsive"
                          alt=""
                        />
                        <img
                          src="/images/home/pricing.png"
                          className="pricing"
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="item">
                      <div className="col-sm-6">
                        <h1>
                          <span>E</span>-SHOPPER
                        </h1>
                        <h2>Free Ecommerce Template</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <button type="button" className="btn btn-default get">
                          Get it now
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <img
                          src="/images/home/girl3.jpg"
                          className="girl img-responsive"
                          alt=""
                        />
                        <img
                          src="/images/home/pricing.png"
                          className="pricing"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>

                  <a
                    href="#slider-carousel"
                    className="left control-carousel hidden-xs"
                    data-slide="prev"
                  >
                    <i className="fa fa-angle-left"></i>
                  </a>

                  <a
                    href="#slider-carousel"
                    className="right control-carousel hidden-xs"
                    data-slide="next"
                  >
                    <i className="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
