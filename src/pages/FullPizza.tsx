import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FullPizza: FC = () => {
      const [pizza, setPizza] = useState<{
            imageUrl: string
            title: string
            price: number
      }>()
      const { id } = useParams()

      useEffect(() => {
            async function fetchPizza() {
                  try {
                        const { data } = await axios.get(
                              'https://6486e8e2beba6297278f7688.mockapi.io/items/' +
                                    id
                        )
                        setPizza(data)
                  } catch (error) {
                        alert('Error with loading')
                  }
            }
            fetchPizza()
      }, [])

      if (!pizza) {
            return <div className='loader'></div>
      }
      return (
            <div className='container'>
                  <img src={pizza.imageUrl} />
                  <h2>{pizza.title}</h2>
                  <h4>{pizza.price}</h4>
            </div>
      )
}

export default FullPizza
