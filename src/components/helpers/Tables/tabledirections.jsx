import styles from './styles.module.css'

const Table = () => {
	return (
		<div className={styles.body}>
			<div className={styles.containerOfCreateBtn}>
				<input
					type='button'
					className={styles.createBtn}
					value='Добавить направление'
					id='Btn'
				/>

				<div id='Modal' className={styles.modal}>
					<div className={styles.modalContent}>
						<div className={styles.content}>
							<form action=''>
								<input type='text' placeholder='Код' maxlength='10'></input>
								<input
									type='text'
									placeholder='Наименование'
									maxlength='70'
								></input>
								<select multiple size='4' className={styles.selectorInModal}>
									<option disabled>-----</option>
									<option selected value=''>
										РЯ
									</option>
									<option selected value=''>
										МАТ
									</option>
									<option value=''>ФИЗ</option>
									<option value=''>ХИМ</option>
									<option value=''>БИО</option>
									<option value=''>ГЕОГР</option>
									<option value=''>ЛИТ</option>
									<option value=''>ИСТ</option>
									<option value=''>ОБЩ</option>
								</select>
							</form>
						</div>
						<input type='button' className={styles.sendBtn} />
					</div>
				</div>
			</div>
			<div className={styles.containerOfTbl}>
				<table>
					<thead>
						<tr>
							<th>Код</th>
							<th>Направление</th>
							<th>ЕГЭ</th>
							<th>del</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Hello</td>
							<td>Goodbuy</td>
							<td>ok</td>
							<td>del</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Table
