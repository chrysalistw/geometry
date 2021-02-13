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
}
