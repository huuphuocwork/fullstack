import { Link } from "react-router-dom";
export default function Product() {
  return (
    <div className="col-sm-9">
      <h2>Đây là trang Product</h2>
      <Link to="/member/addproduct">
        <button className="btn btn-warning pull-right">Add New</button>
      </Link>
    </div>
  );
}
