import React, { useContext } from 'react'
import '../css/Subtotal.css'
import CurrencyFormate from "react-currency-format";
import { stateContext } from './Context'
import { getBasketTotal } from './Reducer'
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const [state, dispatch] = useContext(stateContext)
    const history = useHistory()

    return (
        <div className='subtotal'>
            <CurrencyFormate
            renderText={(value) => (
                <>
                    <p>
                        Subtotal ({state.basket.length} items) :    <strong>{value}</strong>
                    </p>
                    <small className='subtotal_gift'>
                        <input type='checkbox' />this order contains a gift
                    </small>
                </>
            )}
            decimalScale={2}
            value={getBasketTotal(state.basket)}
            displayType='text'
            thousandSeparator={true}
            prefix='$' />
            <button onClick={() => {state.basket?.length > 0 && history.push('/payment')}}>check out</button>
        </div>
    )
}

export default Subtotal
