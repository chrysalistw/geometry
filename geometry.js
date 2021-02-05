import "./d3.js"
export { Point, LineSegment, Bisector }
var geometry = {objs: []}
export default geometry

geometry.setField = function(div, w, h){
	geometry.field = d3.select(div).append("svg")
	                   .attr("width",w)
	                   .attr("height",h)
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
class GeomObj {
	constructor(visible){
		this.visible = true
		geometry.objs.push(this)
	}
}
class Point extends GeomObj{
	constructor(x, y){
		super()
		this.x = x
		this.y = y
	}
}
class LineSegment extends GeomObj{
	constructor(p1, p2){
		super()
		this.vertex = [p1, p2]
	}
}
class Bisector extends GeomObj{
	constructor(ls){
		super()
		this.parent = ls
	}
}
