import React from 'react'
import EmptyCartImg from '../img/empty-cart.png'
import { Link } from 'react-router-dom'

const CartEmpty: React.FC = () => {
      return (
            <div className='cart cart--empty'>
                  <h2>
                        Your Cart is empty <span>😕</span>
                  </h2>
                  <p>
                        Probably you haven't yet ordered any pizza
                        <br />
                        To order pizza please go to main page.
                  </p>
                  <img src={EmptyCartImg} alt='Empty cart' />
                  <Link to='/' className='button button--black'>
                        <span>Back to Main page</span>
                  </Link>
            </div>
      )
}

export default CartEmpty
