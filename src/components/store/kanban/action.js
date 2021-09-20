import { actionSwitch } from "./reducer";

export const login = (username, password) => {
    return {
        type: actionSwitch.USER_LOGIN,
        data: { username, password },
    }
}

export const logout = () => {
    return {
        type: actionSwitch.USER_LOGOUT,
    }
}

export const addTask = (newTask) => {
    return {
        type: actionSwitch.ADD_TASK,
        data: newTask
    }
}

export const editTask = (id, title, desc) => {
    return {
        type: actionSwitch.EDIT_TASK,
        data: id,
              title,
              desc,
    }
}

export const toTodo = (id, title, desc) => {
    return {
        type: actionSwitch.TO_TODO,
        data: id, 
              title,
              desc,
        
    }
}

export const toBacklog = (id, title, desc) => {
    return {
        type: actionSwitch.TO_BACKLOG,
        data: id, 
              title,
              desc,
    }
}

export const toProgress = (id, title, desc) => {
    return {
        type: actionSwitch.TO_PROGRESS,
        data: id,
              title, 
              desc,
    }
}

export const toFinished = (id, title, desc) => {
    return {
        type: actionSwitch.TO_FINISHED,
        data: id,
              title,
              desc,
    }
}

export const deleteTask = (backlogId) => {
    return {
        type: actionSwitch.DELETE_TASK,
        data: {
            id: backlogId
        }
    }
}