import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import "./cart.scss";

const Cart = ({ cartItems }) => {
  return (
    <div className="cart d-flex align-items-center justify-content-between">
      <div>Services</div>
      <div>{cartItems.length}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(Cart);
