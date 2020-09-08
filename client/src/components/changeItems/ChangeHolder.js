import React from 'react'
import DishType from './DishType'
import {Switch, Route} from 'react-router-dom'
import ChangeCondiment from './ChangeCondiment'
import ChangeFoodItem from './ChangeFoodItem'

import defaultCondimentImg from '../../assets/condiment.png'
import defaultBurgerImg from '../../assets/burger.png'
import defaultDrinkImg from '../../assets/drink.png'
import defaultSideImg from '../../assets/side.png'

function ChangeHolder(props) {

  return (
    <div>
        <h3>Choose which Type to Add, Delete or Update</h3>
        <div className="dishTypeHolder flex-row">
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
          <Route exact path="/changeHolder/condiment">
            <ChangeCondiment type="Extra" route="/condiment"  defaultImg={defaultCondimentImg} />
          </Route>
          {/* add route params to the below */}
          <Route exact path="/changeHolder/burger">
            <ChangeFoodItem type="Burger" route="/burger"  defaultImg={defaultBurgerImg}/>
          </Route>
          <Route exact path="/changeHolder/drink">
            <ChangeFoodItem type="Drink" route="/drink"  defaultImg={defaultDrinkImg}/>
          </Route>
          <Route exact path="/changeHolder/side">
            <ChangeFoodItem type="Side" route="/side"  defaultImg={defaultSideImg}/>
          </Route>
      </Switch>
    </div>
  )
}

export default ChangeHolder;