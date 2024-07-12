import styles from './styles.module.css'
import { useState } from 'react'

function Table() {
	const [code, setCode] = useState('')
	const [nameDir, setNameDir] = useState('')
	const [exams, setExams] = useState([])
	const [tableData, setTableData] = useState([])
	const [modalStyle, setModalStyle] = useState({
		display: 'none',
	})
	const [clickChecker, setClickChecker] = useState(false)

	const addNewRow = () => {
		setTableData([
			...tableData,
			{
				code: code,
				nameDir: nameDir,
				exams: exams,
				id: tableData.length + 1,
			},
		])
		setCode('')
		setNameDir('')
		setExams([])
	}

	const handleSubmit = e => {
		e.preventDefault()
		addNewRow()
	}

	const handleDel = id => {
		if (window.confirm('Вы уверены, что хотите удалить эту строку?')) {
			setTableData(tableData.filter(row => row.id !== id))
		}
	}

	const handleClick = () => {
		if (clickChecker === false) {
			setModalStyle({
				display: 'flex',
			})
			setClickChecker(true)
		} else {
			setModalStyle({
				display: 'none',
			})
			setClickChecker(false)
		}
	}

	return (
		<div className={styles.body}>
			<div className={styles.containerOfCreateBtn}>
				<input
					onClick={handleClick}
					type='button'
					className={styles.createBtn}
					value='Добавить направление'
				/>
			</div>
			<div style={modalStyle} id='modal' name='modal' className={styles.modal}>
				<div className={styles.modalContent}>
					<form onSubmit={handleSubmit} action='' className={styles.form}>
						<div className={styles.containerOfInput}>
							<div className={styles.leftSideContent}>
								<input
									className={styles.formInput}
									type='text'
									placeholder='Код направления'
									maxLength='10'
									value={code}
									onChange={e => setCode(e.target.value)}
								></input>
								<input
									className={styles.formInput}
									type='text'
									placeholder='Наименование направления'
									maxLength='70'
									value={nameDir}
									onChange={e => setNameDir(e.target.value)}
								></input>
								<textarea
									placeholder='Описание направления'
									className={styles.textArea}
								></textarea>
							</div>
							<div className={styles.rightSideContent}>
								<select
									onChange={e => {
										const options = [...e.target.selectedOptions]
										const values = options.map(option => option.value)
										setExams(values)
									}}
									value={exams}
									multiple
									size='5'
									className={styles.selectorInModal}
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
								</select>
							</div>
						</div>
						<div className={styles.containerOfFormButtons}>
							<input
								onClick={handleClick}
								name='closeBtn'
								type='button'
								className={styles.closeBtn}
								value='Закрыть'
							/>
							<input
								onClick={handleClick}
								type='submit'
								className={styles.sendBtn}
								placeholder='Добавить'
							/>
						</div>
					</form>
				</div>
			</div>

			<div className={styles.containerOfTbl}>
				<table>
					<thead>
						<tr>
							<th>Код</th>
							<th>Направление</th>
							<th>ЕГЭ</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{tableData.map(row => (
							<tr key={row.id}>
								<td>{row.code}</td>
								<td>{row.nameDir}</td>
								<td>{row.exams.join(', ')}</td>
								<td>
									<button
										className={styles.delBtn}
										onClick={() => handleDel(row.id)}
									>
										<span>
											<i className='fa-solid fa-trash'></i>
										</span>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Table
