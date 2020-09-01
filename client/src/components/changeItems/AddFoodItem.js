import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function AddFoodItem(props) {
  const[menuItem, setMenuItems] = useState([])

  function getMenuItems() {
      console.log("props: " + props)
      Axios.get(props.route)
          .then(res => setMenuItems(res.data))
          .catch(err => console.log(err.res.data.errMsg))
  }
  console.log("set data: ", menuItem)
  console.log(props.route)
  return (
    <form className=" formClass foodItemsForm">
      <h2>This is the future Add Items Form for all food types.</h2>
    </form>
  );
}

export default AddFoodItem;