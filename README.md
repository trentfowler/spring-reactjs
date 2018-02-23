# Spring Framework, React.js Demo/Template

Re-creates a RESTful Framework/API to allow for the creation of a dynamic web application with a Java back end. This project was made for personal use but the code is available to anybody. 

The project is basically a demo showing how the parts work together by messing around with rectangles, but all that it really is is a barbones template that is meant to be imported and modified so that I may quickly deploy small single purpose web applications. 

Highlights of this project include: 

* [Spring Framework](https://projects.spring.io/spring-framework/#quick-start)
* [Hibernate](http://hibernate.org/orm/)
* [React.js](https://reactjs.org/)
* [Semantic UI React](https://react.semantic-ui.com/usage)
* [Maven](https://maven.apache.org/)
* [Lombok](https://projectlombok.org/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)

## Requirements

I used Node.js to install the dependencies with ```npm``` but all dependencies and versions are list in the ```package.json``` file below. I use jquery for the ```ajax``` command which I have the easiest time with when making CRUD requests. 

```javascript
  "devDependencies": {
    "babel": "^6.23.0",
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^6.4.1",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "create-react-class": "^15.6.3",
    "jquery": "^3.3.1",
    "@types/node": "^9.4.6",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "rest": "^2.0.0",
    "webpack": "^1.15.0",
    "semantic-ui-css": "^2.3.0",
    "semantic-ui-react": "^0.78.2",
    "css-loader": "^0.28.9",
    "file-loader": "^1.1.9",
    "style-loader": "^0.20.2",
    "url-loader": "^0.6.2",
    "toastr": "^2.1.4"
  }
```

## Installing

1. Download the project: ```git clone https://github.com/trentfowler/spring-reactjs.git```
2. Import into your IDE and select the pom.xml. If you prefer you can also generate your own Mavin file from [https://start.spring.io/](https://start.spring.io/) but going that route you should add these dependencies to your pom.xml file if you are using Java 9. 

```
<dependency>
            <groupId>javax.xml.bind</groupId>
            <artifactId>jaxb-api</artifactId>
            <version>2.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.persistence</groupId>
            <artifactId>eclipselink</artifactId>
            <version>2.7.0</version>
		</dependency>
```
You can read more on that [here](https://stackoverflow.com/questions/43574426/how-to-resolve-java-lang-noclassdeffounderror-javax-xml-bind-jaxbexception-in-j). 

And go ahead and add the Spring dev tools dependencies as well so you don't have to restart after each change: 

```
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <optional>true</optional>
</dependency>
```
3. If you are working with your own product file don't forget to include the ```application.properties``` file with the following contents: 
```javascript
spring.data.rest.base-path=/api
```
That's because your webpage will be accessible from the root ```/``` and the REST database should run beind the scense like from ```/api```. So, for example, you might access your front end by going to ```http://localhost:8080/``` and your REST back end will run behind the scenes at ```http://localhost:8080/api``` and will have a HAL or json-esque tree like scructure that the front end can pull from. 

Example database: 
![https://i.imgur.com/3KsWXz0.png](https://i.imgur.com/3KsWXz0.png)

Example front end for presenting/manipulating that database: 
![https://i.imgur.com/HrdT6l4.png](https://i.imgur.com/HrdT6l4.png)

## Authors

* **Trent Fowler**
