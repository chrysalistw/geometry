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
	update(element, x, y){
		this.x = x
		this.y = y
		d3.select(element)
		  .attr("cx", x)
		  .attr("cy", y)
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		let thePoint = this
		this.element = GeomObj.field
			.append("circle")
			  .attr("r", 7)
			  .attr("cx", this.x)
			  .attr("cy", this.y)
			.attr("fill", "yellow")
			.attr("stroke", "black")
			.call(
				d3.drag()
				  .on("drag", function(e){
					thePoint.update(
						this,
						thePoint.x+e.dx,
						thePoint.y+e.dy
					)
				  })
			)
	}
}
