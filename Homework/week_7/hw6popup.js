var params = {};

if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
}

console.log(params)



/* Create an object that is the selection of the html element that will contain the graph */
/*   	var svg = d3.select("div.output svg");
	var selection = svg.selectAll("rect"); */
	
//------------------------DRAW BARS--------------------------------------------------------------------
	
/* var svg = d3.select("div.output svg")

svg.selectAll("rect")
  .data([1,3, 9])
  .enter().append("rect")
    .attr("x", 0)
    .attr("y", function(d,i) { return i*90+5 })
    .attr("width", function(d,i) { return d; })
    .attr("height", 30)
.style("fill", "steelblue")
	
console.log("line34") */