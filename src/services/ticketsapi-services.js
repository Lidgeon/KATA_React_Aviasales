import { Component } from 'react'

export default class TicketapiService extends Component {
  _baseURL = 'https://aviasales-test-api.kata.academy/'

  _headers = {
    accept: 'application/json',
  }

  async getSearchId() {
    const url = 'search'
    try {
      const response = await fetch(`${this._baseURL}${url}`)

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
      }

      const res = await response.json()
      return res.searchId
    } catch (error) {
      if (!this.isServerError(error)) {
        alert(`Ошибка при получении searchId: ${error.message}`)
      }
      return null
    }
  }

  async getTicketsPack(searchId) {
    const url = `tickets?searchId=${searchId}`
    try {
      const response = await fetch(`${this._baseURL}${url}`)

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`)
      }

      const res = await response.json()
      return res
    } catch (error) {
      if (!this.isServerError(error)) {
        alert(`Ошибка при получении билетов: ${error.message}`)
      }
      return { tickets: [], stop: false }
    }
  }

  isServerError(error) {
    return error.message.includes('500') || error.message.includes('Server Error')
  }
}
