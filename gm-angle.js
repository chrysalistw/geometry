import gm from "./geometry.js"

class Angle{
	constructor(v, a, b){
		this.v = v
		this.a = a
		this.b = b
		v.child.push(this)
		a.child.push(this)
		b.child.push(this)
		this.child = []	
	}
	update(){
		//console.log(this.measure()+" degrees")
	}
	show(){
		
	}
}
Angle.prototype.measure = function(){
	let ax = this.a.x-this.v.x
	let ay = this.a.y-this.v.y
	let bx = this.b.x-this.v.x
	let by = this.b.y-this.v.y
	let la2 = ax*ax+ay*ay
	let lb2 = bx*bx+by*by
	return Math.acos((ax*bx+ay*by)/Math.sqrt(la2*lb2))*(180/Math.PI)
}

export default Angle
