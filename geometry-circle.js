import { GeomObj } from "./geometry-object.js"
export { Circle }

class Circle extends GeomObj{
	constructor(center, P){
		super()
		//this.cx = cx
		//this.cy = cy
		//this.r = r
		this.center = center
		this.p = P
		this.child = []
		this.center.child.push(this)
		this.p.child.push(this)
		this.radius = function(){
			return Math.sqrt(
				(this.center.x-this.p.x)*(this.center.x-this.p.x)
				+(this.center.y-this.p.y)*(this.center.y-this.p.y)
			)
		}
		this.show()
	}
	update(){
		d3.select(this.element)
		  .attr("cx", this.center.x)
		  .attr("cy", this.center.y)
		  .attr("r", this.radius())
		  //.attr("r", typeof(this.r)==="function"?this.r():this.r)
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		GeomObj.field
			.append("circle").lower()
			  .classed("circle", true)
			  //.attr("r", typeof(this.r)==="function"?this.r():this.r)
			  .attr("cx", this.center.x)
			  .attr("cy", this.center.y)
			  .attr("r", this.radius())
			.attr("fill-opacity", 0)
			.attr("stroke", "black")
			.call(
				d=>{this.element=d._groups[0][0]}
			)
	}
}
