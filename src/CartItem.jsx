import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping  }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalAmount = cart.reduce((total, item) => {
      // console.log(item);
      const cost = Number(item.cost); // Ensure cost is a number
      const quantity = Number(item.quantity); // Ensure quantity is a number
      // console.log(quantity);
      return total + (cost * quantity);
    
    }, 0).toFixed(2);
    // console.log("Calculated Total Amount:", totalAmount);
    return totalAmount;
  }; 

  const handleContinueShopping = (e) => {
    // Highlighted change: Call the function from parent component to continue shopping
    if (onContinueShopping) {
      onContinueShopping(); // Change here
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // Highlighted change: Check if quantity is 1, if so remove the item, otherwise decrement
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      ); // Change here
    } else {
      dispatch(removeItem({ name: item.name })); // Change here
    }
  };

  const handleRemove = (item) => {
    // Highlighted change: Dispatch the removeItem action to delete an item from the cart
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    const cost = Number(item.cost); // Ensure cost is a number
    const quantity = Number(item.quantity); 
    // console.log(quantity)// Ensure quantity is a number
    const totalCost = (cost * quantity).toFixed(2);
    // console.log(`Total cost for ${item.name}: ${totalCost}`);
    return totalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div> 
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Checkout functionality to be implemented later')}>Checkout</button> {/* Changed alert text */}

      </div>
    </div>
  );
};

export default CartItem;



