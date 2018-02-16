package com.trentfowler.springreactjs.template;

import org.springframework.data.repository.CrudRepository;

/**
 * Template repository definition. Key piece of the Spring/REST application framework.
 */
public interface CustomRectangleRepository extends CrudRepository<CustomRectangle, Long> {

}
