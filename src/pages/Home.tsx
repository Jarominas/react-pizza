import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import PizzaSkeleton from '../components/PizzaSkeleton/PizzaSkeleton'
import Paginate from '../components/Paginate/Paginate'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import { Link } from 'react-router-dom'

const Home = () => {
      const dispatch = useDispatch<AppDispatch>()
      const { categoryId, currentPage, searchValue } = useSelector(
            (state: RootState) => state.filter
      )

      const sortType = useSelector(
            (state: RootState) => state.filter.sort.sortProperty
      )

      const { items, status } = useSelector((state: RootState) => state.pizza)

      const onClickCategory = (id) => {
            console.log(id)
            dispatch(setCategoryId(id))
      }

      const onPageChange = (number) => {
            dispatch(setCurrentPage(number))
      }

      const getPizzas = async () => {
            const sortBy = sortType.replace('-', '')
            const order = sortType.includes('-') ? 'desc' : 'asc'
            const category = categoryId > 0 ? `category=${categoryId}` : ''
            const search = searchValue ? `&search=${searchValue}` : ''

            dispatch(
                  fetchPizzas({
                        sortBy,
                        order,
                        category,
                        search,
                        currentPage,
                  })
            )
      }

      useEffect(() => {
            getPizzas()
      }, [categoryId, sortType, searchValue, currentPage])

      const filteredPizzas = items.map((pizza) => (
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

                  {status == 'error' ? (
                        <div className='content__error-info'>
                              <h2>Error</h2>
                              <p>Sorry, there is some issues with the server</p>
                              <p>Please try again letter</p>
                        </div>
                  ) : (
                        <div className='content__items'>
                              {status == 'loading' ? skeleton : filteredPizzas}
                        </div>
                  )}

                  <Paginate
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                  />
            </>
      )
}

export default Home
