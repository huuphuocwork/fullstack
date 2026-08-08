import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function EditProduct() {
  // Lấy id sản phẩm trên URL
  let params = useParams();

  // Lưu toàn bộ dữ liệu đang hiển thị trên form
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
  // Lưu danh sách file ảnh mới người dùng vừa chọn từ input file
  const [avatar, setAvatar] = useState([]);
  // Lưu danh sách category để render ra thẻ option
  const [categoryData, setCategoryData] = useState([]);
  // Lưu danh sách brand để render ra thẻ option
  const [brandData, setBrandData] = useState([]);
  // Lưu các lỗi validate để hiện ra ngoài giao diện
  const [error, setError] = useState({});
  // Lưu danh sách ảnh cũ của sản phẩm đang sửa
  const [imageData, setImageData] = useState([]);
  // Lưu id user để ghép đúng đường dẫn ảnh cũ
  const [idUser, setIdUser] = useState("");
  // Lưu tên các ảnh cũ mà người dùng tick chọn để xóa
  const [avatarCheckBox, setAvatarCheckBox] = useState([]);

  useEffect(() => {
    let accessToken = localStorage.getItem("token");

    // Gắn token vào header để API biết người đang sửa sản phẩm là ai
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };

    // Lấy chi tiết sản phẩm cũ để đổ dữ liệu lên form edit
    axios
      .get(
        "http://localhost/laravel8/public/api/user/product/" + params.id,
        config,
      )
      .then((res) => {
        console.log(res.data.data);
        let item = res.data.data;
        setProduct({
          name: item.name,
          price: item.price,
          category: item.id_category,
          brand: item.id_brand,
          status: item.status,
          sale: item.sale,
          company: item.company_profile,
          detail: item.detail,
        });
        setImageData(item.image);
        setIdUser(item.id_user);
      })
      .catch((error) => {
        console.log(error);
      });

    // Lấy category và brand để hiển thị vào 2 ô select
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

  //   Khi nhập dữ liệu vào input
  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    // Update state product
    setProduct((state) => ({ ...state, [nameInput]: value }));
  };

  //   Khi chọn file
  function handleFile(e) {
    // Lấy ds file
    const getFile = e.target.files;
    // Lưu vào state
    setAvatar(getFile);
  }

  function handleCheckbox(e) {
    const target = e.target;
    // Lấy tên hình
    const imageName = target.name;
    // Ktr hình tick hay bỏ tick
    const checked = target.checked;

    if (checked) {
      // Nếu tick vào checkbox thì thêm tên ảnh vào mảng chờ xóa
      setAvatarCheckBox((oldArray) => [...oldArray, imageName]);
    } else {
      // Nếu bỏ tick thì loại tên ảnh đó ra khỏi mảng chờ xóa
      setAvatarCheckBox((oldArray) => {
        return oldArray.filter((item) => {
          return item != imageName;
        });
      });
    }
  }

  // Khi nhấn update
  function handleSubmit(e) {
    // Kh reload trang
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    // Ktr dữ liệu
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

    // Nếu là sale thì bắt buộc nhập % giảm giá
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

    // Kiểm tra phần ảnh:

    // API yêu cầu upload ảnh
    if (avatar.length == 0) {
      errorSubmit.avatar = "Vui lòng chọn hình";
      flag = false;
    } else {
      // Số hình còn lại sau khi xóa
      let oldImage = imageData.length - avatarCheckBox.length;
      // Tổng ảnh cuối cùng sau khi update
      let totalImage = oldImage + avatar.length;

      if (totalImage > 3) {
        errorSubmit.avatar = "Chỉ được upload tối đa 3 hình";
        flag = false;
      } else {
        Object.keys(avatar).map((item, i) => {
          // Lấy từng file ra để kiểm tra đuôi file và dung lượng
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
    }

    // Nếu có lỗi thì dừng lại, không gọi API
    if (!flag) {
      setError(errorSubmit);
      return;
    }

    // Ktr login
    let token = localStorage.getItem("token");
    let auth = localStorage.getItem("auth");

    let accessToken = localStorage.getItem("token");

    // Dùng multipart/form-data vì form này có upload file ảnh
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

    // FormData giúp gửi cùng lúc text + file lên API
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("status", product.status);
    formData.append("sale", product.sale);
    formData.append("company", product.company);
    formData.append("detail", product.detail);

    // Gửi các hình mới
    Object.keys(avatar).map((item, i) => {
      formData.append("file[]", avatar[item]);
    });

    // Gửi danh sách tên ảnh cũ cần xóa
    Object.keys(avatarCheckBox).map((item, i) => {
      formData.append("avatarCheckBox[]", avatarCheckBox[item]);
    });

    // Gọi API update
    axios
      .post(
        "http://localhost/laravel8/public/api/user/product/update/" + params.id,
        formData,
        config,
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.errors) {
          setError(res.data.errors);
        } else {
          alert("Chỉnh sửa thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //   Hiển thị lỗi
  function renderError() {
    // Chuyển object error thành nhiều thẻ li để người dùng dễ đọc lỗi
    if (Object.keys(error).length > 0) {
      return Object.keys(error).map((key, index) => {
        return <li key={index}>{error[key]}</li>;
      });
    }
  }
  //   Hiển thị các ảnh cũ
  function renderImage() {
    if (imageData.length > 0) {
      return imageData.map((item, index) => {
        return (
          <li
            key={index}
            style={{
              display: "inline-block",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            <img
              src={
                "http://localhost/laravel8/public/upload/product/" +
                idUser +
                "/" +
                item
              }
              alt=""
              width="70"
              height="70"
            />
            <br />
            {/* Tick vào ảnh nào thì ảnh đó sẽ được đưa vào mảng chờ xóa */}
            <input
              type="checkbox"
              name={item}
              checked={avatarCheckBox.includes(item)}
              onChange={handleCheckbox}
            />
          </li>
        );
      });
    }
  }
  //   Hiển thị review các ảnh mới chọn
  function renderPreview() {
    if (avatar.length > 0) {
      return Object.keys(avatar).map((item, index) => {
        let file = avatar[item];
        // Tạo link tạm ở trình duyệt để xem trước ảnh mới vừa chọn
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
  // Giao diện
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Edit Product</h2>
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
            <ul>{renderImage()}</ul>
            <textarea
              name="detail"
              placeholder="Detail"
              value={product.detail}
              onChange={handleInput}
            ></textarea>
            <button type="submit" className="btn btn-default">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
