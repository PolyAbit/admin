import React, { useEffect, useState } from 'react'
import {
	Form,
	Modal,
	Button,
	ModalHeader,
	ModalTitle,
	ModalBody,
	FormGroup,
	FormLabel,
	FormControl,
	ModalFooter,
} from 'react-bootstrap'
import { handleLogin } from '../function'

const AuthNew = () => {
	const [show, setShow] = useState(true)

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
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHBvbHlhYml0LnJ1IiwiZXhwIjoxNzIxMzY0NzMyLCJ1aWQiOjF9.NYIEaFwtxsK9XwaOv98tZsSeK_07T-j60D4hmSiqixc'
		sessionStorage.setItem('Token', token)
		handleLogin()
		// try {
		// 	const response = await fetch(
		// 		'https://alpaca-oriented-certainly.ngrok-free.app/login',

		// 		{
		// 			method: 'POST',
		// 			body: JSON.stringify({ email, password }),
		// 		}
		// 	)

		// 	const { token } = await response.json()
		// 	if (token) {
		// 		sessionStorage.setItem('Token', token)
		// 		handleLogin()
		// 	} else {
		// 		const data = await response.json()
		// 		setErrorMessage('Неверная почта или пароль')
		// 	}
		// } catch (error) {
		// 	console.log('Ошибка при авторизации: ', error)
		// }
	}

	return (
		<main
			className='d-flex vh-100 bg-cover p-0 m-0'
			style={{
				backgroundImage: "url('src/assets/bg1.jpg')",
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<Modal show={show} className='p-0 m-0'>
				<ModalHeader>
					<ModalTitle>Вход</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<FormLabel>Почта</FormLabel>
							<FormControl
								onChange={e => emailHandler(e)}
								onBlur={e => blurHandler(e)}
								type='email'
								placeholder='Введите почтовый адрес'
							/>
						</FormGroup>
						<FormGroup>
							<FormLabel>Пароль</FormLabel>

							<FormControl
								onChange={e => passwordHandler(e)}
								onBlur={e => blurHandler(e)}
								type='password'
								placeholder='Введите пароль'
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						onClick={handleSubmit}
						disabled={!formValid}
						type='button'
						className='btn btn-success'
					>
						Войти
					</Button>
				</ModalFooter>
			</Modal>
		</main>
	)
}
export default AuthNew
