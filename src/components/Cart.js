import axios from "axios";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  useEffect(() => {
    axios
      .post("http://localhost/laravel8/public/api/product/cart", cart)
      .then((res) => {
        console.log(res.data);
        setCartData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function tang(id) {
    const tangData = cartData.map((item) => {
      if (item.id === id) {
        item.qty = item.qty + 1;
        return item;
      } else {
        return item;
      }
    });
    setCartData(tangData);
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[id] = cart[id] + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function giam(id) {
    const giamData = cartData.map((item) => {
      if (item.id === id) {
        if (item.qty > 0) {
          item.qty = item.qty - 1;
        }
        return item;
      } else {
        return item;
      }
    });
    setCartData(giamData);
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id] > 0) {
      cart[id] = cart[id] - 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return (
    <div id="cart_items" className="col-sm-9 padding-right">
      <div className="breadcrumbs">
        <ol className="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li className="active">Shopping Cart</li>
        </ol>
      </div>
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="image">Item</td>
              <td className="description" />
              <td className="price">Price</td>
              <td className="quantity">Quantity</td>
              <td className="total">Total</td>
              <td />
            </tr>
          </thead>
          <tbody>
            {cartData.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="cart_product">
                    <a href="#">
                      <img
                        width="80px"
                        src={
                          // Đường dẫn ảnh sản phẩm được ghép từ 3 phần:
                          // 1. Link gốc tới thư mục upload
                          // 2. id_user -> vì ảnh được lưu theo từng thư mục con là id của user đã đăng kí
                          "http://localhost/laravel8/public/upload/product/" +
                          item.id_user +
                          "/" +
                          JSON.parse(item.image)[0]
                          // 3. item.image là chuỗi JSON dạng '["a.jpg","b.jpg"]'
                          // -> JSON.parse() để biến chuỗi đó thành mảng thật
                          // -> [0] lấy ra ảnh ĐẦU TIÊN trong mảng để hiển thị làm ảnh đại diện
                        }
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href="#">{item.name}</a>
                    </h4>
                    <p>Web ID:{item.web_id}</p>
                  </td>
                  <td className="cart_price">
                    <p>${item.price}</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a
                        className="cart_quantity_up"
                        onClick={() => {
                          tang(item.id);
                        }}
                      >
                        +
                      </a>
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        value={item.qty}
                        autoComplete="off"
                        size={2}
                        readOnly
                      />
                      <a
                        className="cart_quantity_down"
                        onClick={() => {
                          giam(item.id);
                        }}
                      >
                        -
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">{item.price * item.qty}</p>
                  </td>
                  <td className="cart_delete">
                    <a className="cart_quantity_delete">
                      <i className="fa fa-times"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
