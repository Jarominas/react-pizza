import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import { RootState } from '../redux/store'

type PizzaBlockProps = {
      id: number
      count: number
      imageUrl: string
      title: string
      types: number[]
      sizes: number[]
      price: number
}

type PizzaItem = {
      pizza: PizzaBlockProps
}
const PizzaBlock: React.FC<PizzaItem> = ({ pizza }) => {
      const dispatch = useDispatch()
      const [activeType, setActiveType] = useState(0)
      const [activeSize, setActiveSize] = useState(0)
      const { id, imageUrl, title, types, count, sizes, price } = pizza

      const typeNames = ['thin', 'traditional']
      const cartItem = useSelector((state: RootState) =>
            state.cart.items.find((obj) => obj.id == id)
      )

      const addedCount = cartItem ? cartItem.count : 0
      const typeChanger = (typeIndex: number) => {
            setActiveType(typeIndex)
      }

      const sizeChanger = (sizeIndex: number) => {
            setActiveSize(sizeIndex)
      }

      const onClickAdd = () => {
            const item = {
                  id,
                  title,
                  price,
                  imageUrl,
                  count,
                  type: typeNames[activeType],
                  size: sizes[activeSize],
            }
            dispatch(addItem(item))
      }
      return (
            <div className='pizza-block'>
                  <Link to={`/fullpizza/${pizza.id}`}>
                        <img
                              className='pizza-block__image'
                              src={imageUrl}
                              alt='Pizza'
                        />
                  </Link>
                  <div className='pizza-right-content'>
                        <h4 className='pizza-block__title'>{title}</h4>
                        <div className='pizza-block__selector'>
                              <ul>
                                    {types.map((type: number, id: number) => (
                                          <li
                                                key={id}
                                                onClick={() => typeChanger(id)}
                                                className={
                                                      activeType === id
                                                            ? 'active'
                                                            : ''
                                                }
                                          >
                                                {typeNames[type]}
                                          </li>
                                    ))}
                              </ul>
                              <ul>
                                    {sizes.map((size: number, id: number) => (
                                          <li
                                                key={id}
                                                onClick={() => sizeChanger(id)}
                                                className={
                                                      activeSize === id
                                                            ? 'active'
                                                            : ''
                                                }
                                          >
                                                {size} см
                                          </li>
                                    ))}
                              </ul>
                        </div>
                        <div className='pizza-block__bottom'>
                              <div className='pizza-block__price'>
                                    от {price} ₽
                              </div>
                              <button
                                    onClick={onClickAdd}
                                    className='button button--outline button--add'
                              >
                                    <svg
                                          width='12'
                                          height='12'
                                          viewBox='0 0 12 12'
                                          fill='none'
                                          xmlns='http://www.w3.org/2000/svg'
                                    >
                                          <path
                                                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                                                fill='white'
                                          />
                                    </svg>
                                    <span>Добавить</span>
                                    {addedCount > 0 && <i>{addedCount}</i>}
                              </button>
                        </div>
                  </div>
            </div>
      )
}

export default PizzaBlock
