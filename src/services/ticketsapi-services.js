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

  async getTickets(filters) {
    //console.log('Фильтры! ', filters)
    const searchId = await this.getSearchId()
    const url = `tickets?searchId=${searchId}`
    const tickets = []
    let continueFetching = true
    // if (filters.length === 0) {
    //   continueFetching = false
    // }
    while (continueFetching) {
      try {
        const res = await this.getInfo(url)
        if (res.stop === false) {
          const filterTickets = res.tickets.filter((res) => {
            if (
              filters.includes('Без пересадок') &&
              !filters.includes('1 пересадка') &&
              !filters.includes('2 пересадки') &&
              !filters.includes('3 пересадки')
            ) {
              //console.log('Фильтр без пересадки работает')
              return res.segments[0].stops.length === 0 && res.segments[1].stops.length === 0
            } else if (
              filters.includes('1 пересадка') &&
              !filters.includes('2 пересадки') &&
              !filters.includes('3 пересадки')
            ) {
              //console.log('Фильтр 1 пересадка работает')
              return res.segments[0].stops.length <= 1 && res.segments[1].stops.length <= 1
            } else if (filters.includes('2 пересадки') && !filters.includes('3 пересадки')) {
              //console.log('Фильтр 2 пересадки работает')
              return res.segments[0].stops.length <= 2 && res.segments[1].stops.length <= 2
            } else if (filters.includes('3 пересадки')) {
              //console.log('Фильтр 3 пересадки работает')
              return res.segments[0].stops.length <= 3 && res.segments[1].stops.length <= 3
            } else {
              return res
            }
          })
          tickets.push(...filterTickets)
        } else {
          break
        }
      } catch (error) {
        break
      }
    }
    return tickets
  }
}
