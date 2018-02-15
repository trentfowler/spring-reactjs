package com.trentfowler.springreactjs.template;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This class is marked with the @Controller flag and is the Spring MVC Controller.
 */
@Controller
public class HomeController {

    /* Flags index() method to support the document root. Spring
     * autoconfigured view resolver will map to
     * src/main/resources/templates/index.html.
     */
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    // Add additional mappings here.

}