# Spring Framework, React.js Demo/Template

A RESTful Framework/API implementation to allow for the creation of a web UI for a Java backend. 

This project allows communication between the the Java objects running in memory and the web by allowing CRUD operations to be performed on them, e.g. GET/PUT/POST/DELETE. 

Created for personal use but the source code is available to anybody. 

The code itself demos how the parts work together by messing around with properties of rectangles, but the intent is as a working barebones template that can be imported and modified to quickly deploy small single purpose web applications. 

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

I used Node.js to install the dependencies with ```npm``` but all of the dependencies and versions are listed in the ```package.json``` file below. 

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

:warning::warning::warning: jQuery for ```ajax``` call to the REST service which is still a work in progress as of Feb. 24 2018 and not yet functional for editing existing entries

## Installing

1. Download the project: ```git clone https://github.com/trentfowler/spring-reactjs.git```
2. Import into your IDE and select the pom.xml. If you prefer you can also generate your own Mavin file from [https://start.spring.io/](https://start.spring.io/) but going that route you should add these dependencies to your pom.xml file if you are using Java 9. You can read more on that [here](https://stackoverflow.com/questions/43574426/how-to-resolve-java-lang-noclassdeffounderror-javax-xml-bind-jaxbexception-in-j). 

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

Then add the ```spring-boot-devtools``` dependency as well so you don't have to restart Spring after every code change.

```
<dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <optional>true</optional>
</dependency>
```

3. If you are working with your own project file be sure to include the ```application.properties``` file with the following contents: 

```
spring.data.rest.base-path=/api
```

That is needed since the webpage should be accessible from the root, for example by going to ```http://localhost:8080/```, so the REST database should just run beind the scenes from like ```http://localhost:8080/api```. Going to ```http://localhost:8080/api``` will show you the json-esque tree like database. 

```
{
  "_links" : {
    "customRectangles" : {
      "href" : "http://192.168.1.137:8080/api/customRectangles{?page,size,sort}",
      "templated" : true
    },
    "profile" : {
      "href" : "http://192.168.1.137:8080/api/profile"
    }
  }
}
```

Example database: 
![https://i.imgur.com/3KsWXz0.png](https://i.imgur.com/3KsWXz0.png)

Example front end for presenting/manipulating that database: 
![https://i.imgur.com/HrdT6l4.png](https://i.imgur.com/HrdT6l4.png)

## Authors

* **Trent Fowler**
