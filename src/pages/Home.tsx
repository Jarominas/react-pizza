import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaSkeleton/PizzaSkeleton'
import Paginate from '../components/Paginate/Paginate'
import { SearchContext } from '../App'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
      const categoryId = useSelector((state) => state.filter.categoryId)
      const dispatch = useDispatch()

      console.log(categoryId)

      const { searchValue } = useContext(SearchContext)
      const [pizzas, setPizzas] = useState([])
      const [isLoading, setIsLoading] = useState(true)
      // const [categoryId, setCategoryId] = useState(0)

      const [sortType, setSortType] = useState({
            name: 'Popular',
            sortProperty: 'rating',
      })
      const [currentPage, setCurrentPage] = useState(1)

      const onClickCategory = (id) => {
            console.log(id)
            dispatch(setCategoryId(id))
      }

      const getPizzas = async () => {
            const sortBy = sortType.sortProperty.replace('-', '')
            const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc'
            const category = categoryId > 0 ? `category=${categoryId}` : ''
            const search = searchValue ? `&search=${searchValue}` : ''

            setIsLoading(true)
            const response = await fetch(
                  `https://6486e8e2beba6297278f7688.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            )

            const pizzas = await response.json()
            setPizzas(pizzas)
            setIsLoading(false)
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
                        <Sort
                              value={sortType}
                              onChangeSort={(id) => setSortType(id)}
                        />
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
