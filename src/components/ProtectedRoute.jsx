import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({ path, component: Component, ...props}) {
    const isLoggedIn = useSelector((state) => state.kanban.isLoggedIn)

    return (
        <div>
            <Route {...props} path={path} render={(props) =>
                isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }/>
        </div>
    )
}
