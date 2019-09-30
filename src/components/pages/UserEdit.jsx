import React from 'react'
import UserEditContent from '../ui/UserEditContent.jsx'
import Page from './_Page'

export default ({ match: { params: { userID }}, ...props }) => {
  return (
    <Page title="Edit user">
      <UserEditContent
        userID={userID}
        {...props}
      />
    </Page>
  )
}
