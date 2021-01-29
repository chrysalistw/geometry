var f = d3.select("div#field")
var svg = f.append("svg")
           .attr("width", 500)
           .attr("height", 500)
var v = [
	{x: 200, y:50},
	{x: 100, y:300},
	{x: 300, y:350}
]
var lineSegments = [
	{start: v[0], end: v[1]},
	{start: v[1], end: v[2]},
	{start: v[2], end: v[0]},
]
svg.selectAll("path")
	.data(lineSegments).enter()
	.append("path")
	  .attr("d", d)
	  .attr("stroke", "black")
svg.selectAll("circle")
	.data(v).enter()
	.append("circle")
	  .attr("r", 7)
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
	d3.selectAll("path")
	  .attr("d", d)
}
update()
function x(d){return d.x}
function y(d){return d.y}
function d(d){return line(d.start, d.end)}
function line(a, b){
	return d3.line()([[a.x, a.y],[b.x, b.y]])
}
