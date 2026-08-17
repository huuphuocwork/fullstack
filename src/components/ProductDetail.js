import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-multi-carousel/lib/styles.css"; // CSS để carousel hiển thị đúng layout
import Carousel from "react-multi-carousel"; // Thư viện slide ảnh theo mẫu

export default function ProductDetail() {
  // Lấy id sp trên URL
  let params = useParams();

  //   Lưu thông tin 1 sản phẩm lấy từ API
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/laravel8/public/api/product/detail/" + params.id)
      .then((res) => {
        console.log(res.data.data);
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Chỉ render giao diện khi product đã có data (tránh lỗi lúc mới load, product còn là {})
  function renderProduct() {
    if (Object.keys(product).length > 0) {
      // Cấu hình carousel: hiển thị 3 ảnh 1 lúc, không phân biệt kích thước màn hình
      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 0 },
          items: 3, // 👉 hiển thị 3 hình cùng lúc
          slidesToSlide: 1,
        },
      };
      return (
        <div className="col-sm-9 padding-right">
          <div className="product-details">
            {/*product-details*/}
            <div className="col-sm-5">
              <div className="view-product">
                {/* Ảnh đại diện = ảnh ĐẦU TIÊN trong mảng image, ghép link từ id_user */}
                <img
                  src={
                    // Đường dẫn ảnh sản phẩm được ghép từ 3 phần:
                    // 1. Link gốc tới thư mục upload
                    // 2. id_user -> vì ảnh được lưu theo từng thư mục con là id của user đã đăng kí
                    "http://localhost/laravel8/public/upload/product/" +
                    product.id_user +
                    "/" +
                    JSON.parse(product.image)[0]
                    // 3. item.image là chuỗi JSON dạng '["a.jpg","b.jpg"]'
                    // -> JSON.parse() để biến chuỗi đó thành mảng thật
                    // -> [0] lấy ra ảnh ĐẦU TIÊN trong mảng để hiển thị làm ảnh đại diện
                  }
                  alt=""
                />
              </div>
              {/* Slide toàn bộ ảnh trong product.image bằng react-multi-carousel */}
              <Carousel
                responsive={responsive}
                arrows={true}
                infinite={true}
                autoPlay={false}
                showDots={false}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
              >
                {/* Duyệt qua từng ảnh trong mảng, mỗi ảnh -> 1 slide trong carousel */}
                {JSON.parse(product.image).map((abc, index) => {
                  // console.log(abc, index);
                  return (
                    <img
                      style={{ width: "100%" }}
                      key={index}
                      src={
                        "http://localhost/laravel8/public/upload/product/" +
                        product.id_user +
                        "/" +
                        abc
                      }
                    />
                  );
                })}
              </Carousel>
            </div>
            <div className="col-sm-7">
              <div className="product-information">
                {/*/product-information*/}
                {/* Chỉ hiện ảnh "NEW" khi product.status == 1 (New), ẩn đi khi Sale */}

                {product.status == 1 && (
                  <img
                    src="/images/product-details/new.jpg"
                    className="newarrival"
                    alt=""
                  />
                )}
                <h2>{product.name}</h2>
                <p>Web ID:{product.web_id}</p>
                <img src="/images/product-details/rating.png" alt="" />
                <span>
                  <span>${product.price}</span>
                  <label>Quantity:</label>
                  <input type="text" defaultValue={3} />
                  <button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </button>
                </span>
                <p>
                  <b>Availability:</b> In Stock
                </p>
                <p>
                  <b>Condition :</b> {product.status == 1 ? "New" : "Sale"}
                </p>
                <p>Brand : {product.id_brand}</p>
                <p>Category :{product.id_category}</p>
                <p>Detail :{product.detail}</p>
                <p>Active :{product.active}</p>
                <p>Condition :{product.condition}</p>
                <a href="">
                  <img
                    src="/images/product-details/share.png"
                    className="share img-responsive"
                    alt=""
                  />
                </a>
              </div>
              {/*/product-information*/}
            </div>
          </div>
          {/*/product-details*/}
          <div className="category-tab shop-details-tab">
            {/*category-tab*/}
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li>
                  <a href="#details" data-toggle="tab">
                    Details
                  </a>
                </li>
                <li>
                  <a href="#companyprofile" data-toggle="tab">
                    Company Profile
                  </a>
                </li>
                <li>
                  <a href="#tag" data-toggle="tab">
                    Tag
                  </a>
                </li>
                <li className="active">
                  <a href="#reviews" data-toggle="tab">
                    Reviews (5)
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade" id="details">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="companyprofile">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tag">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery1.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery2.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery3.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="images/home/gallery4.jpg" alt="" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade active in" id="reviews">
                <div className="col-sm-12">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-user" />
                        EUGEN
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-clock-o" />
                        12:41 PM
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-calendar-o" />
                        31 DEC 2014
                      </a>
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis
                    aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <p>
                    <b>Write Your Review</b>
                  </p>
                  <form action="#">
                    <span>
                      <input type="text" placeholder="Your Name" />
                      <input type="email" placeholder="Email Address" />
                    </span>
                    <textarea defaultValue={""} />
                    <b>Rating: </b>{" "}
                    <img src="images/product-details/rating.png" alt="" />
                    <button
                      type="button"
                      className="btn btn-default pull-right"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*/category-tab*/}
        </div>
      );
    }
  }
  return <div>{renderProduct()}</div>;
}
