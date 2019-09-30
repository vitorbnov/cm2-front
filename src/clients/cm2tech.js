import axios from 'axios'

// Creates an axios instance
const _instance = axios.create({
  baseURL: process.env.REACT_APP_CM2_TECH_API_BASE_URL
})

// Do requests to API
const _request = async (method, path, { params, data } = {}) => {
  const options = {
    method,
    params,
    data,
    url: path
  }

  const response = await _instance.request(options)
  return response.data
}


/** Banks */
/** GET /banks */
export const getBanks = () => {
  return _request('get', '/banks')
}

/** Bank Accounts */
/** GET /bank_accounts */
export const getBankAccounts = () => {
  return _request('get', '/bank_accounts')
}

/** POST /bank_accounts */
export const createBankAccount = ({ accountName, accountNumber, accountDigit, accountType, agency, agencyDigit, user, bank }) => {
  const data = { accountName, accountNumber, accountDigit, accountType, agency, agencyDigit, user, bank }
  return _request('post', '/bank_accounts', { data })
}

/** GET /bank_accounts/{id} */
export const getBankAccount = id => {
  return _request('get', `/bank_accounts/${id}`)
}

/** PUT /bank_accounts/{id} */
export const updateBankAccount = ({ id, accountName, accountNumber, accountDigit, accountType, agency, agencyDigit, user, bank }) => {
  const data = { accountName, accountNumber, accountDigit, accountType, agency, agencyDigit, user, bank }
  return _request('put', `/bank_accounts/${id}`, { data })
}

/** DELETE /bank_accounts/{id} */
export const deleteBankAccount = id => {
  return _request('delete', `/bank_accounts/${id}`)
}




/** Users */
/** GET /users */
export const getUsers = (page = 1, itemsPerPage = 5) => {
  const params = { page, itemsPerPage }
  return _request('get', '/users', { params })
}

/** POST /users */
export const createUser = ({ name, cpf, email }) => {
  const data = { name, cpf, email }
  return _request('post', '/users', { data })
}

/** GET /users/{id} */
export const getUser = userID => {
  return _request('get', `/users/${userID}`)
}

/** PUT /users/{id} */
export const updateUser = ({ id, name, cpf, email, bankAccounts }) => {
  const data = { name, cpf, email, bankAccounts }
  return _request('put', `/users/${id}`, { data })
}

/** DELETE /users/{id} */
export const deleteUser = id => {
  return _request('delete', `/users/${id}`)
}

/** GET /users/{id}/bank_accounts */
export const getUserBankAccounts = userID => {
  return _request('get', `/users/${userID}/bank_accounts`)
}

