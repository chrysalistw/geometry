import "./d3.js"
import { GeomObj } from "./geometry-object.js"
//import { Point } from "./geometry-point.js"
import { LineSegment } from "./geometry-linesegment.js"
import { Bisector } from "./geometry-bisector.js"
import { Circle } from "./geometry-circle.js"
//import { Circumcenter } from "./geometry-circumcenter.js"
export { /*Point, */LineSegment, Bisector, Circle/*, Circumcenter*/ }
var geometry = {}
export default geometry

geometry.setField = function(div, w, h){
	geometry.field = d3.select(div).append("svg")
	                   .attr("width",w)
	                   .attr("height",h)
	GeomObj.field = geometry.field
}
