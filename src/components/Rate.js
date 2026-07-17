import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

export default function Rate(props) {
  // console.log(props);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/laravel8/public/api/blog/rate/" + props.idBlog)
      .then((res) => {
        // console.log(res.data.data);
        if (Object.values(res.data.data).length > 0) {
          let tongDiem = 0;
          Object.values(res.data.data).forEach((item) => {
            tongDiem = tongDiem + item.rate;
          });
          // console.log(tongDiem);

          let trungBinh = tongDiem / Object.values(res.data.data).length;
          setRating(trungBinh);
          console.log(trungBinh);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRating = (rate) => {
    // console.log(rate);
    let token = localStorage.getItem("token");
    // console.log(token);

    if (!token) {
      setError("Vui lòng đăng nhập");
      return;
    }
    let auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth);

    let accessToken = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };

    const data = {
      user_id: auth.id,
      blog_id: props.idBlog,
      rate: rate,
    };

    axios
      .post(
        "http://localhost/laravel8/public/api/blog/rate/" + props.idBlog,
        data,
        config,
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.errors) {
          setError(res.data.errors);
        } else {
          alert("Đánh giá thành công");
          setRating(rate);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Rating
        onClick={handleRating}
        initialValue={rating}
        size={35}
        transition
        fillColor="gold"
        emptyColor="gray"
      />
      <p>{error}</p>
    </div>
  );
}
