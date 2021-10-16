export const LIST_MODEL = []

export function addCardToList(list, card, order) {
  if (!order) {
    return [...list, card]
  }

  const normalizedOrder = Number(order) - 1

  const start = list.slice(0, normalizedOrder)
  const end = list.slice(normalizedOrder)

  return [...start, card, ...end]
}

export function getCardById(list, id) {
  return list.find(item => item.id === id)
}
