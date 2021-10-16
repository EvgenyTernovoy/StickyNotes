const CARD_MODEL = {
  width: 100,
  height: 20,
  value: 'Your best card',
  id: null,
}


export function createCard(width, height, text) {
  return {
    width: width || CARD_MODEL.width,
    height: height || CARD_MODEL.height,
    id: `${Date.now()}`,
    value: text || CARD_MODEL.value,
  }
}
