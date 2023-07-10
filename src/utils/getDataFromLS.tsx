import { calcTotalSum } from './calcTotalSum'
import { CartItem } from '../redux/slices/cartSlice'

export const getDataFromLS = () => {
      const data = localStorage.getItem('cart')
      const items = data ? JSON.parse(data) : []
      const totalPrice = calcTotalSum(items)

      return {
            items: items as CartItem[],
            totalPrice,
      }
}
