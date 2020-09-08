import React, {useState, useEffect} from 'react';
import Axios from 'axios'

function ChooseCondimentForm(props) {
  const [displayCondiments, setCondiments] = useState([])
  //maybe take this burger's condiments which need to be passed down as props, and add them to this list - coloring them somehow? Depends on how Schema.Types keep track of data - almo might be easier to do a separate list rather than coloring?
  const [idList, setIdList] = useState([])
  const [buttonColor, setButtonColor] = useState("")

//This needs to be refactored into context
function getCondiments() {
  Axios.get("/condiment")
      .then(res => {setCondiments(res.data)})
      .catch(err => console.log(err))
}
//console.log("Getting data for inner form: ",displayCondiments)
useEffect(()=> {
  getCondiments()
}, [])
//this list will have to access condiments on the list from the burger the form is inside - maybe using props or context?
function handleOneClick(e) {
  e.preventDefault()
  //const thisId = e.target.value
  console.log("The condiment chosen was: ", e.target.value)
  //put the id onto list, and remove it if the button is clicked again? if not on list, add, if on list, remove - create state for this.
  if(idList.includes(e.target.value)) {
    //remove it from the list and take away pink color
    setIdList(prevList => prevList.filter(extra => extra !== e.target.value))
    setButtonColor("#fff")
    e.target.style.backgroundColor = buttonColor
  } else {
    //add it to the array and add pink color to button
    setIdList(prevList => prevList.push(e.target.value))
    setButtonColor("pink")
    e.target.style.backgroundColor = buttonColor
  }
 console.log("list of condiments chosen: ",idList)
}
//The addNewCondiment function has to not only add the the new condiment to the general list, but at the same time, add it to this food item's list - will this be possible if I reuse the change condiments form? I must somehow put the outer food item into the form's props. can I use props.name or props._id on the component? or inputs?

let innerCondList = displayCondiments.map( extra => {
  // In addition to returning the id as value, I will also need to keep track of which burger this form is inside, so I can add these condiments to it - so I will have to add that as props, somehow automatically, becuase how does the mapped form know which list it's inside (?) That will have to go on the "done" button
  //I do not list the current extras, as they are not accessed by ref/schema.type as I want them to be on this list.
return (<button key={extra._id} onClick={handleOneClick} value={extra._id} >{extra.name}</button>)
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