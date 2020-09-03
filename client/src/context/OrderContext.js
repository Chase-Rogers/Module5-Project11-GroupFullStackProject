import React, {createContext, useState} from 'react'
const OrderContext = createContext()

export default function OrderContextProvider(props) {
    const [orders, setOrders] = useState([])

    function addOrderItem(order){
        setOrders(prevOrders => {
            return [
                ...prevOrders, order
            ]
        })
    }

    return (
        <OrderContext.Provider value={{orders, addOrderItem}}>
            {props.children}
        </OrderContext.Provider>
    )
}

export {OrderContextProvider, OrderContext}