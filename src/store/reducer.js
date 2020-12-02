
const initialState = {
    tasks: [],
    authState: false
}

const reducer = ( state=initialState, action ) => {
    if(action.type === 'ADDTASKS'){
        let tempTasks = [...state.tasks]
        action.tasks.forEach( task => {
            tempTasks.push(task)
        });
        return {
            ...state,
            tasks : tempTasks
        }
    }
    if(action.type === 'UPDATETASK'){
        let tempTasks = [...state.tasks]
        tempTasks.forEach( (task, index) => {
            if(task._id === action.task._id){
                tempTasks[index] = action.task
            }
        } )
        return {
            ...state,
            tasks : tempTasks
        }
    }
    if(action.type === 'DELETETASK'){
        let tempTasks = [...state.tasks]
        let delIndex = -1
        tempTasks.forEach( (task, index) => {
            if(task._id === action.task._id){
                delIndex = index
            }
        } )
        tempTasks.splice(delIndex, 1)
        return {
            ...state,
            tasks : tempTasks
        }
    }
    if(action.type === 'UPDATEAUTH'){
        return {
            ...state,
            authState: action.value
        }
    }
    if(action.type === 'CLEARSTATE'){
        return {
            ...state,
            tasks: []
        }
    }

    return state
}

export default reducer