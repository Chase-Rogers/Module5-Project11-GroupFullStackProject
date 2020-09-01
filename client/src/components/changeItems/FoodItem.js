import React from 'react';
import defaultCondimentImg from '../../assets/condiment.png'

function FoodItem(props) {
  console.log("FoodItem props: ", props)
  return (
    <div className="addedFoodItem">
      <span className="itemField flex-row"><p>Item: </p>&nbsp; {props.name} </span>
      <span className="itemField flex-row"><p> {props.category && "Category: "} </p>&nbsp; {props.category}</span> 
      <span className="itemField flex-row"><p> {props.price === "" || "O"? "": "Price: $"}</p>&nbsp; {props.price === "0" ? "": props.price}</span> 
      <span className="itemField flex-row"><p>&nbsp; </p><img src={props.img || defaultCondimentImg} /></span>
      <button onClick={() => props.deleteFunction(props._id)} className="deleteBtn">x</button>
    </div>
  );
}

export default FoodItem;