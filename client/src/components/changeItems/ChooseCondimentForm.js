import React, {useState, useEffect} from 'react';
import Axios from 'axios'

function ChooseCondimentForm(props) {
  console.log("chooseCondimentForm props.thisFood: ",props.thisFood)
  const [displayCondiments, setCondiments] = useState([])
  //maybe take this burger's condiments which need to be passed down as props, and add them to this list - coloring them somehow? Depends on how Schema.Types keep track of data - almo might be easier to do a separate list rather than coloring?
  const [condimentIds, setcondimentIds] = useState([])
  const [buttonColor, setButtonColor] = useState("pink")

//This needs to be refactored into context
function getCondiments() {
  Axios.get("/condiment")
      .then(res => {setCondiments(res.data)})
      .catch(err => console.log(err))
}
//we'll need a "put" and a "post" call, but to the foodItem we are on, that adds the list of condiments taken from the condiments db.
//We'll need a "submit" function that adds that list, probably depending on where the form is, whether it should be "post" or "put"

//console.log("Getting data for inner form: ",displayCondiments)
useEffect(()=> {
  getCondiments()
}, [])
//this list will have to access condiments on the list from the burger the form is inside - maybe using props or context?
function handleOneClick(e) {
  e.preventDefault()
  e.persist()
  console.log("The condiment chosen was: ", e.target.value)
  if(condimentIds.includes(e.target.value)) {
    //remove it from the list and take away pink color
    setButtonColor("#fff")
    setcondimentIds(prevList => prevList.filter(extra => extra !== e.target.value))
    e.target.style.backgroundColor = buttonColor
  } else {
    setButtonColor("pink")
    //add it to the array and add pink color to button
    setcondimentIds(prevList => prevList.push(e.target.value))
    e.target.style.backgroundColor = buttonColor
  }
 console.log("list of condiments chosen: ",condimentIds)
 //console.log("buttonColor",buttonColor)
}
//The addNewCondiment function has to not only add the the new condiment to the general list, but at the same time, add it to this food item's list - will this be possible if I reuse the change condiments form? I must somehow put the outer food item into the form's props. can I use props.name or props._id on the component? or inputs? Or Context?

let innerCondList = displayCondiments.map( extra => {
  // In addition to returning the id as value, I will also need to keep track of which burger this form is inside, so I can add these condiments to it - so I will have to add that as props, somehow automatically, becuase how does the mapped form know which list it's inside (?) That will have to go on the "done" button
  //I do not list the current extras, as they are not accessed by ref/schema.type as I want them to be on this list.
return (<button key={extra._id} 
          onClick={handleOneClick} 
          value={extra._id} >
            {extra.name}
        </button>)
})
  return (
    <div className="innerCondForm">
      <h4>Choose your condiments for this item</h4>
       {/* here I will need to get ahold of the ID of each item, to add to the list of each burger's condiments */}
      {innerCondList}
      <button className="">Done</button>
      <button className="btn">Add New Condiment</button>
    </div>
  );
}

export default ChooseCondimentForm;