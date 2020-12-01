import React, {Component} from 'react'
import Layout from './Components/Layout/Layout'
import AddNoteModal from './Container/AddNoteModal/AddNoteModal'
import SearchControls from './Components/SearchControls/SearchControls'
import Notes from './Container/Notes/Notes'
import Axios from 'axios'
import { connect } from 'react-redux'

const sortBy = (notes) => {
  let groupedNotes = {
    none: [],
    low: [],
    medium: [],
    high: []
  }
  notes.forEach( note => {
    let notePriority = note.priority
    groupedNotes[notePriority].push(note)
  } )
  return groupedNotes
}


class App extends Component{

	constructor(props){
		super(props)
		this.state = {
			searchActive: false,
			sortedBy: "none",
			addNoteModal: false,
			noteId: 1,
			notes: [],
			forwardedNotes:  [],
			searchNotes: null
		}
	}

	componentDidMount = () => {
		Axios.get('/tasks').then( res => {
			this.props.addTasks(res.data)
		}) 
	}

	openAddNoteModal = () => {
		this.setState({
			addNoteModal: true
		})
	}

	changeState = (id) => {
		let tempNotes = this.state.notes
		let tempIndex = -1
		for (let index = 0; index < tempNotes.length; index++) {
			if(tempNotes[index].id === id){
			tempIndex = index
			break
			}
		}
		tempNotes[tempIndex].currentState = !tempNotes[tempIndex].currentState
		this.setState({
			notes: tempNotes,
			forwardedNotes: tempNotes,
			sortedBy: "none"
		})
	}

	handleSearch = (searchString) => {
		if(searchString.length !== 0){
			let tempNotes = this.state.forwardedNotes.filter( (note, index) => {
			console.log(note.summary.toLowerCase().includes(searchString.toLowerCase()))
			return note.summary.toLowerCase().includes(searchString.toLowerCase())  
			})
			this.setState({
			searchNotes: tempNotes,
			searchActive: true
			})
		}
		else{
			this.setState({
			searchActive: false
			})
		}
	}

	handleSortBy = (value) => {
		if(value === "priority"){
			let tempNotes = sortBy(this.state.forwardedNotes)
			let concatedNotes = tempNotes.none.concat(tempNotes.low.concat(tempNotes.medium.concat(tempNotes.high)))
			this.setState({
			sortedBy: value,
			forwardedNotes: concatedNotes
			})
		}
		else{
			this.setState({
			sortedBy: value,
			forwardedNotes: this.state.notes
			})
		}
	}

  render = () => {

    return(
      <div style={ {width: "70%", margin: "auto" } }>
        <Layout openAddNoteModal={this.openAddNoteModal}>
          <AddNoteModal 
            open={this.state.addNoteModal} 
            handleClose={ () => { this.setState({ addNoteModal: false }) }} 
            disabled={false}
          />
          <div style= { {marginTop: "30px"} }>
            <SearchControls handleSearch={this.handleSearch} handleSortby={this.handleSortBy} sortedBy={this.state.sortedBy}/>
          </div>
          <div style= { {marginTop: "30px"} }>
            <Notes />
          </div>
        </Layout>
      </div>
    )
  }
} 

const mapStateToProps = (state) => {
	return {
		tasks : state.tasks
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTasks : (tasks) =>  dispatch({ type: 'ADDTASKS', tasks: tasks })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
