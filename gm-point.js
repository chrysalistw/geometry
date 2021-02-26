import gm from "./geometry.js"
class Point{
	constructor(x, y){
		this.x = x
		this.y = y
		this.fakePosition = {x: x, y: y}
		this.child = []
		if(this.constructor.name==="Point")
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
		gm.field.append("circle")
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
Point.prototype.invisible = function(){
	this.element.style.visibility = "hidden"
	return this
}
Point.prototype.setColor = function(color){
	this.element.style.fill = color
	return this
}
Point.prototype.attachToLS = function(ls){
	this.attached = true
	ls.child.push(this)
	this.update = function(){
		let a = ls.v0, b = ls.v1
		let m = b.x-a.x!==0?(b.y-a.y)/(b.x-a.x):"infinity"
		if(m!=="infinity"){
			let c = a.y-m*a.x
			let thisx = (this.fakePosition.x+m*this.fakePosition.y-m*c)/(1+m*m)
			let thisy = (m*this.fakePosition.x+m*m*this.fakePosition.y+c)/(1+m*m)
			this.x = thisx, this.y = thisy
		}
		else{
			this.x = ls.v0.x
			this.y = this.fakePosition.y
		}
		d3.select(this.element)
		  .attr("cx", this.x)
		  .attr("cy", this.y)
		this.child.forEach(c=>{
			c.update()
		})
	}
	this.update()
	return this
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
	return this
}

export default Point
