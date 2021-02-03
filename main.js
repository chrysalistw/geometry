var f = d3.select("div#field")
var width = 500
var height = 500
var svg = f.append("svg")
           .attr("width", width)
           .attr("height", height)
var v = [
	new Point(200,  50),
	new Point(100, 300),
	new Point(300, 350)
]
var lineSegments = [
	new lineSegment(v[0], v[1]),
	new lineSegment(v[1], v[2]),
	new lineSegment(v[2], v[0])
]
var bisector = [
	new lineSegmentBisector(lineSegments[0]),
	new lineSegmentBisector(lineSegments[1]),
	new lineSegmentBisector(lineSegments[2])
]
function Point(x, y){
	this.x = x
	this.y = y
	//this.class = "class"
}
function lineSegment(start, end){
	this.start = start
	this.end = end
	//this.class = "class"
}
function lineSegmentBisector(lineSegment){
	this.segment = lineSegment
	//this.class = "class"
}
svg.selectAll("path.ls")
	.data(lineSegments).enter()
	.append("path")
	  .classed("ls", true)
	  .attr("d", d)
	  .attr("stroke", "black")
svg.selectAll("path.bisector")
	.data(bisector).enter()
	.append("path")
	  .classed("bisector", true)
	  .attr("d", lsb)
	  .attr("stroke", "black")
	  .attr("stroke-dasharray", "2")
svg.selectAll("circle")
	.data(v).enter()
	.append("circle")
	  .attr("r", 5)
	  .attr("cx", x)
	  .attr("cy", y)
	  .attr("fill", "yellow")
	  .attr("stroke", "black")
	  .call(
		d3.drag()
		  .on("drag", function(e){
			e.subject.x += e.dx
			e.subject.y += e.dy
			d3.select(this)
			  .attr("cx", e.subject.x)
			  .attr("cy", e.subject.y)
			update()
		  })
	  )
function update(){
	d3.selectAll("path.ls")
	  .attr("d", d)
	d3.selectAll("path.bisector")
	  .attr("d", lsb)
}
//update()
function x(d){return d.x}
function y(d){return d.y}
function d(d){return line(d.start, d.end)}
function lsb(d){
	let segm = d.segment
	let mpX = (segm.start.x + segm.end.x) / 2
	let mpY = (segm.start.y + segm.end.y) / 2
	let normX = segm.end.y - segm.start.y
	let normY = segm.start.x - segm.end.x
	let normLength = Math.sqrt(normX*normX + normY*normY)
	let l = Math.sqrt(width*width+height*height)/normLength // lengthen over the field
	return line(
		{x: mpX+l*normX, y: mpY+l*normY},
		{x: mpX-l*normX, y: mpY-l*normY}
	)
}
function line(a, b){
	return d3.line()([[a.x, a.y],[b.x, b.y]])
}
