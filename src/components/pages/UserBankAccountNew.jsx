import React from 'react'
import UserBankAccountEditContent from '../ui/UserBankAccountEditContent.jsx'
import Page from './_Page'

export default ({ match: { params: { userID }}, ...props }) => {
  return (
    <Page title="New user bank account">
      <UserBankAccountEditContent
        userID={userID}
        {...props}
      />
    </Page>
  )
}
