import { GeomObj } from "./geometry-object.js"
export { Bisector }

class Bisector extends GeomObj{
	constructor(ls){
		super()
		this.parent = ls
		ls.child.push(this)
		this.child = []
		this.show()
	}
	update(){
		this.element
		  .attr("d", this.lsb()) 
		this.child.forEach(c=>{
			c.update()
		})
	}
	show(){
		let thisEle = this
		this.element = GeomObj.field
			.append("path").lower()
			  .classed("bisector", true)
			  .attr("d", this.lsb())
			.attr("stroke", "black")
			.attr("stroke-dasharray", "2")
	}
	lsb(){
		let ls = this.parent
		let x1 = ls.v0.x, x2 = ls.v1.x
		let y1 = ls.v0.y, y2 = ls.v1.y
		let mpX = (x1+x2)/2, mpY = (y1+y2)/2
		let nmX = y2-y1, nmY = x1-x2
		let fw = GeomObj.field.attr("width")
		let fh = GeomObj.field.attr("height")
		let l = Math.sqrt((fw*fw+fh*fh)/(nmX*nmX+nmY*nmY))
		return d3.line()([[mpX+l*nmX, mpY+l*nmY],[mpX-l*nmX, mpY-l*nmY]])
	}
}
