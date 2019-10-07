import React from 'react'
import * as cm2TechClient from '../../clients/cm2tech'
import Page from './_Page'
import { Table } from 'reactstrap'
import Pagination from '../ui/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPiggyBank, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './UserIndex.scss'
import { USERS_NEW, USERS_EDIT, USERS_BANK_ACCOUNTS_INDEX } from '../../routes'

class UserIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      itemsPerPage: 5,
      totalItems: 0,
      users: [],
    }
  }

  componentDidMount = () => {
    this.loadUsers()
  }

  loadUsers = newPage => {
    let { page, itemsPerPage } = this.state
    page = newPage || page
    cm2TechClient.getUsers(page, itemsPerPage).then(usersResult => {
      this.setState({ page, users: usersResult['hydra:member'], totalItems: usersResult['hydra:totalItems'] })
    })
  }

  tryDeleteUser = userIndex => {
    const user = this.state.users[userIndex]
    if (!window.confirm(`Do you want to delete user ${user.name}`)) return

    cm2TechClient.deleteUser(user.id).then(result => {
      this.loadUsers()
    }).catch(err => {
      console.log(err)
      alert('An error occured while trying to deleting user')
    })
  }

  goToPage = pageNumber => {
    this.loadUsers(pageNumber)
  }

  render () {
    const { page, users, itemsPerPage, totalItems } = this.state


    return (
      <Page title="Users">
        <a className="new-entity-link" href={USERS_NEW()}>+ New user</a>
        <Table>
          <thead>
            <tr>
              <th>name</th>
              <th>CPF</th>
              <th>email</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            { users.map(({ id, name, cpf, email }, index) =>
              <tr key={index}>
                <td>{name}</td>
                <td>{cpf}</td>
                <td>{email}</td>
                <td>
                  <a href={USERS_EDIT(id)}><FontAwesomeIcon icon={faEdit} /></a>
                  <a href={USERS_BANK_ACCOUNTS_INDEX(id)}><FontAwesomeIcon icon={faPiggyBank} /></a>
                  <button className="link-button" onClick={evt => { evt.preventDefault(); this.tryDeleteUser(index) }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination
          page={page}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          goToPage={this.goToPage}
        />
      </Page>
    )
  }
}

export default UserIndex
