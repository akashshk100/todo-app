import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/AddCircleRounded'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import Aux from '../../HOC/Auxilliary/Auxilliary'
import { connect } from 'react-redux'
import Axios from 'axios'

const Layout = (props) => {

    const logout = async () => {
        await Axios.post('/logout')
        localStorage.removeItem('authToken')
        props.updateAuthState(false)
        props.clearState()
    }

    return(
        <Aux>
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: "1"}} >
                    Todo App
                </Typography>
                <IconButton onClick={logout}>
                    <LogoutIcon color="primary" />
                </IconButton>
                <IconButton onClick={props.openAddNoteModal}>
                    <AddIcon color="primary" />
                </IconButton>
            </Toolbar>
            <main>
                {props.children}
            </main>
        </Aux>
    )
}

const mapDispatchToProps = (dispatch) => {
	return {
        updateAuthState : (value) =>  dispatch({ type: 'UPDATEAUTH', value: value}),
        clearState: () => dispatch({type: 'CLEARSTATE'})
	}
}

export default connect(null, mapDispatchToProps)(Layout)