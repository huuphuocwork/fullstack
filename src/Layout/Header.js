import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useSelector } from "react-redux";
function Header() {
  // Lấy cartCount từ Context -> không cần Cart.js truyền qua props (2 file này không phải cha-con)
  const { cartCount } = useContext(CartContext);
  // console.log(cartCount);
  // Đọc totalQty từ RTK store -> hiển thị lên link checkout
  const totalQty = useSelector((state) => state.cart.totalQty);
  const navigate = useNavigate();

  // Quyết định hiển thị nút Login hay Logout tuỳ đã đăng nhập hay chưa
  function renderLogin() {
    // Đọc trực tiếp localStorage (chưa dùng Context, vẫn giữ cách cũ)
    const localAuth = localStorage.getItem("auth");
    if (localAuth) {
      return (
        <li>
          <a onClick={handleLogout}>
            <i className="fa fa-lock"></i>Logout
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/member/login-register">
            <i className="fa fa-lock" /> Login
          </Link>
        </li>
      );
    }
  }

  function handleLogout() {
    localStorage.clear(); // xoá sạch localStorage (auth, cart...) khi đăng xuất
    navigate("/member/login-register");
  }
  return (
    <header id="header">
      {/*header*/}
      <div className="header_top">
        {/*header_top - thanh trên cùng: SĐT, email, mạng xã hội*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills">
                  <li>
                    <a href="#">
                      <i className="fa fa-phone" /> +2 95 01 88 821
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope" /> info@domain.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="social-icons pull-right">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header_top*/}
      <div className="header-middle">
        {/*header-middle - logo + dropdown USA/DOLLAR + menu Account/Wishlist/Cart/Login*/}
        <div className="container">
          <div className="row">
            <div className="col-md-4 clearfix">
              <div className="logo pull-left">
                <Link to={"/"}>
                  <img src="/images/home/logo.png" alt="" />
                </Link>
              </div>
              <div className="btn-group pull-right clearfix">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    USA
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Canada</a>
                    </li>
                    <li>
                      <a href="#">UK</a>
                    </li>
                  </ul>
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    DOLLAR
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#">Canadian Dollar</a>
                    </li>
                    <li>
                      <a href="#">Pound</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8 clearfix">
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/member/update">
                      <i className="fa fa-user"></i> Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist">
                      <i className="fa fa-user"></i> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkout">
                      <i className="fa fa-crosshairs" /> Checkout
                      <span> {totalQty}</span>
                    </Link>
                  </li>
                  <li>
                    <Link id="icon_cart" to="/cart">
                      <i className="fa fa-shopping-cart" />
                      Cart
                      {/* Lấy trực tiếp từ Context - không cần Cart.js truyền qua props */}
                      <span id="cart_count"> {cartCount}</span>
                    </Link>
                  </li>
                  {renderLogin()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header-middle*/}
      <div className="header-bottom">
        {/*header-bottom - menu chính: Home/Shop/Blog... + ô search*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
              <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li>
                    <a href="index.html" className="active">
                      Home
                    </a>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      Shop
                      <i className="fa fa-angle-down" />
                    </a>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <a href="shop.html">Products</a>
                      </li>
                      <li>
                        <a href="product-details.html">Product Details</a>
                      </li>
                      <li>
                        <a href="checkout.html">Checkout</a>
                      </li>
                      <li>
                        <a href="cart.html">Cart</a>
                      </li>
                      <li>
                        <a href="login.html">Login</a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      Blog
                      <i className="fa fa-angle-down" />
                    </a>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <Link to="/blog">Blog List</Link>
                      </li>
                      <li>
                        <Link to="/blogdetail">Blog Single</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="404.html">404</a>
                  </li>
                  <li>
                    <a href="contact-us.html">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="search_box pull-right">
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header-bottom*/}
    </header>
  );
}

export default Header;
