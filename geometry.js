import "./d3.js"
import { GeomObj } from "./geometry-object.js"
import { Point } from "./geometry-point.js"
import { LineSegment } from "./geometry-linesegment.js"
import { Bisector } from "./geometry-bisector.js"
import { Circle } from "./geometry-circle.js"
export { Point, LineSegment, Bisector, Circle }
var geometry = {}
export default geometry

geometry.setField = function(div, w, h){
	geometry.field = d3.select(div).append("svg")
	                   .attr("width",w)
	                   .attr("height",h)
	GeomObj.field = geometry.field
}
geometry.update = function(){
	geometry.field.selectAll("circle")
		.data(geometry.objs.filter(
			o=>o.__proto__.constructor.name==="Point"
		)).enter()
		.append("circle")
		  .attr("r", 5)
		  .attr("cx", d=>d.x)
		  .attr("cy", d=>d.y)
		  .attr("fill", "yellow")
		  .attr("stroke", "black")
}
