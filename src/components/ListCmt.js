import { useState } from "react";
import axios from "axios";
function ListCmt(props) {
  // console.log(props.comment.length);
  const [comment, setComment] = useState([]);

  function renderComment() {
    // console.log("renderComment chạy");
    if (props.comment.length > 0) {
      // console.log("Có dữ liệu");
      return props.comment.map((item) => {
        // console.log(item);
        return (
          <ul className="media-list" key={item.id}>
            <li className="media">
              <a className="pull-left" href="#">
                <img
                  width="100px"
                  className="media-object"
                  src={
                    "http://localhost/laravel8/public/upload/user/avatar/" +
                    item.image_user
                  }
                  alt=""
                />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li>
                    <i className="fa fa-user" />
                    {item.name_user}
                  </li>
                  <li>
                    <i className="fa fa-clock-o" /> 1:33 pm
                  </li>
                  <li>
                    <i className="fa fa-calendar" /> DEC 5, 2013
                  </li>
                </ul>
                <p>{item.comment}</p>
                <a className="btn btn-primary" href>
                  <i className="fa fa-reply" />
                  Replay
                </a>
              </div>
            </li>
          </ul>
        );
      });
    }
  }

  return (
    <div className="response-area">
      <h2>3 RESPONSES</h2>
      {renderComment()}
    </div>
  );
}
export default ListCmt;
