import Table from '../../Tables/tabledirections'
import styles from './styles.module.css'

const Main = () => {
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
					<a href='' className={styles.logout}>
						Выйти
					</a>
				</div>
			</header>
			<Table />
		</main>
	)
}

export default Main
