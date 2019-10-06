import React from 'react'
import * as cm2TechClient from '../../clients/cm2tech'
import Page from './_Page'
import { Table } from 'reactstrap'

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

  goToFirstPage = () => {
    this.goToPage(1)
  }

  goToPreviousPage = () => {
    this.goToPage(this.state.page - 1)
  }

  goToNextPage = () => {
    this.goToPage(this.state.page + 1)
  }

  goToLastPage = () => {
    this.goToPage(Math.floor(this.state.totalItems / this.state.itemsPerPage))
  }

  render () {
    const { page, users, itemsPerPage, totalItems } = this.state

    // Pagination generation
    const firstPage = 1
    const lastPage = Math.floor(totalItems / itemsPerPage) + (totalItems % itemsPerPage > 0 ? 1 : 0)

    const isFirstPage = page === firstPage
    const isLastPage = page === lastPage

    return (
      <Page title="Users">
        <a href="/users/new">+ New user</a>
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
                  <a href={`/users/${id}/edit`}>edit</a> <a href={`/users/${id}/bank_accounts`}>bank accounts</a>
                  <button onClick={evt => { evt.preventDefault(); this.tryDeleteUser(index) }}>delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div>
          <button onClick={this.goToFirstPage} disabled={isFirstPage}>&lt;&lt;</button>
          <button onClick={this.goToPreviousPage} disabled={isFirstPage}>&lt;</button>
          {[-2, -1, 0, 1, 2].map(offset => {
            if (page + offset < firstPage || page + offset > lastPage) return null
            return <button key={page + offset} onClick={() => this.goToPage(page + offset)} disabled={offset === 0}>{page + offset}</button>
          })}
          <button onClick={this.goToNextPage} disabled={isLastPage}>&gt;</button>
          <button onClick={this.goToLastPage} disabled={isLastPage}>&gt;&gt;</button>
        </div>
      </Page>
    )
  }
}

export default UserIndex
