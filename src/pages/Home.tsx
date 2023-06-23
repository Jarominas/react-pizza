import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaSkeleton/PizzaSkeleton'
import Paginate from '../components/Paginate/Paginate'
import { SearchContext } from '../App'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
      const dispatch = useDispatch()
      const categoryId = useSelector((state) => state.filter.categoryId)
      const sortType = useSelector((state) => state.filter.sort.sortProperty)

      const { searchValue } = useContext(SearchContext)
      const [pizzas, setPizzas] = useState([])
      const [isLoading, setIsLoading] = useState(true)

      const [currentPage, setCurrentPage] = useState(1)

      const onClickCategory = (id) => {
            console.log(id)
            dispatch(setCategoryId(id))
      }

      const getPizzas = async () => {
            const sortBy = sortType.replace('-', '')
            const order = sortType.includes('-') ? 'desc' : 'asc'
            const category = categoryId > 0 ? `category=${categoryId}` : ''
            const search = searchValue ? `&search=${searchValue}` : ''

            setIsLoading(true)

            axios.get(
                  `https://6486e8e2beba6297278f7688.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            ).then((res) => {
                  setPizzas(res.data)
                  setIsLoading(false)
            })
      }

      useEffect(() => {
            getPizzas()
      }, [categoryId, sortType, searchValue, currentPage])

      const filteredPizzas = pizzas.map((pizza) => (
            <PizzaBlock key={pizza.id} pizza={{ ...pizza }} />
      ))

      const skeleton = [...new Array(6)].map((_, index) => (
            <PizzaSkeleton key={index} />
      ))
      return (
            <>
                  <div className='content__top'>
                        <Categories
                              value={categoryId}
                              onClickCategory={onClickCategory}
                        />
                        <Sort />
                  </div>
                  <h2 className='content__title'>All Pizzas</h2>
                  <div className='content__items'>
                        {isLoading ? skeleton : filteredPizzas}
                  </div>
                  <Paginate onPageChange={(number) => setCurrentPage(number)} />
            </>
      )
}

export default Home
