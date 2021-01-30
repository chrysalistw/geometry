var f = d3.select("div#field")
var svg = f.append("svg")
           .attr("width", 500)
           .attr("height", 500)
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
	let norX = segm.end.y - segm.start.y
	let norY = segm.start.x - segm.end.x
	let norLength2 = norX*norX + norY*norY
	let l = 500*Math.sqrt(2)/Math.sqrt(norLength2) // lengthen over the field
	return line(
		{x: mpX+l*norX, y: mpY+l*norY},
		{x: mpX-l*norX, y: mpY-l*norY}
	)
}
function line(a, b){
	console.log(a)
	return d3.line()([[a.x, a.y],[b.x, b.y]])
}
