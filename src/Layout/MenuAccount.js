import { Link } from "react-router-dom";
export default function MenuAccount() {
  return (
    <div className="col-sm-3">
      <div className="left-sidebar">
        <h2>Account</h2>
        <div className="panel-group category-products" id="accordian">
          {/*category-productsr*/}
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a href="#">
                  <span className="badge pull-right">
                    <i className="fa fa-plus" />
                  </span>
                  Account
                </a>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link to="/member/product">
                  <span className="badge pull-right">
                    <i className="fa fa-plus" />
                  </span>
                  My Product
                </Link>
              </h4>
            </div>
          </div>
        </div>
        {/*/category-products*/}
      </div>
    </div>
  );
}
