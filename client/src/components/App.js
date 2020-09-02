import React from 'react'
import Combos from './Combos'
import Sides from './Sides'
import Order from './Order'
import Total from './Total'
import Settings from './Settings'
import ManagerView from './ManagerView'
import OrderContextProvider from '../context/OrderContext'

export default function App() {
    return (
        <div>
            <OrderContextProvider>
                <div className='app-main'>
                    <div className='app-main-left'>
                        <Combos/>
                        <Sides/>
                    </div>
                    <div className='app-main-right'>
                        <Order/>
                        <Total/>
                    </div>
                </div>
            </OrderContextProvider>
            <div className='app-footer'>
                <Settings/>
                <ManagerView/>
            </div>
        </div>
    )
}