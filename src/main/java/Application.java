package com.trentfowler.springreactjs.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
 * This project represents a template that is intended for web applications
 * and small personal projects that can be quickly deployed with a java back end.
 *
 * This project relies on the below frameworks/dependencies but could be adapted for
 * use with other frameworks like Java EE, Angular, Gradle, etc.
 *
 * Frameworks/Dependencies:
 *
 * 1. The Spring MVC framework to expose data over REST with spring-data-rest-webmvc.
 * 2. Java Persistence API/JPA including spring-data-jpa/spring-orm/Hibernate
 *    for relational ORM/database.
 * 3. React.js provides the view.
 * 4. Pre-configured Maven repo with spring boot version 1.5.10 and support for java 8/9.
 * 5. Lombok provides getters/setters/toString()/equals() and other template/generated
 *    methods to reduce boilerplate.
 *
 * @author Trent Fowler
 *
 */

/**
 * Application class containing only the main method.
 */
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
