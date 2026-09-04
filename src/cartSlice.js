import { createSlice } from "@reduxjs/toolkit";

// Hàm tính tổng qty từ local - giống hệt hàm tinhTongQty() đã viết ở App.js
function tinhTongQty() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let total = 0;
  for (let id in cart) {
    total = total + cart[id];
  }
  return total;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: { totalQty: tinhTongQty() }, // giá trị ban đầu = tổng qty đọc từ local
  reducers: {
    // Hàm để "làm mới" lại tổng qty trong store, gọi khi Cart/Home vừa đổi local
    capNhatTongQty(state) {
      state.totalQty = tinhTongQty();
    },
  },
});
// Khi dùng createSlice, Redux Toolkit tự tạo ra action creators
export const { capNhatTongQty } = cartSlice.actions;
export default cartSlice.reducer;
