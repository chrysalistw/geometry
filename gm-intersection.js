import gm from "./geometry.js"
import Point from "./gm-point.js"

class Intersection extends Point{
	constructor(ls1, ls2){
		super()
		this.l = ls1
		this.m = ls2
		this.x = x(ls1, ls2)
		this.y = y(ls1, ls2)
		ls1.child.push(this)
		ls2.child.push(this)
		this.child = []	
		if(this.constructor.name==="Intersection")
			this.show()
	}
	update(){
		this.x = x(this.l, this.m)
		this.y = y(this.l, this.m)
		d3.select(this.element)
		  .attr("cx", this.x)
		  .attr("cy", this.y)
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		let thePoint = this
		d3.select(document.getElementsByTagName("svg")[0])
			.append("circle")
			  .attr("r", 7)
			  .attr("cx", this.x)
			  .attr("cy", this.y)
			.attr("fill", "yellow")
			.attr("stroke", "black")
			.call(
				d=>{this.element=d._groups[0][0]}
			)
	}
}

function det(a, b, c, d){
	return a*d-b*c
}
function t(l, m){
	let x1 = l.v0.x, y1 = l.v0.y
	let x2 = l.v1.x, y2 = l.v1.y
	let x3 = m.v0.x, y3 = m.v0.y
	let x4 = m.v1.x, y4 = m.v1.y
	return det(x1-x3, x3-x4, y1-y3, y3-y4)/det(x1-x2, x3-x4, y1-y2, y3-y4)
}
function x(l, m){
	return l.v0.x+t(l,m)*(l.v1.x-l.v0.x)
}
function y(l, m){
	return l.v0.y+t(l,m)*(l.v1.y-l.v0.y)
}

export default Intersection
