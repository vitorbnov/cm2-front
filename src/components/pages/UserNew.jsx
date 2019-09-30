import React from 'react'
import UserEditContent from '../ui/UserEditContent.jsx'
import Page from './_Page'

export default props => {
  return (
    <Page title="New user">
      <UserEditContent {...props} />
    </Page>
  )
}
