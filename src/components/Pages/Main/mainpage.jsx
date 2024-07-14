import Table from '../../Tables/tabledirections'
import styles from './styles.module.css'

const Main = () => {
	const handleClick = () => {
		window.location.href = '/'
		sessionStorage.removeItem('Token')
	}

	return (
		<main className={styles.body}>
			<header className={styles.header}>
				<div className={styles.container}>
					<img src='/src/assets/logo.png' className={styles.logo}></img>
				</div>
				<div className={styles.menu}>
					<a href='' className={styles.href}>
						Направления
					</a>
					<a href='' className={styles.hrefDisabled}>
						Аббитуриенты
					</a>
					<a href='' className={styles.hrefDisabled}>
						Управление
					</a>
					<button onClick={handleClick} className={styles.logout}>
						Выйти
					</button>
				</div>
			</header>
			<Table />
		</main>
	)
}

export default Main
