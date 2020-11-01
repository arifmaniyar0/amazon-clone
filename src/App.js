import React,{ useEffect, useContext } from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import { auth } from './firebase'
import { stateContext } from './Components/Context'
import Payment from './Components/Payment';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Orders from './Components/Orders'


const promise = loadStripe('pk_test_51HgwewKaMEhVDFsouPIl9fwT2AIw8B8EsClTDDlUgQBjhESiTtdtkqfpxHgpQzsmjKvzYpyN9uoFBJYEwVso5HOr00w5qydyAx')

function App() {
  const [state, dispatch] = useContext(stateContext)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user) {
        dispatch({
          type: 'SET_USER',
          item: user
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          item: null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/'>
            <Header />
            <Home />
          </Route>
          <Route  path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route  path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path='/orders'>
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
