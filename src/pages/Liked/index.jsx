import styles from './index.module.css'
import { useAuth } from '../../hooks/useAuth'

export const LikedList = () => {
  document.getElementById('footerId').style.position = 'fixed'
  const { token } = useAuth()

  return <h1 className={styles.userDataForm}>Список избраных товаров</h1>
}
