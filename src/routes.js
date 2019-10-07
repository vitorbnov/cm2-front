export const HOME = () => '/'
export const BANKS_INDEX = () => '/banks'
export const USERS_INDEX = () => '/users'
export const USERS_NEW = () => '/users/new'
export const USERS_EDIT = (userID = ':userID') => `/users/${userID}/edit`
export const USERS_BANK_ACCOUNTS_INDEX = (userID = ':userID') => `/users/${userID}/bank-accounts`
export const USERS_BANK_ACCOUNTS_NEW = (userID = ':userID') => `/users/${userID}/bank-accounts/new`
export const USERS_BANK_ACCOUNTS_EDIT = (userID = ':userID', bankAccountID = ':bankAccountID') => `/users/${userID}/bank-accounts/${bankAccountID}/edit`
