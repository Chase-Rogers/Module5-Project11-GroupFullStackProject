import React, {useState} from 'react';
import ChooseCondimentForm from './ChooseCondimentForm';

function FoodItemForm(props) {
   //these are to help set the initial input fields to empty/clean
   const initInputs = {
    name: props.name || "",
    category: props.category || "",
    price: props.price || "",
    img: props.img || "", 
  }
  //this is the state for typing into input fields
  const [inputs, setInputs] = useState(initInputs)


  function handleSubmit(e) {
    //e.preventDefault()
    props.submitFunction(inputs, props._id)
    setInputs(initInputs)
    //props.toggleFormFunction("hideInputs")
  }

  function handleChange(e) {
    const { name, value } = e.target
    setInputs(prevInputs => ({...prevInputs, [name]:value}))
  }
  //console.log(inputs)
  console.log("props.name in edit form: ",props.name)
  return (
    <div className='foodItemForm'>
    <form onSubmit={handleSubmit} className={` formClass condimentsForm inputs ${props.showState}`}>
      <ChooseCondimentForm />
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
    {/* add conditional addCondiments button here */}
      <button className="btn">{props.btnText}</button>
       
    </form>
    </div>
    
  );
}

export default FoodItemForm;