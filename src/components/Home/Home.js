import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import { useDispatch } from "react-redux";
import { capNhatTongQty } from "../../cartSlice";
import { capnhatWishlist } from "../../wishlistSlice";

export default function Home() {
  // Lưu danh sách all sản phẩm
  const [productData, setProductData] = useState([]);
  const { setCartCount } = useContext(CartContext);
  const dispatch = useDispatch();
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
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        AddToWishlist(item.id);
                      }}
                      href="#"
                    >
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

    // / Đếm TỔNG số lượng tất cả sản phẩm trong giỏ (cộng dồn cart[id], không phải đếm số loại sản phẩm)
    let total = 0;
    // for...in: duyệt qua từng KEY (id) của object "cart" - khác với vòng for thường (duyệt theo index của mảng)
    // vì "cart" là OBJECT dạng {id: qty}, không phải mảng, nên không dùng .map()/for(i=0...) được
    for (let id in cart) {
      total = total + cart[id]; // cart[id] chính là qty của sản phẩm -> cộng dồn vào total
    }
    // Cập nhật vào Context -> component nào đang useContext(CartContext)
    setCartCount(total);
    // Cập nhật vào RTK store -> component nào đang useSelector(state => state.cart.totalQty)
    dispatch(capNhatTongQty());
  }

  // Hàm xử lý khi bấm nút "Add to wishlist" trên 1 sản phẩm, nhận vào id của sản phẩm đó
  function AddToWishlist(id) {
    // Đọc danh sách wishlist hiện tại từ localStorage (mảng các id), nếu chưa có thì để mảng rỗng
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Chỉ thêm khi id NÀY CHƯA CÓ trong danh sách - tránh bấm nhiều lần bị trùng lặp id
    if (!wishlist.includes(id)) {
      wishlist.push(id); // Thêm id mới vào cuối mảng

      // Ghi lại vào localStorage - phải JSON.stringify() vì localStorage chỉ lưu được chuỗi
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // Báo cho RTK biết localStorage vừa đổi -> wishlistSlice đọc lại và cập nhật state.ids
      // -> mọi component đang useSelector(state => state.wishlist.ids) tự vẽ lại theo dữ liệu mới,
      // không cần F5 (giống cách Header tự cập nhật cartCount trước đây)
      dispatch(capnhatWishlist());
    }
  }

  return (
    <div className="features_items">
      <h2 className="title text-center">Features Items</h2>
      {renderProduct()} {/* Gọi hàm render danh sách sản phẩm ra màn hình */}
    </div>
  );
}
