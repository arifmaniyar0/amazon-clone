import React,{ useContext } from 'react'
import '../css/Header.css'
import SearchIcon from '@material-ui/icons/Search';
// import { IconButton } from '@material-ui/core';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { Link, useHistory } from 'react-router-dom';
import { stateContext } from './Context'
import { auth } from '../firebase'

export default function Header() {
    const [state, dispatch] = useContext(stateContext)
    const history = useHistory()
    console.log('user auth > ', state.user)
    const handleAuth = () => {
        if(state.user) {
            auth.signOut()
        }
        else{
            history.push('/login')
        }
    }

    return (
        <div className='header'>
            <Link to='/'>    
                <img className='header_logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='amazon logo' />
            </Link>
            <div className='header_search'>
                <input className="header_searchInput" type="text" placeholder="Search" aria-label="Search" />
                <SearchIcon className='header_searchIcon' style={{width:'30px'}} />
            </div>
            <div className='header_nav'>
                {/* <Link to='/login'> */}
                <div onClick={() => handleAuth()} className='header_option'>
                    <span className='header_option1'>{state.user ? state.user?.email.split('@')[0] : 'Guest'}</span>
                    <span className='header_option2'>{state.user ? 'Sign Out' : 'Sign In'}</span>
                </div>
                {/* </Link> */}
                <div className='header_option'>
                    <span className='header_option1'>Returns &</span>
                    <span className='header_option2'>Orders</span>
                </div>
                <div className='header_option'>
                    <span className='header_option1'>Your</span>
                    <span className='header_option2'>Prime</span>
                </div>
                {/* <Link to='/checkout'> */}
                    
                {/* </Link> */}
            </div>
            <div onClick={() => history.push('/checkout')} className='header_option2 header_optionBasket'>
                <AddShoppingCartOutlinedIcon className='cart' />
                <span className='header_option2 header_basketCount'>{state.basket?.length}</span>
            </div>
        </div>
    )
}
