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

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          {/* Homepage */}
          <Route exact path="/" component={Home} />

          {/** Banks */}
          <Route exact path="/banks" component={BankIndex} />

          {/** Users */}
          <Route exact path="/users" component={UserIndex} />
          <Route path="/users/new" component={UserNew} />
          <Route path="/users/:userID/edit" component={UserEdit} />
          <Route exact path="/users/:userID/bank_accounts" component={UserBankAccountIndex} />
          <Route path="/users/:userID/bank_accounts/new" component={UserBankAccountNew} />
          <Route path="/users/:userID/bank_accounts/:bankAccountID/edit" component={UserBankAccountEdit} />

          {/** NOT FOUND */}
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
