import AppStorage from '@/storage/index'
import UI from '@/services/ui'
import UseCases from '@/useCases'

class App {
  storage
  UI
  useCases

  constructor() {
    this.storage = new AppStorage()
    this.useCases = new UseCases(this.storage)
    this.UI = new UI(this.storage, this.useCases)
  }

  start() {
    this.UI.init()
  }
}


export default App
