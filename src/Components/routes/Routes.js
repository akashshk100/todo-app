import { Switch, Route, Redirect} from 'react-router-dom'
import Home from '../../Container/Home/Home'
import React from 'react'
import Login from '../auth/Login'
import {connect} from 'react-redux'

const Routes = (props) => {
    return(
        <React.Fragment>
            { ( props.authState ) ? (
                <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Redirect from='/' to='/home' />
                </Switch>
            ) : (
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Redirect from='/' to='/login' />
                </Switch>
            ) }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        authState: state.authState
    }
}

export default connect(mapStateToProps)(Routes)