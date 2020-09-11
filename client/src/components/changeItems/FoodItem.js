import React, {useState} from 'react';
//import defaultCondimentImg from '../../assets/condiment.png'
import FoodItemForm from './FoodItemForm'

function FoodItem(props) {

  //console.log("FoodItem props: ", props)
  const [editToggle, setEditToggle] = useState(false)
  //the below state is for the toggle?
  //const [condimentsDisplay, setCondimentsDisplay] = useState(false)
  let areExtrasDisplayed = false

  //This gets at the list of condiments/extras for the menu item, if any
  let mappedCondiments = []
  if (props.condiments && props.condiments.length > 0) {
      areExtrasDisplayed = true
      mappedCondiments = props.condiments.map(extra => <span key={extra._id}>{extra.name}, &nbsp; </span>)
  }

  return (
    <div className="addedFoodItem">
      {!editToggle ?
        <>
        {/* if I use condimentsDisplay boolean in the above mapping, I get an infinite loop??? */}
        { areExtrasDisplayed && <div className="condimentsList flex-row"><p>Extras:&nbsp;</p>{mappedCondiments}</div>}
     
        
        <span className="itemField flex-row"><p>Item: </p>&nbsp; {props.name} </span>
        <span className="itemField flex-row"><p> {props.category && "Category: "} </p>&nbsp; {props.category}</span> 
        <span className="itemField flex-row"><p> {props.price === "" ||props.price === "0" ? "": "Price: $"}</p> {props.price === "0" ? "": props.price}</span> 
        <span className="itemField flex-row"><p>&nbsp; </p><img src={props.img || props.defaultImg} alt={`${props.name} at our hamburger joint`} /></span>
        <span className="flex-row">
          <button 
            onClick={() => props.deleteFunction(props._id)} 
            className="deleteBtn">x</button>
          <button 
            onClick={() => setEditToggle(prevToggle => !prevToggle)} 
            className="editBtn">Edit</button>
        </span>
      </>
      :
      <>
        <FoodItemForm 
          name={props.name}
          category={props.category}
          price={props.price}
          img={props.img}
          _id={props._id}
          btnText="Submit Edit"
          submitFunction={props.editFunction}
        />
        <button  
          onClick={() => setEditToggle(prevToggle => !prevToggle)} className="btn closeBtn">
          Close</button>
      </>
      }
    </div>
  );
}

export default FoodItem;