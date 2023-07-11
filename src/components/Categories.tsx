type CategoriesProps = {
      value: number
      onClickCategory: (id: number) => void
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
      const categories = [
            'All',
            'Meat',
            'Vegan',
            'Grill',
            'Hot Chilli',
            'Closed',
      ]
      /* const onClickCategory = (index) => {
            setActiveIndex(index)

            console.log(index)
      } */

      return (
            <div className='categories'>
                  <ul>
                        {categories.map((category, id) => {
                              return (
                                    <li
                                          key={id}
                                          onClick={() => onClickCategory(id)}
                                          className={
                                                value === id ? 'active' : ''
                                          }
                                    >
                                          {category}
                                    </li>
                              )
                        })}
                  </ul>
            </div>
      )
}

export default Categories
