## What functionality is available in the application

1. Create a new note of the specified size at the specified position and specified text.
2. Change note width by dragging.
3. Remove a note by dragging it over a predefined "trash" zone.

## How to start app
You should just install deps and start bundler

* npm install
* npm start

## Architecture description

App sliced on layers. There are three levels of layers.

* The first layer is responsible for the domain. Here we can describe our models. We can also define functions and classes 
 can work with our model. This layer has no dependencies.

    Entities: `src/models`


* The second layer is application layer which contains useCases.

  The use cases are the processes that can be triggered in our application core by user interfaces.

  Use case includes logic which can use our domain logic and invoke needed side effects, 
e.g. save data to storage or invoke some external api.
A common case is to use it for some event handlers.

  Entities: `src/useCases`


* The third layer is layer of external services. There are located our storage, UI library and e.g. REST API.

  Entities: 

  `src/storage`
  `src/services`


Also, we use simple DI. When we initialize our app we pass needed services into constructor:

```
    this.storage = new AppStorage()
    this.useCases = new UseCases(this.storage)
    this.UI = new UI(this.storage, this.useCases)
```

Actually for use all power of the architecture we should use TypeScript and its interfaces. 

By following this approach we would have less coupling and more cohesion.

For clarity, the files are divided into layers, but a more efficient way is to divide them by function.
