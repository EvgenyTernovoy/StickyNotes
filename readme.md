## How to start app
You should just install deps and start bundler

* npm install
* npm start

## Architecture description

App sliced on layers. There are three levels of layers.

* The first layer is responsible for the domain. Here we can describe our models. We can also define functions and classes 
 can work with our model. This layer has no dependencies.

    Entities: `src/models`


* Second layer is application layer which contains useCases.

  The use cases are the processes that can be triggered in our application core by user Interfaces.

  Use case includes logic which can use our domain logic and invoke needed side effects, 
e.g. save data to storage or invoke some external api.
A common case is to use it for some event handlers.

  Entities: `src/useCases`


* Third layer is layer of external services. There are located our storage, UI library and e.g. REST API.

Entities: 

`src/storage`
`src/services`


Also, we use simple DI. When we initialize our app we pass needed services into constructor:

```
    this.storage = new AppStorage()
    this.useCases = new UseCases(this.storage)
    this.UI = new UI(this.storage, this.useCases)
```

Actually for use all power this architecture we should use TypeScript and their interfaces. 

Following this approach we would have less coupling and more cohesion.

Also, we can separate our file in different way, e.g. separate it by features. 
