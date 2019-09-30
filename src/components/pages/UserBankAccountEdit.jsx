import React from 'react'
import UserBankAccountEditContent from '../ui/UserBankAccountEditContent.jsx'
import Page from './_Page'

export default ({ match: { params: { userID, bankAccountID }}, ...props}) => {
  return (
    <Page title="Edit user bank account">
      <UserBankAccountEditContent
        userID={userID}
        bankAccountID={bankAccountID}
        {...props}
      />
    </Page>
  )
}

