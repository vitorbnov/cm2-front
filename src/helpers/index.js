
export const formatUserID = userID => `/users/${userID}`
export const formatBankID = bankID => `/banks/${bankID}`

export const parseUserID = userPath => userPath.replace('/users/', '')
export const parseBankID = bankPath => bankPath.replace('/banks/', '')

export const isDigit = number => !isNaN(Number(number)) && number.length === 1
export const isValidNumber = number => !isNaN(Number(number))
