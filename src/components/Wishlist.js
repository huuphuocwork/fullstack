import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { capnhatWishlist } from "../wishlistSlice";

export default function Wishlist() {
  // Đọc mảng id yêu thích từ RTK store
  const ids = useSelector((state) => state.wishlist.ids);
  const dispatch = useDispatch();

  //   Lưu toàn bộ sản phẩm lấy về từ API (chưa lọc)
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/laravel8/public/api/product/wishlist")
      .then((res) => {
        // Lưu ds sản phẩm vào state

        setProductData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // Lọc từ productData ra ĐÚNG những sản phẩm có id nằm trong "ids" (mảng yêu thích)
  // -> lọc ở client, không gọi API riêng cho từng id
  const wishlistData = productData.filter((item) => ids.includes(item.id));

  // Vẽ ra danh sách sản phẩm yêu thích - cấu trúc giống hệt renderProduct() ở Home.js
  function renderWishlist() {
    return wishlistData.map((item) => {
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
              </div>
              <div className="product-overlay">
                <div className="overlay-content">
                  <h2>${item.price}</h2>
                  <p>{item.name}</p>
                </div>
              </div>
            </div>

            <div className="choose">
              <ul className="nav nav-pills nav-justified">
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault(); // Chặn hành vi mặc định của <a href="#"> (nhảy lên đầu trang)
                      RemoveWishlist(item.id);
                    }}
                    href="#"
                  >
                    <i className="fa fa-trash-o"></i>Remove Wishlist
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
  // Bỏ 1 sản phẩm khỏi wishlist - cùng cấu trúc với AddToWishlist(), chỉ đổi bước lọc bỏ id thay vì thêm id
  function RemoveWishlist(id) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const newWishlist = wishlist.filter((item) => item !== id); // giữ lại mọi id KHÁC id cần xoá
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    // Báo RTK đọc lại localStorage -> ids trong store cập nhật -> wishlistData tự lọc lại
    // -> sản phẩm vừa xoá biến mất khỏi màn hình ngay, không cần F5
    dispatch(capnhatWishlist());
  }
  return (
    <div className="features_items">
      <h2 className="title text-center">Wishlist</h2>
      {renderWishlist()}
    </div>
  );
}
