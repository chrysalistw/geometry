import { GeomObj } from "./geometry-object.js"
export { Point }

class Point extends GeomObj{
	constructor(x, y){
		super()
		this.x = x
		this.y = y
		this.fakePosition = {x: x, y: y}
		this.child = []
		this.show()
	}
	update(){
		this.x = this.fakePosition.x
		this.y = this.fakePosition.y
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
				  .on("start", function(e){
					thePoint.dragging = true
					thePoint.fakePosition = {
						x: thePoint.x,
						y: thePoint.y
					}
					console.log(thePoint.fakePosition)
				  })
				  .on("drag", function(e){
					thePoint.fakePosition.x += e.dx
					thePoint.fakePosition.y += e.dy
					thePoint.update()
				  })
				  .on("end", function(e){
					thePoint.dragging = false
				  })
			)
	}
}
Point.prototype.attachToLS = function(ls){
	this.attached = true
	ls.child.push(this)
	this.update = function(){
		let a = ls.v0, b = ls.v1
		let m = b.x-a.x!==0?(b.y-a.y)/(b.x-a.x):"infinity"
		let c = a.y-m*a.x
		//let thisx = (this.x+m*this.y-m*c)/(1+m*m)
		//let thisy = (m*this.x+m*m*this.y+c)/(1+m*m)
		let thisx = (this.fakePosition.x+m*this.fakePosition.y-m*c)/(1+m*m)
		let thisy = (m*this.fakePosition.x+m*m*this.fakePosition.y+c)/(1+m*m)
		this.x = thisx, this.y = thisy
		d3.select(this.element)
		  .attr("cx", this.x)
		  .attr("cy", this.y)
		this.child.forEach(c=>{
			c.update()
		})
	}
	this.update()
}
Point.prototype.attachToCircle = function(c){
	this.attached = true
	c.child.push(this)
	this.update = function(){
		let _x = this.fakePosition.x-c.center.x
		let _y = this.fakePosition.y-c.center.y
		let _length = Math.sqrt(_x*_x+_y*_y)
		let r = c.radius()
		this.x = c.center.x+r/_length*_x
		this.y = c.center.y+r/_length*_y
		d3.select(this.element)
		  .attr("cx", this.x)
		  .attr("cy", this.y)
		this.child.forEach(c=>{
			c.update()
		})
	}
	this.update()
}
