import "./d3.js"
//import { Point } from "./gm-point.js"
//import { LineSegment } from "./gm-linesegment.js"
////import { Bisector } from "./gm-bisector.js"
////import { Circle } from "./gm-circle.js"
//import { Circumcenter } from "./gm-circumcenter.js"
////export { /*Point, LineSegment, */Bisector, Circle/*, Circumcenter*/ }

var geometry = {}
geometry.setField = function(div, w, h){
	geometry.field = d3.select(div).append("svg")
	                   .attr("width",w)
	                   .attr("height",h)
}

export default geometry
