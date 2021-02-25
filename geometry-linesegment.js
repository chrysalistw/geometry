class LineSegment{
	constructor(p1, p2, dashed){
		this.v0 = p1
		this.v1 = p2
		p1.child.push(this)
		p2.child.push(this)
		this.child = []
		this.show()
	}
	update(p1, p2){
		this.element
		.attr("d", d3.line()(
			[[this.v0.x, this.v0.y], [this.v1.x, this.v1.y]]
		))
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		let thisEle = this
		this.element = d3.select(document.getElementsByTagName("svg")[0])
			.append("path").lower()
			  .classed("ls", true)
			  .attr("d", d3.line()(
				  [[this.v0.x, this.v0.y], [this.v1.x, this.v1.y]]
			  ))
			.attr("stroke", "black")
	}
}
LineSegment.prototype.dash = function(){
	this.element.attr("stroke-dasharray", "2")
	return this
}
LineSegment.prototype.length = function(){
	let a = this.v0, b = this.v1
	let x = a.x-b.x, y = a.y-b.y
	return Math.sqrt(x*x+y*y)
}
export default LineSegment
