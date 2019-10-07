import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BankIndex from './components/pages/BankIndex.jsx'
import NotFoundPage from './components/pages/_errors/NotFoundPage.jsx'
import Home from './components/pages/Home.jsx'
import UserBankAccountEdit from './components/pages/UserBankAccountEdit.jsx'
import UserBankAccountIndex from './components/pages/UserBankAccountIndex.jsx'
import UserBankAccountNew from './components/pages/UserBankAccountNew.jsx'
import UserEdit from './components/pages/UserEdit.jsx'
import UserIndex from './components/pages/UserIndex.jsx'
import UserNew from './components/pages/UserNew.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import * as r from './routes'
import './App.scss'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          {/* Homepage */}
          <Route exact path={r.HOME()} component={Home} />

          {/** Banks */}
          <Route exact path={r.BANKS_INDEX()} component={BankIndex} />

          {/** Users */}
          <Route exact path={r.USERS_INDEX()} component={UserIndex} />
          <Route path={r.USERS_NEW()} component={UserNew} />
          <Route path={r.USERS_EDIT()} component={UserEdit} />
          <Route exact path={r.USERS_BANK_ACCOUNTS_INDEX()} component={UserBankAccountIndex} />
          <Route path={r.USERS_BANK_ACCOUNTS_NEW()} component={UserBankAccountNew} />
          <Route path={r.USERS_BANK_ACCOUNTS_EDIT()} component={UserBankAccountEdit} />

          {/** NOT FOUND */}
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
