import { useState, useEffect } from "react";
import axios from "axios";
export default function Update() {
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    pass: "",
  });

  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem("auth"));
    // console.log(auth);

    if (auth) {
      setUser({
        username: auth.name,
        email: auth.email,
        address: auth.address,
        phone: auth.phone,
        pass: "",
      });
    }
  }, []);

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
    setUser((state) => ({ ...state, [nameInput]: value }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (user.username === "") {
      errorSubmit.username = "Vui lòng nhập user name";
      flag = false;
    }

    if (user.address === "") {
      errorSubmit.address = "Vui lòng nhập address";
      flag = false;
    }
    if (user.phone === "") {
      errorSubmit.phone = "Vui lòng nhập phone";
      flag = false;
    }

    if (!flag) {
      setError(errorSubmit);
    } else {
      setError({});
      const data = {
        name: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
        password: user.pass,
      };
      let auth = JSON.parse(localStorage.getItem("auth"));
      // console.log(auth);
      let accessToken = localStorage.getItem("token");
      // console.log(accessToken);
      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };

      axios
        .post(
          "http://localhost/laravel8/public/api/user/update/" + auth.id,
          data,
          config,
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            const updateData = res.data;
            localStorage.setItem("token", updateData.token);
            localStorage.setItem("auth", JSON.stringify(updateData.Auth));
            alert("Cập nhật thành công");
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
    <div className="col-sm-9">
      <div class="blog-post-area">
        <h2 class="title text-center">Update user</h2>
        <div className="signup-form">
          <h2>New User Signup!</h2>
          <ul>{renderError()}</ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={user.username}
              placeholder="User Name"
              onChange={handleInput}
            />
            <input
              type="text"
              name="email"
              value={user.email}
              placeholder="Email"
              readOnly
            />
            <input
              type="text"
              name="address"
              value={user.address}
              placeholder="Address"
              onChange={handleInput}
            />
            <input
              type="text"
              name="phone"
              value={user.phone}
              placeholder="Phone"
              onChange={handleInput}
            />
            <input
              type="password"
              name="pass"
              value={user.pass}
              placeholder="Password"
              onChange={handleInput}
            />

            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
