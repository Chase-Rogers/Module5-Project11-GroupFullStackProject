import React from 'react';
import {Link} from 'react-router-dom'

function DishType(props) {
    
    return (
        <div className="dishType flex-col btn">
          <Link to={"/changeHolder" + props.route}>{props.type}</Link>
        </div>
    );
}

export default DishType;