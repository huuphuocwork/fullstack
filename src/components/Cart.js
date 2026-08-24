import axios from "axios";
import { useEffect, useState } from "react";

export default function Cart() {
  // Danh sách sản phẩm ĐẦY ĐỦ thông tin (name, price, image...) lấy về từ API
  const [cartData, setCartData] = useState([]);

  // Đọc giỏ hàng thô từ localStorage: dạng {id: qty, id: qty...}
  // Đây là dữ liệu sẽ GỬI LÊN API để đổi lấy thông tin đầy đủ từng sản phẩm
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Gọi API product/cart 1 lần khi trang vừa load, gửi "cart" lên, nhận về đủ thông tin sản phẩm
  useEffect(() => {
    axios
      .post("http://localhost/laravel8/public/api/product/cart", cart)
      .then((res) => {
        console.log(res.data);
        // setCartData: lưu data ĐẦY ĐỦ (tên, giá, ảnh) từ API vào state -> giao diện tự vẽ ra bảng
        setCartData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Tăng qty 1 sản phẩm. LƯU Ý: luôn sửa ở 2 nơi - state (để hiện ngay trên màn hình)
  // và localStorage (để F5 không bị mất) - thiếu 1 trong 2 sẽ bị lệch dữ liệu
  function tang(id) {
    const tangData = cartData.map((item) => {
      if (item.id === id) {
        item.qty = item.qty + 1;
        return item;
      } else {
        return item;
      }
    });
    // setCartData: cập nhật STATE -> giao diện đổi số ngay lập tức, không cần F5
    setCartData(tangData);
    // localStorage: đọc lại giỏ hàng thô hiện tại
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[id] = cart[id] + 1;
    // localStorage: ghi đè lại -> lưu lâu dài, F5 không bị mất (nếu thiếu bước này, F5 sẽ reset về số cũ)
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Giảm qty 1 sản phẩm, giống hàm tang() nhưng có chặn không cho xuống dưới 0
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
    // setCartData: cập nhật STATE, tương tự hàm tang()
    setCartData(giamData);
    // localStorage: đọc lại giỏ hàng thô hiện tại
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id] > 0) {
      cart[id] = cart[id] - 1;
    }
    // localStorage: ghi đè lại sau khi giảm
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Xoá hẳn 1 sản phẩm khỏi giỏ - dùng filter() (loại bỏ phần tử) thay vì map() (giữ nguyên số lượng phần tử)
  function xoa(id) {
    const xoaData = cartData.filter((item) => item.id !== id);
    // setCartData: cập nhật STATE -> dòng sản phẩm biến mất khỏi bảng ngay
    setCartData(xoaData);

    // localStorage: đọc lại giỏ hàng thô hiện tại
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    delete cart[id]; // xoá hẳn key, khác với gán = 0
    // localStorage: ghi đè lại sau khi xoá key
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Gom thành tiền (giá x qty) từng sản phẩm vào 1 mảng, rồi cộng dồn ra tổng tiền
  const listTotal = cartData.map((item) => {
    return item.price * item.qty;
  });

  let tongTien = 0;
  for (let i = 0; i < listTotal.length; i++) {
    tongTien = tongTien + listTotal[i];
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
            {/* Mỗi sản phẩm trong cartData -> 1 dòng <tr> */}
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
                    <p style={{ textAlign: "center" }}>Web ID:{item.web_id}</p>
                  </td>
                  <td className="cart_price">
                    <p>${item.price}</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      {/* Bấm "+" -> gọi tang() với id của đúng dòng này */}
                      <a
                        className="cart_quantity_up"
                        onClick={() => {
                          tang(item.id);
                        }}
                      >
                        +
                      </a>
                      {/* readOnly: chỉ đổi số qua nút +/-, không gõ tay được */}
                      <input
                        className="cart_quantity_input"
                        type="text"
                        name="quantity"
                        value={item.qty}
                        autoComplete="off"
                        size={2}
                        readOnly
                      />
                      {/* Bấm "-" -> gọi giam() */}
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
                    {/* Thành tiền của dòng = giá x qty, tự tính lại mỗi lần render */}
                    <p className="cart_total_price">{item.price * item.qty}</p>
                  </td>
                  <td className="cart_delete">
                    {/* Bấm X -> gọi xoa() */}
                    <a
                      className="cart_quantity_delete"
                      onClick={() => {
                        xoa(item.id);
                      }}
                    >
                      <i className="fa fa-times"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h2>Tổng: ${tongTien}</h2>
      </div>
    </div>
  );
}
