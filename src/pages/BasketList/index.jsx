import styles from './index.module.css'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { fetchCurrentProduct } from '../../api/products'
import { CartItem } from '../../components/CartItem'
import { cleanCart } from '../../redux/slices/cartSlice'

export const BasketList = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [...cartList] = useSelector((state) => state.cart)

  // cartList.length > 3
  //   ? (document.getElementById('footerId').style.position = 'static')
  //   : (document.getElementById('footerId').style.position = 'fixed')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getCartProduct', cartList],
    queryFn: async () => {
      return await Promise.allSettled(
        cartList.map((el) => fetchCurrentProduct(token, el.id))
      ).then((value) => {
        return value
      })
    },
  })
  if (cartList.length === 0)
    return (
      <p className={styles.cardTitle}>
        Добавьте элементы в корзину из{' '}
        <Link to={'/'} className={styles.redColor}>
          Каталога
        </Link>
      </p>
    )
  if (isLoading) return <p>Идет загрузка...</p>
  if (isError) return <p>Произошла ошибка: {error}</p>
  if (data.err) return <p>Произошла ошибка: {data.message}</p>

  const totalPrice = data.reduce((accumulator, cartItem) => {
    const cartElem = cartList.find((el) => el.id === cartItem.value._id)
    return (
      accumulator +
      cartElem.count *
        cartItem.value.price *
        (1 - cartItem.value.discount / 100)
    )
  }, 0)
  const totalDiscount = data.reduce((accumulator, cartItem) => {
    const cartElem = cartList.find((el) => el.id === cartItem.value._id)
    return (
      accumulator +
      (cartElem.count * cartItem.value.price * cartItem.value.discount) / 100
    )
  }, 0)
  return (
    <form className={styles.dataForm}>
      <p className={styles.cardTitle}>Корзина</p>
      <div className={styles.wrapper}>
        <div className={styles.cardProductList}>
          {data.map((cartItem) => {
            return (
              <CartItem key={cartItem.value._id} cartItem={cartItem.value} />
            )
          })}
        </div>
        <div className={styles.btnWrapper}>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={() => navigate('/')}
          >
            Вернуться в каталог
          </button>
          <button
            type="button"
            className={styles.cartCln}
            onClick={() => dispatch(cleanCart())}
          >
            Очистить корзину
          </button>
          <div className={styles.summaryWrapper}>
            <p className={styles.label}>Итого:</p>
            <p className={styles.summaryCost}>
              {cartList.length} позиций: {totalPrice} руб
            </p>
            <p className={styles.summaryDiscount}>
              Общая скидка: {totalDiscount} руб
            </p>
          </div>
          <button type="button" className={styles.cartBtn}>
            Оформить заказ
          </button>
        </div>
      </div>
    </form>
  )
}
