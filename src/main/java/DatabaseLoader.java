package com.trentfowler.springreactjs.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * This class should be added to in order to implement the Spring framework's
 * "CommandLineRunner" interface to override its run() method and indicate
 * when a bean should be run. The example data below should be replaced.
 */
@Component
public class DatabaseLoader implements CommandLineRunner {
    private final CustomRectangleRepository repository;

    @Autowired
    public DatabaseLoader(CustomRectangleRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new CustomRectangle(10, 10, 20, 20));
        this.repository.save(new CustomRectangle(11, 20, 22, 38));
        this.repository.save(new CustomRectangle(10, 12, 22, 32));
        this.repository.save(new CustomRectangle(5, 5, 8, 8));
    }
}
