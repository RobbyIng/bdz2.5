import styles from './index.module.css'
import { useNoAuth } from '../../hooks/useNoAuth'

export const LikedList = () => {
  document.getElementById('footerId').style.position = 'fixed'
  const { token } = useNoAuth()

  return <h1 className={styles.userDataForm}>Список избраных товаров</h1>
}
