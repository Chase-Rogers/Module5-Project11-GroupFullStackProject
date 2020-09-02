import React, {useContext} from 'react'
import {OrderContext} from '../context/OrderContext'
import Combos from './Combos'

export default function Order() {
    const {orders} = useContext(OrderContext)

    const currentOrders = orders.map(order => (
        <Combos
            order={order}
        />
    ))
    
    return (
        <div>
            {currentOrders}
        </div>
    )
}