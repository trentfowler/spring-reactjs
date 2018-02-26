package com.trentfowler.springreactjs.template;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Spring controller for the project.
 *
 */
@Controller
@RequestMapping("/api/customRectangles/add")
public class CustomRectangleController {

    /* Flags index method to support the document root. Spring
     * autoconfigured view resolver will map to
     * src/main/resources/templates/index.html.
     */
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    /* Handles the ajax request and returns the json response. @ResponseBody
     * converts customRectangle object into json response object.
     */
    @RequestMapping(
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public @ResponseBody CustomRectangle add(HttpServletRequest request,
             HttpServletResponse response) throws Exception {
        CustomRectangle customRectangle = new CustomRectangle();

        String x1 = request.getParameter("x1");
        String y1 = request.getParameter("y1");
        String x2 = request.getParameter("x2");
        String y2 = request.getParameter("y2");

        customRectangle.setX1(x1);
        customRectangle.setY1(y1);
        customRectangle.setX2(x2);
        customRectangle.setY2(y2);

        return customRectangle;
    }
}
