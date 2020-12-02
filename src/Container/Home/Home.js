import React, { Component } from 'react'
import SearchControls from '../../Components/SearchControls/SearchControls'
import Notes from '../Notes/Notes'
import Axios from 'axios'
import { connect } from 'react-redux'

class Home extends Component{

    componentDidMount = () => {
		console.log('home')
		Axios.get('/tasks').then( res => {
			this.props.addTasks(res.data)
		})
	}

	componentWillUnmount = () => {
		console.log('home unmounted')
		this.props.clearState()
	}

    render(){
        return (
            <React.Fragment>
                <div style= { {marginTop: "30px"} }>
                    <SearchControls />
                </div>
                <div style= { {marginTop: "30px"} }>
                    <Notes />
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTasks : (tasks) =>  dispatch({ type: 'ADDTASKS', tasks: tasks }),
		clearState: () => dispatch({type: 'CLEARSTATE'})
	}
}

export default connect(null, mapDispatchToProps)(Home)