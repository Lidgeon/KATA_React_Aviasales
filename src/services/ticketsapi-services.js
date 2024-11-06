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

    if (!response.ok) {
      throw new Error(`Нет ответа, статус ошибки ${response.status}`)
    }
    return await response.json()
  }

  async getSearchId() {
    const url = 'search'
    const res = await this.getInfo(url)
    return res.searchId
  }

  async getTicketsPack() {
    const searchId = await this.getSearchId()
    let res
    try {
      const url = `tickets?searchId=${searchId}`
      res = await this.getInfo(url)
      return res
    } catch (err) {
      return (res = { tickets: [], stop: true })
    }
  }
}
