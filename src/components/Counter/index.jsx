import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import {
  decrementCartItem,
  incrementCartItem,
} from '../../redux/slices/cartSlice'

export const Counter = ({ cartItem }) => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state)

  const cartItemCount = cart.find((el) => el.id === cartItem._id).count

  return (
    <div className={styles.countWrapper}>
      <button
        className={styles.countBtn}
        onClick={() => dispatch(decrementCartItem(cartItem._id))}
        disabled={cartItemCount === 1}
      >
        -
      </button>
      <p className={styles.countValue}>{cartItemCount}</p>
      <button
        className={styles.countBtn}
        onClick={() => dispatch(incrementCartItem(cartItem._id))}
        disabled={cartItemCount >= cartItem.stock}
      >
        +
      </button>
    </div>
  )
}
