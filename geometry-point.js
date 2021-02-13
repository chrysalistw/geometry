import { GeomObj } from "./geometry-object.js"
export { Point }

class Point extends GeomObj{
	constructor(x, y){
		super()
		this.x = x
		this.y = y
		this.child = []
		this.show()
	}
	update(){
		d3.select(this.element)
		  .attr("cx", this.x)
		  .attr("cy", this.y)
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		let thePoint = this
		GeomObj.field
			.append("circle")
			  .attr("r", 7)
			  .attr("cx", this.x)
			  .attr("cy", this.y)
			.attr("fill", "yellow")
			.attr("stroke", "black")
			.call(
				d=>{this.element=d._groups[0][0]}
			)
			.call(
				d3.drag()
				  .on("drag", function(e){
					thePoint.x += e.dx
					thePoint.y += e.dy
					thePoint.update()
				  })
			)
	}
}
Point.prototype.attachToLS = function(ls){ // attach to a line segment
	this.attached = true
	//project this to line segment
	let a = ls.v0, b = ls.v1
	let m = b.x-a.x!==0?(b.y-a.y)/(b.x-a.x):"infinity"
	let c = a.y-m*a.x
	ls.child.push(this)
	let thisx = (this.x+m*this.y-m*c)/(1+m*m)
	let thisy = (m*this.x+m*m*this.y+c)/(1+m*m)
	this.x = thisx, this.y = thisy
	this.update()
	this.update = function(){
		let a = ls.v0, b = ls.v1
		let m = b.x-a.x!==0?(b.y-a.y)/(b.x-a.x):"infinity"
		let c = a.y-m*a.x
		let thisx = (this.x+m*this.y-m*c)/(1+m*m)
		let thisy = (m*this.x+m*m*this.y+c)/(1+m*m)
		this.x = thisx, this.y = thisy
		d3.select(this.element)
		  .attr("cx", this.x)
		  .attr("cy", this.y)
		this.child.forEach(c=>{
			c.update()
		})
	}
}
