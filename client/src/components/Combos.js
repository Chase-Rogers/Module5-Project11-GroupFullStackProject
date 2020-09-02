import React, {useState, useContext} from 'react'
import comboData from './comboData'
import { OrderContext } from '../context/OrderContext'

export default function Combos(props) {
    console.log(props)
    const {addOrderItem} = useContext(OrderContext)
    const [addedOrder, setAddedOrder] = useState(false)
    
    const ordered = () => {
        addOrderItem(props.order)
        setAddedOrder(true)
    }

    const combos = comboData.map(combo => (
        <div>
            <div className='combos-red'>
                <h3> {combo.name} </h3>
                <h5> ${combo.price} </h5>
                <button onClick={ordered}>add</button>
            </div>
        </div>
    ))
    
    
    return (
        <div className='combos'>
            {combos}
        </div>
    )
}