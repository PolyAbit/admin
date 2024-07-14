import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
	// const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState('Почта должна быть указана')
	const [passwordError, setPasswordError] = useState(
		'Пароль должен быть указан'
	)
	const [formValid, setFormValid] = useState(false)

	useEffect(() => {
		if (emailError || passwordError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [emailError, passwordError])

	const emailHandler = e => {
		setEmail(e.target.value)
		const filter =
			/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/
		if (!filter.test(String(e.target.value).toLowerCase())) {
			setEmailError('Почта некорректна')
		} else setEmailError('')
	}
	const passwordHandler = e => {
		setPassword(e.target.value)
		if (e.target.value.length < 6 || e.target.value.length > 18) {
			setPasswordError('Пароль некорректный')
		} else setPasswordError('')
	}
	const blurHandler = e => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await fetch(
				'https://alpaca-oriented-certainly.ngrok-free.app/login',

				{
					method: 'POST',
					body: JSON.stringify({ email, password }),
				}
			)

			const { token } = await response.json()
			if (token) {
				sessionStorage.setItem('Token', token)
				window.location.href = 'main'
			} else {
				const data = await response.json()
				setErrorMessage('Неверная почта или пароль')
			}
		} catch (error) {
			console.log('Ошибка при авторизации: ', error)
		}
	}

	return (
		<main className={styles.main}>
			<span className={styles.mask}></span>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.wrapper}>
						<div className={styles.mainOfWrapper}>
							{emailDirty && emailError && (
								<div className={styles.error}>{emailError}</div>
							)}
							<input
								onChange={e => emailHandler(e)}
								onBlur={e => blurHandler(e)}
								name='email'
								type='email'
								placeholder='Почта'
								className={styles.inputArea}
							/>
							{passwordDirty && passwordError && (
								<div className={styles.error}>{passwordError}</div>
							)}
							<input
								onChange={e => passwordHandler(e)}
								onBlur={e => blurHandler(e)}
								name='password'
								type='password'
								placeholder='Пароль'
								className={styles.inputArea}
							/>
						</div>
						<div className={styles.footerOfWrapper}>
							<a href='' className={styles.href}>
								<input
									onClick={handleSubmit}
									disabled={!formValid}
									type='submit'
									value='Войти'
									className={styles.resume}
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Auth
