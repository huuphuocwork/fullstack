import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Product() {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    let accessToken = localStorage.getItem("token");

    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get("http://localhost/laravel8/public/api/user/my-product", config)
      .then((res) => {
        // console.log(res.data);
        setProductData(Object.values(res.data.data));
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    console.log(id);

    let accessToken = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get(
        "http://localhost/laravel8/public/api/user/product/delete/" + id,
        config,
      )
      .then((res) => {
        console.log(res.data);
        setProductData(Object.values(res.data.data));
      })

      .catch((error) => {
        console.log(error);
      });
  }

  function renderProduct() {
    if (productData.length > 0) {
      return productData.map((item) => {
        // console.log(JSON.parse(item.image));
        return (
          <tr key={item.id}>
            <td className="cart_id">{item.id}</td>

            <td className="cart_description">
              <h4>
                <a href="#">{item.name}</a>
              </h4>
            </td>
            <td className="cart_product">
              <img
                src={
                  "http://localhost/laravel8/public/upload/product/" +
                  item.id_user +
                  "/" +
                  JSON.parse(item.image)[0]
                }
                alt=""
                width="70"
                height="70"
              />
            </td>

            <td className="cart_price">
              <p>${item.price}</p>
            </td>

            <td className="cart_total">
              <Link to={"/member/editproduct/" + item.id}>
                <i className="fa fa-pencil-square-o"></i>
              </Link>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(item.id);
                }}
                style={{ marginLeft: "20px" }}
              >
                <i className="fa fa-times"></i>
              </a>
            </td>
          </tr>
        );
      });
    }
  }
  return (
    <div className="col-sm-9">
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="id">Id</td>
              <td className="description">Name</td>
              <td className="image">Image</td>
              <td className="price">Price</td>
              <td className="total">Action</td>
            </tr>
          </thead>

          <tbody>{renderProduct()}</tbody>
        </table>
      </div>

      <Link to="/member/addproduct">
        <button className="btn btn-warning pull-right">Add New</button>
      </Link>
    </div>
  );
}
