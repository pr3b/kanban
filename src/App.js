import './App.css';
import { createBrowserHistory } from 'history';
import KanbanBoard from './components/board/KanbanBoard';
import store from './components/store'
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './components/Login';

const history = createBrowserHistory()

function App() {
  return (
    <>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          {/* <Route path="/" component={KanbanBoard} /> */}
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/" component={KanbanBoard} />
        </Switch>
      </Router>
    </Provider>
    </>
  )
}

export default App;
