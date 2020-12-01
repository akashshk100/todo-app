import React, {Component} from 'react'
import Aux from '../../HOC/Auxilliary/Auxilliary'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import NotesTable from './NotesTable/NotesTable'

class Notes extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            tabValue: 0,
            categorySelected: false
        }
    }
    
    handleChange = (event, newValue) => {
        
    }

    render = () => {
        return(
            <Aux>
                <Tabs
                    style={{ borderBottom: '1px solid #e8e8e8' }}
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                >
                    <Tab label="All" style={{minWidth: "fit-content" }}/>
                    <Tab label="Pending" style={{minWidth: "fit-content" }}/>
                    <Tab label="Completed" style={{minWidth: "fit-content" }}/>
                </Tabs>
                <div style={ {marginTop: "10px"} }>
                    <NotesTable />
                </div>
            </Aux>
        )
    }
}

export default Notes