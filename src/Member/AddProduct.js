import { useEffect, useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "1",
    sale: "0",
    company: "",
    detail: "",
  });

  const [avatar, setAvatar] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [error, setError] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost/laravel8/public/api/category-brand")
      .then((res) => {
        console.log(res.data);
        setCategoryData(res.data.category);
        setBrandData(res.data.brand);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setProduct((state) => ({ ...state, [nameInput]: value }));
  };

  function handleFile(e) {
    const getFile = e.target.files;
    console.log("Danh sách file", getFile.length);
    setAvatar((oldFiles) => [...oldFiles, ...getFile]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (product.name == "") {
      errorSubmit.name = "Vui lòng nhập tên";
      flag = false;
    }

    if (product.price == "") {
      errorSubmit.price = "Vui lòng nhập giá";
      flag = false;
    }

    if (product.category == "") {
      errorSubmit.category = "Vui lòng chọn category";
      flag = false;
    }

    if (product.brand == "") {
      errorSubmit.brand = "Vui lòng chọn brand";
      flag = false;
    }

    if (product.status == 0) {
      if (product.sale == "") {
        errorSubmit.sale = "Vui lòng nhập phần trăm giảm giá";
        flag = false;
      }
    }

    if (product.company == "") {
      errorSubmit.company = "Vui lòng nhập company";
      flag = false;
    }

    if (product.detail == "") {
      errorSubmit.detail = "Vui lòng nhập detail";
      flag = false;
    }

    if (avatar.length == 0) {
      errorSubmit.avatar = "Vui lòng chọn hình";
      flag = false;
    } else if (avatar.length > 3) {
      errorSubmit.avatar = "Chỉ được upload tối đa 3 hình";
      flag = false;
    } else {
      Object.keys(avatar).map((item, i) => {
        let getFile = avatar[item];
        let fileName = getFile.name;

        let arr = fileName.split(".");
        let duoiFile = arr[arr.length - 1];

        let danhsach = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];

        if (!danhsach.includes(duoiFile)) {
          errorSubmit.avatar = "File không đúng định dạng";
          flag = false;
        }

        let getSize = getFile.size;

        if (getSize > 1024 * 1024) {
          errorSubmit.avatar = "File quá lớn";
          flag = false;
        }
      });
    }

    if (!flag) {
      setError(errorSubmit);
      return;
    }

    let token = localStorage.getItem("token");
    let auth = localStorage.getItem("auth");

    const userData = JSON.parse(localStorage.getItem("auth"));
    // console.log(JSON.parse(localStorage.getItem("auth")));
    let accessToken = localStorage.getItem("token");

    // config để gửi token qua API
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    };

    if (!token || !auth) {
      setError({
        login: "Vui lòng đăng nhập",
      });
      return;
    }

    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("status", product.status);
    formData.append("sale", product.sale);
    formData.append("company", product.company);
    formData.append("detail", product.detail);

    Object.keys(avatar).map((item, i) => {
      formData.append("file[]", avatar[item]);
    });

    axios
      .post(
        "http://localhost/laravel8/public/api/user/product/add",
        formData,
        config,
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.errors) {
          setError(res.data.errors);
        } else {
          alert("Thêm sản phẩm thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function renderError() {
    if (Object.keys(error).length > 0) {
      return Object.keys(error).map((key, index) => {
        return <li key={index}>{error[key]}</li>;
      });
    }
  }
  function renderPreview() {
    if (avatar.length > 0) {
      return Object.keys(avatar).map((item, index) => {
        let file = avatar[item];
        let url = URL.createObjectURL(file);
        return (
          <img
            key={index}
            src={url}
            alt=""
            width="70"
            height="70"
            style={{ marginRight: "10px" }}
          />
        );
      });
    }
  }
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Create Product</h2>
        <ul>{renderError()}</ul>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={product.name}
              onChange={handleInput}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleInput}
            />

            <select
              name="category"
              value={product.category}
              onChange={handleInput}
            >
              <option>Please choose category</option>
              {categoryData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.category}
                </option>
              ))}
            </select>
            <select name="brand" value={product.brand} onChange={handleInput}>
              <option>Please choose brand</option>
              {brandData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.brand}
                </option>
              ))}
            </select>
            <select name="status" value={product.status} onChange={handleInput}>
              <option value={1}>New</option>
              <option value={0}>Sale</option>
            </select>

            {product.status == 0 && (
              <input
                type="number"
                name="sale"
                value={product.sale}
                onChange={handleInput}
                placeholder="nhap gia sale"
              />
            )}

            <input
              type="text"
              name="company"
              placeholder="Company profile"
              value={product.company}
              onChange={handleInput}
            />
            <input type="file" name="file" multiple onChange={handleFile} />
            <div>{renderPreview()}</div>
            <textarea
              name="detail"
              placeholder="Detail"
              value={product.detail}
              onChange={handleInput}
            ></textarea>
            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
