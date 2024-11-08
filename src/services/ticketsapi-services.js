import { Component } from 'react'

export default class TicketapiService extends Component {
  _baseURL = 'https://aviasales-test-api.kata.academy/'

  _headers = {
    accept: 'application/json',
  }

  async getInfo(url) {
    const response = await fetch(`${this._baseURL}${url}`, {
      method: 'GET',
      headers: this._headers,
    })

    if (response.ok) {
      return await response.json()
    } else if (response.status === 500) {
      return await response.json()
    } else {
      throw new Error(`Нет ответа, статус ошибки ${response.status}`)
    }
  }

  async getSearchId() {
    try {
      const url = 'search'
      const res = await this.getInfo(url)
      return res.searchId
    } catch (err) {
      throw new Error('Ошибка получение ID')
    }
  }

  async getTicketsPack(searchId) {
    const searchStatus = true
    while (searchStatus) {
      try {
        const url = `tickets?searchId=${searchId}`
        const res = await this.getInfo(url)
        return res
      } catch (err) {
        if (!err.status === 500) {
          break
        }
      }
    }
  }
}
