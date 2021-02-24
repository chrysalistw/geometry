//import { Point } from "./geometry-point.js"
import Point from "./geometry-point.js"
export { Circumcenter }

class Circumcenter extends Point{
	constructor(a, b, c){
		super()
		this.a = a
		this.b = b
		this.c = c
		this.x = x(a, b, c)
		this.y = y(a, b, c)
		this.child = []
		a.child.push(this)
		b.child.push(this)
		c.child.push(this)
		if(this.constructor.name==="Circumcenter")
			this.show()
	}
	update(){
		this.x = x(this.a, this.b, this.c)
		this.y = y(this.a, this.b, this.c)
		d3.select(this.element)
		  .attr("cx", this.x)
		  .attr("cy", this.y)
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		let thePoint = this
		//this.field
		d3.select(document.getElementsByTagName("svg")[0])
			.append("circle")
			  .attr("r", 7)
			  .attr("cx", this.x)
			  .attr("cy", this.y)
			.attr("fill", "yellow")
			.attr("stroke", "black")
			.attr("id", "cc")
			.call(
				d=>{this.element=d._groups[0][0]}
			)
	}
	/*
	get _x(){
		return x(this)
	}
	get _y(){
		return y(this)
	}
	*/
}
function determinant(a, b, d, e, g, h){			//|a b 1|
	return (-a*h)+(e*a)-(b*d)+(b*g)+(d*h)-(e*g)     //|d e 1|
}                                                       //|g h 1|
function denominator(a, b, c){
		return 2*determinant(
			a.x, a.y,
			b.x, b.y,
			c.x, c.y
		)
}
function x(a, b, c){
		return determinant(
			a.x*a.x+a.y*a.y, a.y,
			b.x*b.x+b.y*b.y, b.y,
			c.x*c.x+c.y*c.y, c.y
		)/denominator(a, b, c)
}
function y(a, b, c){
		return determinant(
			a.x, a.x*a.x+a.y*a.y,
			b.x, b.x*b.x+b.y*b.y,
			c.x, c.x*c.x+c.y*c.y
		)/denominator(a, b, c)
}
