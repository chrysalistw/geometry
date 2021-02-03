import "./d3.js"
export default geometry
export { Point, LineSegment, Bisector }

//set svg field
//store all geomObj in an array

var geometry = {}
function GeomObj(){
	this.visible = true
}
function Point(x, y){
	//inherit GeomObj
	this.x = x
	this.y = y
}
function LineSegment(p1, p2){
	this.vertex = [p1, p2]
}
function Bisector(ls){
	this.parent = ls
}
