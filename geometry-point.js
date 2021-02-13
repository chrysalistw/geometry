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
	update(x, y){
		this.x = x
		this.y = y
		d3.select(this.element)
		  .attr("cx", x)
		  .attr("cy", y)
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
					thePoint.update(
						thePoint.x+e.dx,
						thePoint.y+e.dy
					)
				  })
			)
	}
}
