import React from 'react'
import * as cm2TechClient from '../../clients/cm2tech'
import Page from './_Page'
import NotFoundPage from './_errors/NotFoundPage'

class UserIndex extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: undefined,
      bankAccounts: []
    }
  }

  componentDidMount = () => {
    let { userID } = this.props.match.params

    if (isNaN(Number(userID))) {
      this.setState({ userID: null })
    } else {
      this.setState({ userID }, this.loadUserBankAccounts)
    }
  }

  loadUserBankAccounts = () => {
    const { userID } = this.state

    cm2TechClient.getUserBankAccounts(userID).then(accountsResult => {
      this.setState({ userID, bankAccounts: accountsResult['hydra:member'] })
    }).catch(err => {
      this.setState({ userID: null })
    })
  }

  tryDeleteBankAccount = bankAccountIndex => {
    const bankAccount = this.state.bankAccounts[bankAccountIndex]

    if (window.confirm(bankAccount.accountName)) {
      cm2TechClient.deleteBankAccount(bankAccount.id).then(result => {
        this.loadUserBankAccounts()
      })
    }
  }

  render () {
    const { userID, bankAccounts } = this.state
    if (userID === null) return <NotFoundPage />

    return (
      <Page title="User bank accounts">
        <div>
          <div><a href={`/users/${userID}/bank_accounts/new`}>New account</a></div>
          <b>Account name | Account number | Account digit | Account type | Agency | Agency digit</b>
          { bankAccounts.map(({ id, accountName, accountNumber, accountDigit, accountType, agency, agencyDigit }, index) =>
            <div key={index}>
              <span>{accountName} | {accountNumber} | {accountDigit} | {accountType} | {agency} | {agencyDigit} </span>
              <a href={`/users/${userID}/bank_accounts/${id}/edit`}>edit</a>
              <button onClick={() => this.tryDeleteBankAccount(index) }>delete</button>
            </div>
          )}
        </div>
      </Page>
    )
  }
}

export default UserIndex
