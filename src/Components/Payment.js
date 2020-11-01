import React,{ useContext,useEffect, useState } from 'react'
import '../css/Payment.css'
import { stateContext } from './Context'
import { useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { getBasketTotal } from './Reducer'
import CurrencyFormate from "react-currency-format";
import axios from '../axios'

function Payment() {
    const [state, dispatch] = useContext(stateContext)
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [clientSecret, setClientSecret] = useState(null)

    const history = useHistory()
    const elements = useElements()
    const stripe = useStripe()


    useEffect(() => {
        setError(null)
        if(state.basket?.length === 0) {
            history.push('/')
        }

        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method:'post',
                    url: `/payments/create?total=${getBasketTotal(state.basket) * 100}`
                })
                console.log('clientsecret', response.data.clientSecret)
                setClientSecret(response.data.clientSecret)
            }
            catch(err) {
                console.log('client secret error: ', err)
            }
        }

        getClientSecret();
    },[state.basket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        console.log('clientSecret:',clientSecret)
        try {
            const payment = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })
            .then(({paymentIntent }) => {
                setSucceeded(true)
                setError(null)
                setProcessing(false)

                dispatch({
                    type: 'EMPTY_BASKET'
                })

                history.replace('/orders')
            })
        }
        catch(err) {
            console.log('submit problem',err.message)
            setError(err.message)
            setProcessing(false)
        }
    }

    const handleChange = e => {
        setDisabled(false)
        setError(e.error ? e.error.message : null)
    }

    const removeFromBasket = (i) => {
        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id : i
        })
    }

    return (
        <div className='payment'>
            <h1>Checkout ({state.basket?.length} items)</h1>
            <div className='payment_body'>
                <div className='payment_address payment_row'>
                    <h3>Delivery Address: </h3>
                    <p>12/24, karol bagh,<br /> main bus stand,<br />new delhi 110005</p>
                </div>
                <div className='payment_items payment_row'>
                    <h3>Delivery Item:</h3>
                    <div className='all_items'>
                        {state.basket.length > 0 ?
                        state.basket.map((item,index) =>
                        (<div className='payment_product' key={index}>
                            <img 
                            width={100} 
                            src={item.image}
                            alt='product_image' />
                            <div className='payment_product_info'>
                                <p>{item.title}</p>
                                <p className='product_price'>
                                    <small>$</small>
                                    <strong>{item.price}</strong>
                                </p>
                                <div className='product_rating'>
                                    {Array(item.rating).fill().map((_,i) => (
                                        <span key={i} role='img'>&#11088;</span>
                                    ))}
                                </div>
                                <button onClick={() => removeFromBasket(index)}>Remove From Basket</button>
                            </div>
                        </div>)) :
                        <div>no item </div>}
                    </div>
                </div>
                <div className='payment_method payment_row'>
                    <h3>Payment Product: </h3>
                    <p>
                        <form onSubmit={() => handleSubmit}>
                            <CardElement onChange={(e) => handleChange(e)} />
                        </form>
                        <div className='payment_total'>
                        <CurrencyFormate
                        renderText={(value) => (
                            <>
                                <p>
                                    Subtotal ({state.basket.length} items) :    <strong>{value}</strong>
                                </p>
                            </>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(state.basket)}
                        displayType='text'
                        thousandSeparator={true}
                        prefix='$' />
                        <button 
                        disabled={processing || disabled || succeeded} 
                        onClick={(e) => handleSubmit(e)}>
                            {processing ? 'Processing' : 'Buy'}
                        </button>
                        {error && <div>{error}</div>}
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Payment
