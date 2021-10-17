import {newCard} from '@/services/ui/components'
import {CONTAINER_IDS} from '@/constants'
import {STORAGE_EVENTS} from '@/storage'

/*
  All UI logic is here, but it's better to separate it by components
 */
class UIService {
  $cardList
  $trash
  storage
  useCases
  mousePosition
  cardWidthDragActive
  cardWidthDragId

  constructor(storage, useCases) {
    this.storage = storage
    this.useCases = useCases

    this.renderList = this.renderList.bind(this)
    this.init = this.init.bind(this)
    this.trashDropHandler = this.trashDropHandler.bind(this)
    this.onAddFormSubmit = this.onAddFormSubmit.bind(this)
    this.updateCard = this.updateCard.bind(this)
    this.cardWidthDragStart = this.cardWidthDragStart.bind(this)
  }

  renderList() {
    const listModel = this.storage.getEntities('cardList')
    this.$cardList.innerHTML = ''
    listModel.forEach(
        item => {
          const card = newCard(
              item,
              this.cardDragStart,
              this.cardWidthDragStart
          )
          this.$cardList.appendChild(card)
        })
  }

  updateCard({cardId}) {
    const card = document.getElementById(cardId)
    const cardModel = this.storage.getCardById(cardId)

    card.style.width = `${cardModel.width}px`
  }

  trashDropHandler(ev) {
    ev.preventDefault();

    const id = ev.dataTransfer.getData('application/card');
    this.storage.removeCardFromList(id)
  }

  trashDragOverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move'
  }

  cardDragStart(ev) {
    ev.dataTransfer.setData('application/card', ev.target.id);
    ev.dataTransfer.effectAllowed = 'move';
  }

  onAddFormSubmit(ev) {
    ev.preventDefault()

    const width = ev.target.elements['width'].value
    const height = ev.target.elements['height'].value
    const order = ev.target.elements['order'].value
    const text = ev.target.elements['text'].value

    ev.target.elements['width'].value = ''
    ev.target.elements['height'].value = ''
    ev.target.elements['order'].value = ''
    ev.target.elements['text'].value = ''


    this.useCases.createNewCard(width, height, order, text)
  }

  cardWidthDragStart(ev) {
    ev.preventDefault()

    this.mousePosition = ev.clientX
    this.cardWidthDragActive = true

    this.cardWidthDragId = ev.target.parentNode.id
  }

  init() {
    this.$cardList = document.getElementById(CONTAINER_IDS.listId)
    this.$trash = document.getElementById(CONTAINER_IDS.trashId)
    this.$addForm = document.getElementById(CONTAINER_IDS.addCardForm)

    this.$trash.addEventListener('drop', this.trashDropHandler)
    this.$trash.addEventListener('dragover', this.trashDragOverHandler)

    document.addEventListener('mouseup', () => {
      if (!this.cardWidthDragActive) {
        return
      }
      this.cardWidthDragActive = false
      this.mousePosition = null
    })

    document.addEventListener('mousemove', (ev) => {
      if (!this.cardWidthDragActive) {
        return
      }

      const delta = ev.clientX - this.mousePosition
      this.mousePosition = ev.clientX
      this.useCases.updateCardWidth(this.cardWidthDragId, delta)
    })

    this.$addForm.addEventListener('submit', this.onAddFormSubmit)

    this.storage.subscribe(STORAGE_EVENTS.listUpdated, this.renderList)
    this.storage.subscribe(STORAGE_EVENTS.cardUpdated, this.updateCard)
  }
}


export default UIService
