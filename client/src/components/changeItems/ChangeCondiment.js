import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import defaultCondimentImg from '../../assets/condiment.png'

function ChangeCondiment(props) {
  //this stores the data from the api in state
  const [condiments, setCondiments] = useState([])
  //these are to help set the initial input fields to empty/clean
  const initInputs = {
        name: "",
        category: "",
        price: "",
        img: "", 
  }
  //this is the state for typing into input fields
  const [inputs, setInputs] = useState(initInputs)
  //console.log(inputs)
  //this is the state to show or hide the add item inputs on the form
  const [formShow, setFormShow] = useState("hideInputs")

  useEffect(() => {
    getCondiments()
  }, [])
  
  function getCondiments() {
      Axios.get(props.route)
          .then(res => setCondiments(res.data))
          .catch(err => console.log(err.res.data))
  }
  console.log("data: ", condiments)

  
  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({...prevInputs, [name]:value}))
  }
  function handleSubmit(e) {
    e.preventDefault()
    addCondiments(inputs)
    setInputs(initInputs)
    setFormShow("hideInputs")
  }
  function addCondiments(newCondiment) {
    Axios.post(props.route, newCondiment)
      .then(res => {setCondiments(prevCondiments => [...prevCondiments, newCondiment])})
      .catch(err => console.log(err.res.data))
  }
  function deleteCondiment(extraId) {
    Axios.delete(props.route + "/" + extraId)
      .then(res => { setCondiments(prevCondiments => prevCondiments.filter(extra => extra._id !== extraId))})
      .catch(err => console.log(err.res.data))
  }
  //this adds a class to the .inputs div to show or hide the add item inputs
  function toggleInputs(e) {
    e.preventDefault()
    setFormShow("showInputs")
  }
  //console.log(props.route)
  //console.log("props on food item page: ", props)

  const allExtras = condiments.map(extra => <div className="addedFoodItem" key={extra._id}>
  <span className="itemField flex-row"><p>Item: </p>&nbsp; {extra.name} </span>
  <span className="itemField flex-row"><p> {extra.category && "Category: "} </p>&nbsp; {extra.category}</span> 
  <span className="itemField flex-row"><p> {extra.price === "" || "O"? "": "Price: $"}</p>&nbsp; {extra.price === "0" ? "": extra.price}</span> 
  <span className="itemField flex-row"><p>&nbsp; </p><img src={extra.img || defaultCondimentImg} /></span>
  <button onClick={() => deleteCondiment(extra._id)} className="deleteBtn">x</button>
  </div>)
  return (
    <form onSubmit={handleSubmit} className="formClass condimentForm">
      <h2>This is the Change {props.type}s Form.</h2>
      {allExtras}
    <div className={`inputs ${formShow}`}>
      <input 
        className=""
        type="text" 
        name="name" 
        value={inputs.name} 
        onChange={handleChange} 
        placeholder="item name" required />
      <input 
        className=""
        type="text" 
        name="category" 
        value={inputs.category} 
        onChange={handleChange} 
        placeholder="item category" />
      <input 
        className=""
        type="text" 
        name="price" 
        value={inputs.price} 
        onChange={handleChange} 
        placeholder="item price" />
        {/* the image upload form needs to be properly enabled to really add images to a cloud storage */}
      <input 
        className=""
        type="upload" 
        name="img" 
        value={inputs.img} 
        onChange={handleChange} 
        placeholder="item image" />
        <button className="btn">Add to list</button>
      </div>
        <button 
        className="addNewBtn" 
        onClick={toggleInputs }>+</button>
    </form>
  );
}

export default ChangeCondiment;