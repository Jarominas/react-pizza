import { CartItem } from '../redux/slices/cartSlice'

export const calcTotalSum = (items: CartItem[]) => {
      return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
