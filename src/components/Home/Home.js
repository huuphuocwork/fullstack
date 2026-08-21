import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Lưu danh sách all sản phẩm
  const [productData, setProductData] = useState([]);
  // Chạy khi mở trang Home
  useEffect(() => {
    axios
      .get("http://localhost/laravel8/public/api/product")
      .then((res) => {
        console.log(res.data);
        // Lưu danh sách sp vào state
        // res.data.data -> vì Laravel thường trả JSON dạng { data: [...] }, nên phải lấy đúng res.data.data
        setProductData(res.data.data);
      })
      .catch((error) => {
        // Nếu gọi API lỗi (sai URL, server tắt...) thì in lỗi ra console
        console.log(error);
      });
  }, []);

  // Render danh sách sp lấy từ API
  function renderProduct() {
    if (productData.length > 0) {
      return productData.map((item) => {
        return (
          <div className="col-sm-4" key={item.id}>
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
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
                  <h2>${item.price}</h2>
                  <p>{item.name}</p>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      AddToCart(item.id);
                    }}
                    href="#"
                    id={"product" + item.id} // Tạo id riêng cho từng nút, để sau này có thể bắt sự kiện theo đúng sản phẩm
                    className="btn btn-default add-to-cart"
                  >
                    <i className="fa fa-shopping-cart"></i>Add to cart
                  </a>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                    <h2>${item.price}</h2>
                    <p>{item.name}</p>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        AddToCart(item.id);
                      }}
                      href="#"
                      className="btn btn-default add-to-cart"
                    >
                      <i className="fa fa-shopping-cart"></i>Add to cart
                    </a>
                  </div>
                </div>
              </div>

              <div className="choose">
                <ul className="nav nav-pills nav-justified">
                  <li>
                    <a href="#">
                      <i className="fa fa-plus-square"></i>Add to wishlist
                    </a>
                  </li>
                  <li>
                    {/* Đổi add to compare thành MORE để dẫn tới trang ProductDetail */}
                    <Link to={"/productdetail/" + item.id}>
                      <i className="fa fa-plus-square"></i>More
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  // Hàm xử lý khi bấm nút "Add to cart" trên 1 sản phẩm, nhận vào id của sản phẩm đó
  function AddToCart(id) {
    // Đọc giỏ hàng hiện tại từ localStorage (dữ liệu lưu ở đây chỉ tồn tại dạng CHUỖI,
    // nên phải JSON.parse() để biến lại thành object thật)
    // Nếu localStorage chưa có key "cart" (VD: khách vào lần đầu) -> getItem trả về null
    // -> JSON.parse(null) = null -> dùng "|| {}" để thay bằng object rỗng, tránh lỗi
    const cart = JSON.parse(localStorage.getItem("cart")) || {};

    console.log(localStorage.getItem("cart")); // log giỏ hàng TRƯỚC khi cập nhật, để kiểm tra

    // Kiểm tra sản phẩm này đã có trong giỏ chưa
    if (cart[id]) {
      // Nếu đã có -> tăng số lượng (qty) lên 1
      cart[id] = cart[id] + 1;
    } else {
      // Nếu chưa có -> thêm mới vào giỏ với số lượng là 1
      cart[id] = 1;
    }

    // Ghi lại giỏ hàng vào localStorage
    // Bắt buộc phải JSON.stringify() vì localStorage CHỈ lưu được chuỗi (string),
    // không lưu trực tiếp được object như cart
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(cart); // log giỏ hàng SAU khi cập nhật, để kiểm tra đã tăng đúng chưa
  }

  return (
    <div className="features_items">
      <h2 className="title text-center">Features Items</h2>
      {renderProduct()} {/* Gọi hàm render danh sách sản phẩm ra màn hình */}
    </div>
  );
}
