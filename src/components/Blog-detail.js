import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cmt from "./Cmt";
import ListCmt from "./ListCmt";
import Rate from "./Rate";
function Blogdetail(props) {
  let params = useParams();
  // console.log(params);

  const [data, setData] = useState("");
  const [comment, setComment] = useState([]);
  const [idRely, setIdRely] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/laravel8/public/api/blog/detail/" + params.id)
      .then((response) => {
        setData(response.data.data);
        // console.log(response.data.data);
        setComment(response.data.data.comment);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  function renderData() {
    if (Object.keys(data).length > 0) {
      return (
        <div>
          <div className="single-blog-post">
            <h3>Girls Pink T Shirt arrived in store</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user"> Mac Doe</i>
                </li>
                <i className="fa fa-user">
                  <li>
                    <i className="fa fa-clock-o"> 1:33 pm</i>
                  </li>
                  <i className="fa fa-clock-o">
                    <li>
                      <i className="fa fa-calendar"> DEC 5, 2013</i>
                    </li>
                    <i className="fa fa-calendar"></i>
                  </i>
                </i>
              </ul>
              <i className="fa fa-user">
                <i className="fa fa-clock-o">
                  <i className="fa fa-calendar">
                    {"{"}/*{" "}
                    <span>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-half-o" />
                    </span>{" "}
                    */{"}"}
                  </i>
                </i>
              </i>
            </div>
            <i className="fa fa-user">
              <i className="fa fa-clock-o">
                <i className="fa fa-calendar">
                  <a href>
                    <img src="/images/blog/blog-one.jpg" alt="" />
                  </a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  {"{"}" "{"}"}
                  <br />
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum. Sed
                    ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo.
                  </p>
                  {"{"}" "{"}"}
                  <br />
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt.
                  </p>
                  {"{"}" "{"}"}
                  <br />
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora incidunt ut labore et dolore magnam aliquam
                    quaerat voluptatem.
                  </p>
                  <div className="pager-area">
                    <ul className="pager pull-right">
                      <li>
                        <a href="#">Pre</a>
                      </li>
                      <li>
                        <a href="#">Next</a>
                      </li>
                    </ul>
                  </div>
                </i>
              </i>
            </i>
          </div>
          <i className="fa fa-user">
            <i className="fa fa-clock-o">
              <i className="fa fa-calendar"></i>
            </i>
          </i>
        </div>
      );
    }
  }
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {renderData()}
      </div>
      {/*/blog-post-area*/}
      <Rate idBlog={params.id} />
      {/*/rating-area*/}
      <div className="socials-share">
        <a href>
          <img src="/images/blog/socials.png" alt="" />
        </a>
      </div>
      {/*/socials-share*/}
      {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}
      {/*Comments*/}
      <ListCmt comment={comment} />
      {/*/Response-area*/}
      <Cmt idBlog={params.id} />
      {/*/Repaly Box*/}
    </div>
  );
}

export default Blogdetail;
