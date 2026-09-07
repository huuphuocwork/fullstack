import { createSlice } from "@reduxjs/toolkit";
// Đọc danh sách id sản phẩm yêu thích từ localStorage (key "wishlist"), dạng mảng [id, id...]
// Nếu chưa có gì trong localStorage -> trả về mảng rỗng, tránh lỗi
function docWishList() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

const wishlistSlice = createSlice({
  name: "wishlist",
  // Dữ liệu ban đầu của ngăn kéo: gọi docWishList() ngay lúc khởi tạo,
  // để state.ids có sẵn đúng dữ liệu đã lưu trong localStorage từ trước (không bị rỗng khi F5 lại trang)
  initialState: { ids: docWishList() },
  reducers: {
    // Nội quy: ĐỌC LẠI localStorage rồi gán vào state.ids
    // Dùng khi có nơi khác (ngoài Redux) vừa ghi thêm/xoá vào localStorage "wishlist"
    // (VD: bấm nút "Add to wishlist" ở Home.js) -> gọi capnhatWishlist() để đồng bộ lại RTK,
    // giúp mọi component đang useSelector(wishlist) tự cập nhật theo, không cần F5
    capnhatWishlist(state) {
      state.ids = docWishList();
    },
  },
});
// RTK tự sinh "phiếu yêu cầu" capnhatWishlist, export ra để component gọi được
export const { capnhatWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; // Xuất "bộ xử lý" để ráp vào store.js
