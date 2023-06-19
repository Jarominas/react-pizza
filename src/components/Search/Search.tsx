import styles from './search.module.scss'
import { FiSearch } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

const Search = ({ searchValue, setSearchValue }) => {
      return (
            <div className={styles.root}>
                  <FiSearch className={styles.icon} />
                  <input
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className={styles.input}
                        type='text'
                        placeholder='Enter pizza name...'
                  />
                  {searchValue && (
                        <GrClose
                              onClick={() => setSearchValue('')}
                              className={styles.closeIcon}
                        />
                  )}
            </div>
      )
}

export default Search
