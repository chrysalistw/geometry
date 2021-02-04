import "./d3.js"
export default geometry
export { Point, LineSegment, Bisector }

//set svg field

var geometry = {}
class GeomObj {
	constructor(visible){
		this.visible = true
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
