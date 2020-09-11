import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import FoodItem from './FoodItem';
import FoodItemForm from './FoodItemForm';

function ChangeCondiment(props) {

  //this stores the data from the api in state
  const [condiments, setCondiments] = useState([])

  //this is the state to show or hide the addItem form
  const [formShow, setFormShow] = useState("hideInputs")

  function getCondiments() {
    Axios.get(props.route)
        .then(res => setCondiments(res.data))
        .catch(err => console.log(err))
  }
  console.log("data: ", condiments)

  useEffect(() => {
    getCondiments()
  }, [])

  function addCondiments(newCondiment) {
    Axios.post(props.route, newCondiment)
      .then(res => {setCondiments(prevCondiments => [...prevCondiments, res.data])})
      .catch(err => console.log(err.res.data))
  }
  function deleteCondiment(extraId) {
    Axios.delete(props.route + "/" + extraId)
      .then(res => { setCondiments(prevCondiments => prevCondiments.filter(extra => extra._id !== extraId))})
      .catch(err => console.log(err.res.data))
  }
  function editCondiment(updatedCondiment, itemId) {
    Axios.put(props.route + "/" + itemId, updatedCondiment)
      .then(res => {
        setCondiments(prevItems => prevItems.map(item => item._id !== itemId ? item : res.data))
      })
      .catch(err => console.log(err.res.data))
  }

  //this adds a class to the .inputs div to show or hide the add item inputs
  function toggleInputs(e) {
    setFormShow(prevClass => (prevClass === "showInputs"? "hideInputs": "showInputs"))
  }

  //console.log(props.route)
  //console.log("props on food item page: ", props)
  const allExtras = condiments.map(extra => 
    <FoodItem 
      {...extra} 
      key={extra._id} 
      deleteFunction={deleteCondiment} 
      editFunction={editCondiment}
      defaultImg={props.defaultImg}
      //formShow={formShow}
      //toggleFormFunction={toggleInputs}
      //fakeProp="here"
    />)

  return (
    <>
    <h2>This is the Change {props.type}s Form.</h2>
    {allExtras.sort((a, b)=> (a.name > b.name)? 1: -1)}

    <FoodItemForm 
    submitFunction={addCondiments} 
    btnText={`Add ${props.type}`} 
    toggleFormFunction={toggleInputs} 
    showState={formShow} 
    />
    <button 
        className="addNewBtn" 
  onClick={toggleInputs}>{formShow === "hideInputs"? "+" : "-"}</button>
    </>
  );
}

export default ChangeCondiment;