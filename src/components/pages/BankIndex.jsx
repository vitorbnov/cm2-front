import React from 'react'
import * as cm2TechClient from '../../clients/cm2tech'
import Page from './_Page'

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
        { banks.map(({ id, name, number }, index) =>
          <div key={index}>{number} - {name} ({id})</div>
        )}
      </Page>
    )
  }
}
