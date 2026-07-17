import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleInput = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInput((state) => ({ ...state, [nameInput]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    let errorSubmit = {};
    let flag = true;

    if (input.email == "") {
      errorSubmit.email = "Vui lòng nhập email";
      flag = false;
    }
    if (input.password == "") {
      errorSubmit.password = "Vui lòng nhập password";
      flag = false;
    }

    if (!flag) {
      setError(errorSubmit);
    } else {
      const data = {
        email: input.email,
        password: input.password,
        level: 0,
      };

      axios
        .post("http://localhost/laravel8/public/api/login", data)
        .then((res) => {
          console.log(res.data);
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            const loginData = res.data;
            localStorage.setItem("token", loginData.token);
            localStorage.setItem("auth", JSON.stringify(loginData.Auth));

            navigate("/");
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
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        {/*login form*/}
        <h2>Login to your account</h2>
        <ul>{renderError()}</ul>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <span>
            <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
      {/*/login form*/}
    </div>
  );
}

export default Login;
