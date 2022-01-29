import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import "./cart.scss";

const Cart = ({ cartItems }) => {
  return (
    <Link to="/payment" className="cart d-flex align-items-center justify-content-between">
      <div>Services</div>
      <div>{cartItems.length}</div>
    </Link>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(Cart);
