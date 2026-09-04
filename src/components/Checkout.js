import { useSelector } from "react-redux";

export default function Checkout() {
  // Đọc tổng qty từ RTK store - thay cho useContext(CartContext)
  const totalQty = useSelector((state) => state.cart.totalQty);

  return (
    <div id="checkout" className="col-sm-9 padding-right">
      <h2>Checkout</h2>
      <p>Tổng số lượng sản phẩm: {totalQty}</p>
    </div>
  );
}
