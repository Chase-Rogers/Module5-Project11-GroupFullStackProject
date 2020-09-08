import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import FoodItem from './FoodItem';
import FoodItemForm from './FoodItemForm';

function ChangeFoodItem(props) {
  //All this needs to be lifted so it can be used both here and in Condiment and possibly Combo pages
  const[menuItems, setMenuItems] = useState([])

  //this is the state to show or hide the addItem form
  const [formShow, setFormShow] = useState("hideInputs")
  //this adds a class to the .inputs div to show or hide the add item inputs
  function toggleInputs(e) {
    setFormShow(prevClass => (prevClass === "showInputs"? "hideInputs": "showInputs"))
  }

  function getMenuItems() {
      console.log("props: " + props)
      Axios.get(props.route)
          .then(res => setMenuItems(res.data))
          .catch(err => console.log(err.res.data))
  }
  console.log("set data: ", menuItems)
  console.log(props.route)

  useEffect(() => {
    getMenuItems()
  }, [])

  function addMenuItem(newItems) {
    Axios.post(props.route, newItems)
      .then(res => {setMenuItems(prevItemss => [...prevItemss, res.data])})
      .catch(err => console.log(err.res.data))
  }
  function deleteMenuItem(foodItemId) {
    Axios.delete(props.route + "/" + foodItemId)
      .then(res => { setMenuItems(prevMenuItems => prevMenuItems.filter(foodItem => foodItem._id !== foodItemId))})
      .catch(err => console.log(err.res.data))
  }
  function editMenuItem(updatedMenuItem, FoodItemId) {
    Axios.put(props.route + "/" + FoodItemId, updatedMenuItem)
      .then(res => {
        setMenuItems(prevItems => prevItems.map(item => item._id !== FoodItemId ? item : res.data))
      })
      .catch(err => console.log(err.res.data))
  }
  
  const allFoodItems = menuItems.map(item => 
    <FoodItem 
      {...item}
      key={item._id}
      deleteFunction={deleteMenuItem}
      editFunction={editMenuItem}
      defaultImg={props.defaultImg}
    />)

  return (
    <>
      <h2>This is the Change {props.type}s Form.</h2>
      {allFoodItems}

    <FoodItemForm 
    submitFunction={addMenuItem} 
    btnText={`Done`} 
    toggleFormFunction={toggleInputs} 
    showState={formShow} 
    />
    <button 
        className="addNewBtn" 
  onClick={toggleInputs}>{formShow === "hideInputs"? "+" : "-"}</button>
    </>
  );
}

export default ChangeFoodItem;