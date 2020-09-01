import React from 'react';

function FoodItemForm(props) {
  
  return (
    <form onSubmit={handleSubmit} className="formClass condimentForm">
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

export default FoodItemForm;