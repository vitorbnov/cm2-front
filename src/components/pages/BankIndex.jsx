import React from 'react'
import * as cm2TechClient from '../../clients/cm2tech'
import Page from './_Page'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class BankIndex extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      banks: []
    }
  }

  componentDidMount = () => {
    cm2TechClient.getBanks().then(banksResult => {
      console.log(banksResult)
      this.setState({ banks: banksResult['hydra:member'] })
    })
  }

  render () {
    const { banks } = this.state

    return (
      <Page title="Banks">
        <ListGroup>
          { banks.map(({ name, number }, index) =>
              <ListGroupItem>
                {number} - {name}
              </ListGroupItem>
          )}
        </ListGroup>
      </Page>
    )
  }
}
