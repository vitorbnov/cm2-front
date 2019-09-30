import React from 'react'
import Page from './_Page.jsx'

export default class Home extends React.Component {
  render () {
    return (
      <Page title="Homepage">
        <p>Welcome to homepage</p>
        <p>Start navigating to <b>/users</b> page (click on green bar) an you will se what waits you :)</p>
      </Page>
    )
  }
}
