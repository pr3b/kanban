const initialState = {
    validation: true,
    isLoggedIn: false,
    username: '',
    backlog: [{
        id: 1,
        title: 'Ngoding malam',
        desc: 'dirumah aja'
    },
    {
        id: 2,
        title: 'Ngoding siang',
        desc: 'dikantor'
    },
    {
        id: 3,
        title: 'Ngoding pagi',
        desc: 'diteras'
    }],

    todo: [{
        id: 4,
        title: 'Makan',
        desc: 'diwarteg'
    }],

    progress: [{
        id: 5,
        title: 'Jajan',
        desc: 'diwarung'
    }],

    finished: [{
        id: 6,
        title: 'Renang',
        desc: 'dikolam'
    }]
}

export const actionSwitch = {
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    TO_BACKLOG: 'TO_BACKLOG',
    TO_TODO: 'TO_TODO',
    TO_PROGRESS: 'TO_PROGRESS',
    TO_FINISHED: 'TO_FINISHED',
    DELETE_TASK: 'DELETE_TASK',
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT'
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionSwitch.USER_LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                username: action.data.username
            }
        }
        case actionSwitch.USER_LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                username: ''
            }
        }
        case actionSwitch.ADD_TASK: {
            return {
                ...state,
                backlog: [...state.backlog, action.data]
            }
        }
        case actionSwitch.EDIT_TASK: {
            return {
                ...state,
                backlog: state.backlog.map((backlogs) => {
                    if(backlogs.id === action.data.id){
                        return {
                            ...backlogs,
                            title: action.data.title,
                            desc: action.data.desc
                        }
                    } else {
                        return backlogs
                    }
                })
            }
        }
        case actionSwitch.TO_BACKLOG: {
            return {
                ...state,
                todo: state.todo.filter((todos) => todos.id !== action.data.id),
                backlog: [...state.backlog, action.data]
            }
        }
        case actionSwitch.TO_TODO: {
            return {
                ...state,
                backlog: state.backlog.filter((backlogs) => backlogs.id !== action.data.id),
                progress: state.progress.filter((progresses) => progresses.id !== action.data.id),
                todo: [...state.todo, action.data]
            }
        }
        case actionSwitch.TO_PROGRESS: {
            return {
                ...state,
                todo: state.todo.filter((progresses) => progresses.id !== action.data.id),
                finished: state.finished.filter((finishes) => finishes.id !== action.data.id),
                progress: [...state.progress, action.data]
            }
        }
        case actionSwitch.TO_FINISHED: {
            return {
                ...state,
                progress: state.progress.filter((progresses) => progresses.id !== action.data.id),
                finished: [...state.finished, action.data]
            }
        }
        case actionSwitch.DELETE_TASK: {
            return {
                ...state,
                backlog: state.backlog.filter((backlogs) => backlogs.id !== action.data.id),
                finished: state.finished.filter((clear) => clear.id !== action.data.id)
            }
        }
        default:
            return state;
    }
}
