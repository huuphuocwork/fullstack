import axios from "axios";
import { useState } from "react";

function Cmt(props) {
  // console.log(props);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  function handleComment(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");
    let auth = localStorage.getItem("auth");

    const userData = JSON.parse(localStorage.getItem("auth"));
    // console.log(JSON.parse(localStorage.getItem("auth")));
    let accessToken = localStorage.getItem("token");

    // config để gửi token qua API
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };

    if (!token || !auth) {
      setError("Vui lòng đăng nhập");
      return;
    }
    if (comment == "") {
      setError("Vui lòng nhập cmt");
      return;
    }

    if (comment) {
      const formData = new FormData();
      formData.append("id_blog", props.idBlog);
      formData.append("id_user", userData.id);
      formData.append("id_comment", 0);
      formData.append("comment", comment);
      formData.append("image_user", userData.avatar);
      formData.append("name_user", userData.name);

      axios
        .post(
          "http://localhost/laravel8/public/api/blog/comment/" + props.idBlog,
          formData,
          config,
        )
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            setError(res.data.errors);
          } else {
            alert("Thành công");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>
          <div className="text-area">
            <div className="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <p>{error}</p>
            <textarea
              name="message"
              rows={11}
              defaultValue={""}
              onChange={handleInput}
            />
            <a className="btn btn-primary" href="#" onClick={handleComment}>
              post comment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cmt;
