import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import * as cm2TechClient from '../../clients/cm2tech'
import accountTypes from '../../consts/account-types'
import { parseBankID, formatUserID, formatBankID, isDigit, isValidNumber } from '../../helpers'
import { USERS_BANK_ACCOUNTS_INDEX } from '../../routes'

class UserBankAccountEdit extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      accountName: '',
      agency: '',
      agencyDigit: '',
      accountNumber: '',
      accountDigit: '',
      accountType: '',
      bankID: '',
      bankOptions: []
    }
  }

  componentDidMount = () => {
    const { bankAccountID } = this.props

    this.loadBanks()

    if (!bankAccountID) return

    this.setState({ bankAccountID })
    this.loadBankAccount(bankAccountID)
  }

  loadBanks = () => {
    cm2TechClient.getBanks().then(banksResult => {
      const bankOptions = banksResult['hydra:member'].map(bank => ({
        label: `${bank.number} - ${bank.name}`,
        value: bank.id,
      }))

      this.setState({ bankOptions })
    })
  }

  loadBankAccount = bankAccountID => {
    cm2TechClient.getBankAccount(bankAccountID).then(accountsResult => {
      const { accountName, agency, agencyDigit, accountNumber, accountDigit, accountType, bank } = accountsResult
      this.setState({ accountName, agency, agencyDigit, accountNumber, accountDigit, accountType, bankID: parseBankID(bank) })
    }).catch(console.log)
  }

  onChangeAccountName = evt => this.setState({ accountName: evt.target.value })
  onChangeAgency = evt => this.setState({ agency: evt.target.value })
  onChangeAgencyDigit = evt => this.setState({ agencyDigit: evt.target.value })
  onChangeAccountNumber = evt => this.setState({ accountNumber: evt.target.value })
  onChangeAccountDigit = evt => this.setState({ accountDigit: evt.target.value })
  onChangeAccountType = evt => this.setState({ accountType: evt.target.value })
  onChangeBank = evt => this.setState({ bankID: evt.target.value })

  onSubmitBankAccount = evt => {
    evt.preventDefault()

    const { accountName, agency, agencyDigit, accountNumber, accountDigit, accountType, bankID } = this.state
    const { userID, bankAccountID } = this.props

    const user = formatUserID(userID)
    const bank = formatBankID(bankID)

    cm2TechClient[bankAccountID ? 'updateBankAccount': 'createBankAccount']({ id: bankAccountID, accountName, agency, agencyDigit, accountNumber, accountDigit, accountType, bank, user }).then(result => {
      this.props.history.push(USERS_BANK_ACCOUNTS_INDEX(userID))
    }).catch(err => {
      console.log(err)
      alert('An error has occurred')
    })
  }

  render () {
    const { accountName, agency, agencyDigit, accountNumber, accountDigit, accountType, bankID, bankOptions } = this.state
    const isFormInvalid =
      !accountName ||
      !agency ||
      !isDigit(agencyDigit) ||
      !isValidNumber(accountNumber) ||
      !isDigit(accountDigit) ||
      !accountTypes[accountType] ||
      !bankID

    return (
      <Form onSubmit={this.onSubmitBankAccount}>
        <FormGroup>
          <Label for="accountName">Account name</Label>
          <Input type="text" name="accountName" className="input" id="accountName" value={accountName} onChange={this.onChangeAccountName} placeholder="Type Account name here..." />
        </FormGroup>
        <FormGroup>
          <Label for="agency">Agency</Label>
          <Input type="agency" name="agency" className="input" id="agency" value={agency} onChange={this.onChangeAgency} placeholder="Type Agency here..." />
        </FormGroup>
        <FormGroup>
          <Label for="agencyDigit">Agency digit</Label>
          <Input type="text" name="agencyDigit" className="input" id="agencyDigit" value={agencyDigit} onChange={this.onChangeAgencyDigit} placeholder="Type Agency digit here..." />
        </FormGroup>
        <FormGroup>
          <Label for="accountNumber">Account number</Label>
          <Input type="text" name="accountNumber" className="input" id="accountNumber" value={accountNumber} onChange={this.onChangeAccountNumber} placeholder="Type Account number here..." />
        </FormGroup>
        <FormGroup>
          <Label for="accountDigit">Account digit</Label>
          <Input type="text" name="accountDigit" className="input" id="accountDigit" value={accountDigit} onChange={this.onChangeAccountDigit} placeholder="Type Account digit here..." />
        </FormGroup>
        <FormGroup>
          <Label for="accountType">Account type</Label>
          <Input type="select" name="accountType" className="input" id="accountType" value={accountType} onChange={this.onChangeAccountType} placeholder="Type Account type here...">
            <option value=""> -- </option>
            { Object.keys(accountTypes).map(type =>
              <option key={type} value={type}>{type}</option>
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="bank">Bank</Label>
          <Input type="select" name="bank" className="input" id="bank" value={bankID} onChange={this.onChangeBank} placeholder="Type bank here...">
            <option value=""> -- </option>
            { bankOptions.map(({ label, value }) =>
              <option key={value} value={value}>{label}</option>
            )}
          </Input>
        </FormGroup>
        <FormGroup className="submit">
          <Input type="submit" value="Submit" className="input" disabled={isFormInvalid} />
        </FormGroup>
      </Form>
    )
  }
}

export default UserBankAccountEdit
