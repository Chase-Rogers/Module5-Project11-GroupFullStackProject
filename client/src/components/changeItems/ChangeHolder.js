import React from 'react'
import DishType from './DishType'
import {Switch, Route} from 'react-router-dom'
import ChangeCondiment from './ChangeCondiment'
import AddFoodItem from './AddFoodItem'

function ChangeItem(props) {

  return (
    <div>
        {/* <Route exact path="/changeItem"> */}
        <h3>Choose which Type to Add, Delete or Update</h3>
        <div className="dishTypeHolder">
            <DishType type="Burger" route="/burger" />
            <DishType type="Side" route="/side" />
            <DishType type="Drink"route="/drink" />
            <DishType type="Extra"route="/condiment" />
            <DishType type="Combo"route="/combo" />
            {/* Look at how I did router parameters in my covid project, so I can create the same page that only has a different database. Or just hard code it. Add other pages' components below - they will be the same component, but with the routes linking to different databases above 
            Can I add parameters depending on the link?*/}
          </div>
          {/* </Route> */}
      <Switch>
          <Route exact path="/changeItem/condiment">
            <ChangeCondiment type="Extra" route="/condiment" />
          </Route>
          {/* add route params to the below */}
          <Route exact path="/changeItem/burger">
            <AddFoodItem />
          </Route>
      </Switch>
    </div>
  )
}

export default ChangeItem;