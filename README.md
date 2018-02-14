# Template that uses the Spring framework to allow for a java codebase and React.js to allow for a flexible web front end UI

This project is intended to be imported and modified. Combines the Spring Boot framework to provide RESTful access to a Java codebase on the back end, Hibernate/Java Persistence API database for persistence, and a javascript web front end with React.js. 

### Prerequisites/Dependencies

This project uses the resources below but could be adapted to suit other needs. For example, Java EE instead of Spring, Angular.js instead of React.js, Gradle instead of Maven, etc. 

* [Spring Boot](https://projects.spring.io/spring-framework/#quick-start) - To expose data over REST with spring-data-rest-webmvc. 
* [Hibernate JPA](http://hibernate.org/orm/) - Java Persistence API (JPA) implementation that works with spring-data-jpa/spring-orm to provide a relational database/ORM that is accessible for HTTP CRUD-like operations (GET, POST, PUT, DELETE and so on). 
* [Maven](https://maven.apache.org/) - Pre-configured Maven repo. 
* [Lombok](https://projectlombok.org/) - Provides getters/setters and other template/generated methods to reduce boilerplate. 
