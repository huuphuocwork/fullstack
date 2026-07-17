import { useState } from "react";
import axios from "axios";
function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    pass: "",
    phone: "",
    address: "",
  });

  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState({});

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput((state) => ({ ...state, [nameInput]: value }));
  };

  function handleFile(e) {
    // console.log(e.target.file)
    const getFile = e.target.files;
    // 0:[
    //   nĂME...
    //   SIZE:..
    //   TYPE:...
    // ]
    // getFile["SIZE"];

    // gửi file sang api
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result); // cái này để gửi qua api
      setFile(getFile); // cái này để toàn bộ thông tin file upload vào file
    };
    reader.readAsDataURL(getFile[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (input.name == "") {
      errorSubmit.name = "Vui lòng nhập name";
      flag = false;
    }

    if (input.email == "") {
      errorSubmit.email = "Vui lòng nhập Email";
      flag = false;
    }

    if (input.pass == "") {
      errorSubmit.pass = "Vui lòng nhập Password";
      flag = false;
    }

    if (input.phone == "") {
      errorSubmit.phone = "Vui lòng nhập Phone";
      flag = false;
    }

    if (input.address == "") {
      errorSubmit.address = "Vui lòng nhập address";
      flag = false;
    }

    if (file == "") {
      errorSubmit.avatar = "Vui lòng upload hình ";
      flag = false;
    } else {
      let getFile = file[0];
      let fileName = getFile.name;

      let arr = fileName.split(".");
      // console.log(arr)

      let duoiFile = arr[arr.length - 1];

      let danhsach = ["png", "jpg", "jpeg", "PNG", "JPG"];

      if (!danhsach.includes(duoiFile)) {
        errorSubmit.getFile = "File không đúng định dạng";
        flag = false;
      }

      let getSize = getFile.size;
      console.log(getSize);
      if (getSize > 1024 * 1024) {
        errorSubmit.avatar = "File quá lớn";
        flag = false;
      }
    }

    if (!flag) {
      setError(errorSubmit);
    } else {
      const data = {
        name: input.name,
        email: input.email,
        password: input.pass,
        phone: input.phone,
        address: input.address,
        avatar: avatar,
        level: 0,
      };

      axios
        .post("http://localhost/laravel8/public/api/register", data)
        .then((res) => {
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            console.log(res);
            alert("Thành công");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function renderError() {
    if (Object.keys(error).length > 0) {
      return Object.keys(error).map((key, index) => {
        return <li key={index}>{error[key]}</li>;
      });
    }
  }

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        {/*sign up form*/}
        <h2>New User Signup!</h2>
        <ul>{renderError()}</ul>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInput}
          />
          {/* <p>{error.name}</p> */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleInput}
          />
          {/* <p>{error.email}</p> */}
          <input
            type="password"
            name="pass"
            placeholder="Password"
            onChange={handleInput}
          />
          {/* <p>{error.pass}</p> */}
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={handleInput}
          />
          {/* <p>{error.phone}</p> */}
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleInput}
          />
          {/* <p>{error.address}</p> */}
          <input type="file" name="avatar" onChange={handleFile} />
          {/* <p>{error.avatar}</p> */}
          <button type="submit" className="btn btn-default">
            Signup
          </button>
        </form>
      </div>
      {/*/sign up form*/}
    </div>
  );
}
export default Register;
