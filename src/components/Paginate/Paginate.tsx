import ReactPaginate from 'react-paginate'
import styles from './paginate.module.scss'

import IconButton from '@mui/material/IconButton'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'

const Paginate = () => {
      return (
            <ReactPaginate
                  className={styles.root}
                  breakLabel='...'
                  nextLabel={
                        <IconButton>
                              <NavigateNextOutlinedIcon />
                        </IconButton>
                  }
                  onPageChange={(event) => console.log(event)}
                  pageRangeDisplayed={5}
                  pageCount={3}
                  previousLabel={
                        <IconButton>
                              <NavigateBeforeOutlinedIcon />
                        </IconButton>
                  }
                  renderOnZeroPageCount={null}
            />
      )
}

export default Paginate
