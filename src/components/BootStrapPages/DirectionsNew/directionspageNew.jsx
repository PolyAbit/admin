import React, { useEffect, useState } from 'react'
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Table,
	Image,
	Navbar,
	NavbarBrand,
	NavbarToggle,
	NavbarCollapse,
	Nav,
	Modal,
	ModalHeader,
	ModalTitle,
	ModalBody,
	FormGroup,
	FormLabel,
	FormControl,
	ModalFooter,
	FormSelect,
} from 'react-bootstrap'
// import styles from 'styles.module.css'

const DirectionsNew = () => {
	const [code, setCode] = useState('')
	const [nameDir, setNameDir] = useState('')
	const [description, setDescription] = useState('')
	const [exams, setExams] = useState([])
	const [tableData, setTableData] = useState([])
	const [show, setShow] = useState(false)
	const [clickChecker, setClickChecker] = useState(false)

	const fetchDelTableData = async id => {
		const response = await fetch(
			`https://alpaca-oriented-certainly.ngrok-free.app/direction/${id}`,
			{
				method: 'DELETE',
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('Token')}`,
				},
			}
		)
		try {
			const data = await response.json()
			if (data) console.log('Строчка успешно удалена')
			else console.log('Ошибка удаления строки')
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		const fetchTableData = async () => {
			const response = await fetch(
				'https://alpaca-oriented-certainly.ngrok-free.app/direction',
				{
					method: 'GET',
					headers: {
						authorization: `Bearer ${sessionStorage.getItem('Token')}`,
					},
				}
			)
			try {
				const { directions } = await response.json()
				console.log(directions)
				if (directions) {
					setTableData(directions)
				} else console.log('Ошибка загрузки данных')
			} catch (error) {
				console.log(error)
			}
		}
		fetchTableData()
	}, [])

	const addNewRow = () => {
		setTableData([
			...tableData,
			{
				id: tableData.length + 1,
				code: code,
				name: nameDir,
				exams: exams,
				description: description,
			},
		])
		setCode('')
		setNameDir('')
		setExams([])
		setDescription('')
	}
	const serverConnection = async () => {
		const response = await fetch(
			'https://alpaca-oriented-certainly.ngrok-free.app/direction',
			{
				method: 'POST',
				headers: {
					authorization: `Bearer ${sessionStorage.getItem('Token')}`,
				},
				body: JSON.stringify({
					code: code,
					name: nameDir,
					exams: `${exams[0]},${exams[1]},${exams[2]}`,
					description: description,
				}),
			}
		)
		try {
			if (response.ok) console.log('Данные успешно отправлены')
			else console.log('Ошибка отправки данных')
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		addNewRow()
		serverConnection()
		handleClick()
	}

	const handleDel = id => {
		if (window.confirm('Вы уверены, что хотите удалить эту строку?')) {
			setTableData(tableData.filter(row => row.id !== id))
		}
		fetchDelTableData(id)
	}

	const handleClick = () => {
		if (clickChecker === false) {
			setShow(true)
			setClickChecker(true)
		} else {
			setShow(false)
			setClickChecker(false)
		}
	}

	return (
		<>
			<Container className='d-flex justify-content-end p-3'>
				<Button
					onClick={handleClick}
					type='button'
					className='btn btn-secondary'
				>
					Зарегистрировать направление
				</Button>
			</Container>
			<Modal show={show}>
				<ModalHeader>
					<ModalTitle>Регистрация направления</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleSubmit}>
						<FormGroup value={code} onChange={e => setCode(e.target.value)}>
							<FormLabel>Код</FormLabel>
							<FormControl type='text' />
						</FormGroup>
						<FormGroup
							value={nameDir}
							onChange={e => setNameDir(e.target.value)}
						>
							<FormLabel>Наименование</FormLabel>
							<FormControl type='text' />
						</FormGroup>
						<FormGroup
							value={description}
							onChange={e => setDescription(e.target.value)}
						>
							<FormLabel>Описание</FormLabel>
							<textarea
								className='form-control'
								id='exampleFormControlTextarea1'
								rows='3'
							></textarea>
						</FormGroup>
						<FormSelect
							multiple
							aria-label='Default select example'
							className='mt-3'
							onChange={e => {
								const options = [...e.target.selectedOptions]
								const values = options.map(option => option.value)
								setExams(values)
							}}
						>
							<option disabled>Предметы ЕГЭ</option>
							<option value='РЯ'>РЯ</option>
							<option value='МАТ'>МАТ</option>
							<option value='ФИЗ'>ФИЗ</option>
							<option value='ХИМ'>ХИМ</option>
							<option value='БИО'>БИО</option>
							<option value='ГЕО'>ГЕОГР</option>
							<option value='ЛИТ'>ЛИТ</option>
							<option value='ИСТ'>ИСТ</option>
							<option value='ОБЩ'>ОБЩ</option>
						</FormSelect>
						<Container className='mt-3 d-flex justify-content-between'>
							<Button
								onClick={handleClick}
								type='button'
								className='btn btn-secondary'
							>
								Закрыть
							</Button>
							<Button type='submit' className='btn btn-success'>
								Зарегистрировать
							</Button>
						</Container>
					</Form>
				</ModalBody>
			</Modal>
			<table className='table table-striped table-hover table-bordered table-sm'>
				<thead>
					<tr>
						<th scope='col'>Код</th>
						<th scope='col'>Наименование</th>
						<th scope='col'>Предметы ЕГЭ</th>
						<th scope='col'></th>
					</tr>
				</thead>
				<tbody>
					{tableData.map(row => (
						<tr key={row.id}>
							<td>{row.code}</td>
							<td>{row.nameDir}</td>
							<td>{row.exams.join(', ')}</td>
							<td>
								<Button
									type='button'
									className='btn btn-light '
									onClick={() => handleDel(row.id)}
								>
									<span>
										<i className='fa-solid fa-trash'></i>
									</span>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
export default DirectionsNew
