import ReactPaginate from 'react-paginate'
import styles from './paginate.module.scss'

import IconButton from '@mui/material/IconButton'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'

const Paginate = ({ currentPage, onPageChange }) => {
      return (
            <ReactPaginate
                  className={styles.root}
                  breakLabel='...'
                  nextLabel={
                        <IconButton
                              style={{
                                    borderRadius: '10px',
                                    width: '30px',
                                    height: '30px',
                              }}
                        >
                              <NavigateNextOutlinedIcon />
                        </IconButton>
                  }
                  onPageChange={(event) => onPageChange(event.selected + 1)}
                  pageRangeDisplayed={5}
                  pageCount={3}
                  forcePage={currentPage - 1}
                  previousLabel={
                        <IconButton
                              style={{
                                    borderRadius: '10px',
                                    width: '30px',
                                    height: '30px',
                              }}
                        >
                              <NavigateBeforeOutlinedIcon />
                        </IconButton>
                  }
                  renderOnZeroPageCount={null}
            />
      )
}

export default Paginate
