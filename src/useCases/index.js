import {createCard} from '@/models/card'
import {addCardToList, getCardById} from '@/models/cardList'

class UseCases {
  storage

  constructor(storage) {
    this.storage = storage

    this.createNewCard = this.createNewCard.bind(this)
    this.updateCard = this.updateCardWidth.bind(this)
  }

  createNewCard(width, height, order, text) {
    const newCard = createCard(width, height, text)
    const currentList = this.storage.getEntities('cardList')
    const newList = addCardToList(currentList, newCard, order)

    this.storage.updateList(newList)
  }

  updateCardWidth(cardId, delta) {
    const list = this.storage.getEntities('cardList')
    const card = getCardById(list, cardId)

    const newCard = {...card, width: card.width + delta}

    this.storage.updateCard(cardId, newCard)
  }
}

export default UseCases
