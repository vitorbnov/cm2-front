import React from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import * as cm2TechClient from '../../clients/cm2tech'

class UserNew extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: '',
      name: '',
      email: '',
      cpf: ''
    }
  }

  componentDidMount () {
    const { userID } = this.props

    if (!userID) return

    this.loadUser(userID)
  }

  loadUser = userId => {
    cm2TechClient.getUser(userId).then(({ id, name, email, cpf }) => {
      this.setState({ id, name, email, cpf })
    })
  }

  redirectToUsersListing = () => {
    this.props.history.push(`/users`)
  }

  redirectToNewUserBankAccount = userId => {
    this.props.history.push(`/users/${userId}/bank_accounts/new`)
  }

  onChangeName = evt => this.setState({ name: evt.target.value })
  onChangeEmail = evt => this.setState({ email: evt.target.value })
  onChangeCPF = evt => this.setState({ cpf: evt.target.value })

  onSubmitUser = evt => {
    evt.preventDefault()
    const { id, name, email, cpf } = this.state

    const isUpdatingUser = !!id

    cm2TechClient[isUpdatingUser ? 'updateUser' : 'createUser']({ id, name, cpf, email }).then(({ id }) => {
      isUpdatingUser
        ? this.redirectToUsersListing()
        : this.redirectToNewUserBankAccount(id)
    }).catch(err => {
      alert('An Error occured on submitting user data')
    })
  }

  render () {
    const { name, email, cpf } = this.state
    const isFormInvalid = !name || !email || !cpf

    return (
      <Form onSubmit={this.onSubmitUser}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" className="input" value={name} onChange={this.onChangeName} placeholder="Type name here..." />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" className="input" value={email} onChange={this.onChangeEmail} placeholder="Type email here..." />
        </FormGroup>
        <FormGroup>
          <Label for="cpf">CPF</Label>
          <Input type="text" name="cpf" id="cpf" className="input" value={cpf} onChange={this.onChangeCPF} placeholder="Type cpf here..." />
        </FormGroup>
        <FormGroup className="submit">
          <Input type="submit" value="Submit" className="input" disabled={isFormInvalid} />
        </FormGroup>
      </Form>
    )
  }
}

export default UserNew
