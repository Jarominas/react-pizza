import * as React from 'react'
import { useState } from 'react'

const Categories = ({ value, onClickCategory }) => {
      const categories = [
            'Все',
            'Мясные',
            'Вегетарианская',
            'Гриль',
            'Острые',
            'Закрытые',
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
