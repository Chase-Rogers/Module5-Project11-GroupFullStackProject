import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function DishType(props) {
    
    return (
        <div className="dishType flex-col btn">
          <Link to={"/changeItem" + props.route}>{props.type}</Link>
        </div>
    );
}

export default DishType;