export { GeomObj, objs }

var objs = []
class GeomObj {
	set field(f){
		this.field = f
	}
	constructor(visible){
		this.visible = true
		objs.push(this)
	}
	attachToLS(ls){ // attach to a line segment
		console.log(this.x, this.y)
		//project this to line segment
		this.update(125, this.y)	
	}
}
