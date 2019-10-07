import React from 'react'
import { Table } from 'reactstrap'
import * as cm2TechClient from '../../clients/cm2tech'
import Page from './_Page'
import NotFoundPage from './_errors/NotFoundPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

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
        <a href={`/users/${userID}/bank_accounts/new`}>New account</a>
        <Table>
          <thead>
            <tr>
              <th>Acc name</th>
              <th>Acc number</th>
              <th>Acc digit</th>
              <th>Acc type</th>
              <th>Ag</th>
              <th>Ag digit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { bankAccounts.map(({ id, accountName, accountNumber, accountDigit, accountType, agency, agencyDigit }, index) =>
              <tr key={index}>
                <td>{accountName}</td>
                <td>{accountNumber}</td>
                <td>{accountDigit}</td>
                <td>{accountType}</td>
                <td>{agency}</td>
                <td>{agencyDigit}</td>
                <td>
                  <a href={`/users/${userID}/bank_accounts/${id}/edit`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </a>
                  <button className="link-button" onClick={() => this.tryDeleteBankAccount(index) }>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Page>
    )
  }
}

export default UserIndex
