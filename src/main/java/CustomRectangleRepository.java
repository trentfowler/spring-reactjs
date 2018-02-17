package com.trentfowler.springreactjs.template;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Template repository definition. Key piece of the Spring/REST application framework.
 */
public interface CustomRectangleRepository extends PagingAndSortingRepository<CustomRectangle, Long> {

}
