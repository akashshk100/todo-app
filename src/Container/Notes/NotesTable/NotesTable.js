import React, { useState } from 'react';
import TablePaginationActions from '../TablePaginationActions/TablePaginationActions'
import Aux from '../../../HOC/Auxilliary/Auxilliary'
import AddNoteModal from '../../AddNoteModal/AddNoteModal'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import Axios from 'axios'


const NotesTable= (props) => {

	let [addNoteModal, setAddNoteModal] = useState({
		clicked: false,
		id: null,
		edit: null
	})

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.tasks.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleEdit = (id) => {
		setAddNoteModal({
			clicked: true,
			id: id,
			edit: true
		})
	}

	const handleCellClick = (id) => {
		setAddNoteModal({
			clicked: true,
			id: id,
			edit: false
		})
	}

	const changeState = (id, index) => {
		Axios.patch('/tasks/'+id, {
			completed: !props.tasks[index].completed
		}).then( res => {
            props.updateTask(res.data)
		} ).catch( err => {
			console.log(err)
		})
	}

	const removeTask = (id) => {
		Axios.delete('/tasks/'+id).then( res => {
            props.deleteTask(res.data)
		} ).catch( err => {
			console.log(err)
		})
	}


	let modalContent = null 
	if(addNoteModal.clicked){
		modalContent = (
			<AddNoteModal 
				id = {props.tasks[addNoteModal.id]._id}
				open={true} 
				handleClose={ () => { setAddNoteModal({clicked: false, id: null, viewOnly: null}) } } 
				disabled={!addNoteModal.edit}
				summary = {props.tasks[addNoteModal.id].title}
				description = {props.tasks[addNoteModal.id].body}
				priority = {props.tasks[addNoteModal.id].priority}
				dueDate = {new Date(props.tasks[addNoteModal.id].dueDate)}
			/>
		)
	}else{
		modalContent = null
	}

	return (
		<Aux>
			{modalContent}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant="subtitle2" style={{ flexGrow: "1" }}>
								Summary
								</Typography>
							</TableCell>
							<TableCell >
								<Typography variant="subtitle2" style={{ flexGrow: "1" }}>
									Priority
								</Typography>
								
							</TableCell>
							<TableCell >
								<Typography variant="subtitle2" style={{ flexGrow: "1" }}>
									Created At
								</Typography>
							</TableCell>
							<TableCell >
								<Typography variant="subtitle2" style={{ flexGrow: "1" }}>
									Due By
								</Typography>
							</TableCell>
							<TableCell align='center' >
								<Typography variant="subtitle2" style={{ flexGrow: "1" }}>
									Actions
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody> 
						{
						props.tasks.map((row, index) => (
							<TableRow key={index}>
								<TableCell onClick={ () => {handleCellClick(index)}}>
									{ (row.completed) ? (
									<del> {row.title} </del>
									) : row.title }
								</TableCell>
								<TableCell onClick={ () => {handleCellClick(index)}}>
									{ (row.completed) ? (
									<del> {row.priority} </del>
									) : row.priority }
								</TableCell>
								<TableCell onClick={ () => {handleCellClick(index)}}>
									{ (row.completed) ? (
									<del> { new Date(row.createdAt).toLocaleDateString() } </del>
									) : new Date(row.createdAt).toLocaleDateString() }
								</TableCell>
								<TableCell onClick={ () => {handleCellClick(index)}}>
									{ (row.completed) ? (
									<del> { new Date(row.dueDate).toLocaleDateString() } </del>
									) : new Date(row.dueDate).toLocaleDateString() }
								</TableCell>
								<TableCell align='center'>
									<IconButton color="primary" size="small" onClick={() => {handleEdit(index)}}>
										<EditIcon />
									</IconButton>
									<Button 
									variant="contained" 
									size="small" 
									onClick={ () => {changeState(row._id, index)} } 
									style={{ margin: "0px 10px" ,backgroundColor: (!row.completed)?"#4AC571":"#428CB2" }}
									>
										<Typography variant="subtitle2" style={{color: "white"}}>
											{ (!row.completed)?"Done":"Re-Open" }
										</Typography>
									</Button>
									<IconButton color="secondary" size="small" onClick={ () => {removeTask(row._id)} }>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						)
						)}

						{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
								colSpan={5}
								count={props.tasks.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Aux>
	)
}

const mapStateToProps = (state) => {
	return {
		tasks : state.tasks
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateTask: (task) => dispatch({ type: 'UPDATETASK', task: task }),
		deleteTask: (task) => dispatch({ type: 'DELETETASK', task: task })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesTable)