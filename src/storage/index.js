import {LIST_MODEL} from '@/models/cardList'

export const STORAGE_EVENTS = {
  listUpdated: 'listUpdated',
  cardUpdated: 'cardUpdated',
}

class Storage {
  storage
  subscribes

  constructor() {
    this.storage = {
      cardList: LIST_MODEL,
    }
    this.subscribes = {}

    this.removeCardFormList = this.removeCardFormList.bind(this)
  }

  updateList(newList) {
    this.storage.cardList = newList
    this.fireEvent(STORAGE_EVENTS.listUpdated)
  }

  updateCard(id, newCard) {
    const newList = this.storage.cardList.map(item => {
      if (item.id !== id) {
        return item
      }
      return newCard
    })

    this.storage.cardList = newList

    this.fireEvent(STORAGE_EVENTS.cardUpdated, {cardId: id})
  }

  removeCardFormList(cardId) {
    const newList = this.storage.cardList.filter(item => item.id !== cardId)
    this.updateList(newList)
  }

  getEntities(entities) {
    return this.storage[entities]
  }

  getCardById(id) {
    return this.storage.cardList.find(item => item.id === id)
  }

  subscribe(event, fn) {
    const handlerList = this.subscribes[event] || []
    this.subscribes[event] = [...handlerList, fn]
  }

  fireEvent(event, payload) {
    const handlerList = this.subscribes[event] || []
    handlerList.forEach(fn => fn(payload))
  }
}

export default Storage
