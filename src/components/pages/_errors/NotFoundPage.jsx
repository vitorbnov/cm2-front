import React from 'react'
import Page from '../_Page.jsx'

export default class NotFoundPage extends React.Component {
  componentDidMount = () => {
    // cm2TeachClient.getBankAccounts().then(console.log)
    // console.log('this is', this)
    // console.log('this.props is', this.props)
  }

  render () {
    return (
      <Page>
        <div>NOT FOUND CONTENT</div>
      </Page>
    )
  }
}
