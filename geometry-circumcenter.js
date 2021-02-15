import { GeomObj } from "./geometry-object.js"
export { Circumcenter }

class Circumcenter extends GeomObj{
	constructor(a, b, c){
		super()
		this.a = a
		this.b = b
		this.c = c
		this.child = []
		a.child.push(this)
		b.child.push(this)
		c.child.push(this)
		this.show()
	}
	update(){
		d3.select(this.element)
		  .attr("cx", x(this))
		  .attr("cy", y(this))
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		let thePoint = this
		GeomObj.field
			.append("circle")
			  .attr("r", 7)
			  .attr("cx", x(this))
			  .attr("cy", y(this))
			.attr("fill", "yellow")
			.attr("stroke", "black")
			.call(
				d=>{this.element=d._groups[0][0]}
			)
	}
	get x(){
		return x(this)
	}
	get y(){
		return y(this)
	}
}
function determinant(a, b, d, e, g, h){			//|a b 1|
	return (-a*h)+(e*a)-(b*d)+(b*g)+(d*h)-(e*g)     //|d e 1|
}                                                       //|g h 1|
function denominator(c){
		return 2*determinant(
			c.a.x, c.a.y,
			c.b.x, c.b.y,
			c.c.x, c.c.y
		)
}
function x(c){
		return determinant(
			c.a.x*c.a.x+c.a.y*c.a.y, c.a.y,
			c.b.x*c.b.x+c.b.y*c.b.y, c.b.y,
			c.c.x*c.c.x+c.c.y*c.c.y, c.c.y
		)/denominator(c)
}
function y(c){
		return determinant(
			c.a.x, c.a.x*c.a.x+c.a.y*c.a.y,
			c.b.x, c.b.x*c.b.x+c.b.y*c.b.y,
			c.c.x, c.c.x*c.c.x+c.c.y*c.c.y
		)/denominator(c)
}
