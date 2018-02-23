package com.trentfowler.springreactjs.template;

import lombok.*;
import javax.persistence.*;

/*
 * This class is intended to be removed. For this template, it is
 * used to create objects to store in relational databases and to
 * represent visually with React.js.
 */

/**
 * Defines a rectangle by the index of the bottom left corner (x1, y1) and
 * the index of the top right corner (x2, y2). Uses a different representation
 * than java.awt.rectangle class which uses width, height, and (x, y) coordinates
 * of the upper-left corner.
 *
 */
@Data
@Entity
public class CustomRectangle {

    private @Id @GeneratedValue Long id;

    @Getter @Setter private int x1 = 0;
    @Getter @Setter private int y1 = 0;
    @Getter @Setter private int x2 = 0;
    @Getter @Setter private int y2 = 0;

    /**
     * Constructor defines a rectangle, must provide bottom left corner
     * indices (x1, y1) and top right corner indices (x2, y2).
     *
     * @param x1 Integer, X-value of the bottom left corner on X-Y coordinate axis.
     * @param y1 Integer, Y-value of the bottom left corner on X-Y coordindate axis.
     * @param x2 Integer, X-value of the top right corner on X-Y coordinate axis.
     * @param y2 Integer, Y-value of the top right corner on X-Y coordinate axis.
     */
    public CustomRectangle(int x1, int y1, int x2, int y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    /**
     * Default constructor, sets bottom left corner to (0, 0) and sets top
     * right corner to (0,0).
     */
    public CustomRectangle() { }

    /**
     * String representation of rectangle object.
     *
     * @return String representation of a rectangle.
     */
    @Override public String toString() {
        return String.format(
                "Rectangle with bottom left corner at (%d, %d) and top " +
                "right corner at (%d, %d)", this.x1, this.y1, this.x2, this.y2);
    }

}
