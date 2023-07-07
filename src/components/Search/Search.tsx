import { useRef, useCallback, useState, ChangeEvent } from 'react'

import styles from './search.module.scss'
import { FiSearch } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import { debounce } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
      const dispatch = useDispatch()
      const [value, setValue] = useState('')
      const inputRef = useRef<HTMLInputElement | null>(null)

      const onClickClear = () => {
            dispatch(setSearchValue(''))
            setValue('')
            inputRef.current?.focus()
      }

      const updateSearchValue = useCallback(
            debounce((str) => {
                  dispatch(setSearchValue(str))
            }, 1000),
            []
      )

      const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
            updateSearchValue(event.target.value)
      }
      return (
            <div className={styles.root}>
                  <FiSearch className={styles.icon} />
                  <input
                        ref={inputRef}
                        value={value}
                        onChange={onChangeInput}
                        className={styles.input}
                        type='text'
                        placeholder='Enter pizza name...'
                  />
                  {value && (
                        <GrClose
                              onClick={onClickClear}
                              className={styles.closeIcon}
                        />
                  )}
            </div>
      )
}

export default Search
