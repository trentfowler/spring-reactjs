package com.trentfowler.springreactjs.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Random;

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
        Random rand = new Random();
        int i = 0;
        while (i < 100) {
            int x1 = rand.nextInt(25);
            int x2 = x1 + rand.nextInt(25 - x1);
            int y1 = rand.nextInt(25);
            int y2 = y1 + rand.nextInt(25 - y1);
            this.repository.save(new CustomRectangle(x1, x2, y1, y2));
            i++;
        }
    }
}
