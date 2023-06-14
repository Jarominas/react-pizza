import { useState, useEffect } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaSkeleton/PizzaSkeleton'

const Home = () => {
      const [pizzas, setPizzas] = useState([])
      const [isLoading, setIsLoading] = useState(true)

      const getPizzas = async () => {
            setIsLoading(true)
            const response = await fetch(
                  'https://6486e8e2beba6297278f7688.mockapi.io/items'
            )
            const pizzas = await response.json()
            setPizzas(pizzas)
            setIsLoading(false)
      }

      useEffect(() => {
            getPizzas()
      }, [])
      return (
            <>
                  <div className='content__top'>
                        <Categories />
                        <Sort />
                  </div>
                  <h2 className='content__title'>All Pizzas</h2>
                  <div className='content__items'>
                        {isLoading
                              ? [...new Array(6)].map((_, index) => (
                                      <PizzaSkeleton key={index} />
                                ))
                              : pizzas.map((pizza, id) => (
                                      <PizzaBlock
                                            key={id}
                                            pizza={{ ...pizza }}
                                      />
                                ))}
                  </div>
            </>
      )
}

export default Home