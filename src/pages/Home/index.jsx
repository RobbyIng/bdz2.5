import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export const Home = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.user)

  useEffect(() => {
    if (token) navigate('/products')
  }, [navigate, token])

  return (
    <div className={styles.wrapperInfo}>
      <h1>
        <Link to={'/signin'} className={styles.redColor}>
          Авторизуйтесь
        </Link>
        , чтобы отобразить список продуктов
      </h1>
      <h1>
        <Link to={'/signup'} className={styles.redColor}>
          Пройдите регистрацию
        </Link>
        , если вы не зарегистрированы
      </h1>
    </div>
  )
}
