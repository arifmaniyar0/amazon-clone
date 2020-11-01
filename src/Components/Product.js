import React,{ useContext} from 'react'
import '../css/Product.css'
import { stateContext } from './Context'

function Product({ title, price, image, rating}) {
    const [state, dispatch] = useContext(stateContext)
    console.log(state)

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                title: title,
                price: price,
                image: image,
                rating: rating
            }
        })
    }

    return (
        <div className='product'>
            <div className='product_info'>
                <p>{title}</p>
                <p className='product_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product_rating'>
                    {Array(rating).fill().map((_,i) => (
                        <span role='img'>&#11088;</span>
                    ))}
                </div>
            </div>
            <img  
            src={image} 
            alt='product_image' />
            <button onClick={() => addToBasket()}>add to basket</button>
        </div>
    )
}

export default Product
