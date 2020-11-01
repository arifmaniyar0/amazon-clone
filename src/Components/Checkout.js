import React, { useContext } from 'react'
import '../css/Checkout.css'
import Subtotal from './Subtotal'
import { stateContext } from './Context'
import FlipMove from 'react-flip-move';


function Checkout() {
    const [state, dispatch] = useContext(stateContext)
    // console.log(state)
    const removeFromBasket = (i) => {
        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id : i
        })
    }
    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <img 
                src='https://images-eu.ssl-images-amazon.com/images/G/31/img20/Audio/Jupiter20/Phase1/Hdpn_spkr_1500x300._CB419062651_SY250_.jpg' 
                alt='' />
                <div>
                    {/* <h3>Hello {state.user?.email.split('@')[0]}</h3> */}
                    <h2 className='checkout_title'>Your shopping basket</h2>
                </div>
                <div className='checkout_items'>
                    {state.basket.length > 0 ?
                    (
                        <div style={{ position: 'relative' }}>
                        <FlipMove typeName={null}>
                            {state.basket.map((item,index) => (
                            <div className='basket_items' key={index}>
                                <img width={100} src={item.image} alt='' />
                                <div className='item'>
                                    <h5>{item.title}</h5>
                                    <p>${item.price}</p>
                                    <div className='product_rating'>
                                        {Array(item.rating).fill().map(s => (
                                            <span role='img'>&#11088;</span>
                                        ))}
                                    </div>
                                    <button onClick={() => removeFromBasket(index)}>remove</button>
                                </div>
                            </div>
                            ))}
                        </FlipMove>
                        </div>
                    ) :
                    (<div>No Items In Basket</div>)
                }

                </div>
            </div>
            <div className='checkout_right'>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
