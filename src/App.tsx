import './scss/app.scss'
import { useState, useEffect } from 'react'

import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'
// const url = 'https://6486e8e2beba6297278f7688.mockapi.io/items'

function App() {
      const [pizzas, setPizzas] = useState([])

      const getPizzas = async () => {
            const response = await fetch(
                  'https://6486e8e2beba6297278f7688.mockapi.io/items'
            )
            const pizzas = await response.json()
            setPizzas(pizzas)
      }

      useEffect(() => {
            getPizzas()
      }, [])
      return (
            <div className='wrapper'>
                  <Header />
                  <div className='content'>
                        <div className='container'>
                              <div className='content__top'>
                                    <Categories />
                                    <Sort />
                              </div>
                              <h2 className='content__title'>All Pizzas</h2>
                              <div className='content__items'>
                                    {pizzas.map((pizza) => (
                                          <PizzaBlock pizza={{ ...pizza }} />
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default App
