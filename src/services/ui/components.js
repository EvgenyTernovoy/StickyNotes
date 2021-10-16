export const newCard = (
    {value, id, width, height},
    dragStart,
    widthDragStart
) => {
  const widthDrag = document.createElement('div')
  widthDrag.classList.add('card-width-drag')

  widthDrag.addEventListener('mousedown', widthDragStart)

  const card = document.createElement('div')
  card.classList.add('card')
  card.id = id
  card.innerHTML = value || 'Card'
  card.draggable = true
  card.style.width = `${width}px`
  card.style.height = `${height}px`

  card.appendChild(widthDrag)
  card.addEventListener('dragstart', dragStart)

  return card
}

