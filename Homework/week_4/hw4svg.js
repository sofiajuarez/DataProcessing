/* Sofia Juarez Rodriguez
10689184
Homework 4 Data Processing */


d3.xml("test.svg", "image/svg+xml", function(error, xml) {
	
	//Error handling.
    if (error) throw error;  
    document.body.appendChild(xml.documentElement);    
	
	//Select all rectangles of svg and pile them up.
	var svg = d3.select("svg");
	var selection = svg.selectAll("rect");
	selection
		.attr("x",50)
		.attr("y", function(d,i) {
			return i*20 + 20;})
		.attr("width", 20)
		.attr("height", 20)
		
	//Write value to each key
 	var g = svg.append("g");
	var key = svg.selectAll("g");
		for (i = 1; i < 7; i++ ){
		key
			.append("text")
				.attr("x", 80)
				.attr("y", i*20 + 30)
				.text(Math.pow(10, i))
				.attr("font-family", "sans-serif")
				.attr("font-size", "5px")
				.attr("fill", "black")
		}
	//Include ''no data'' case.
	key
		.append("text")
			.attr("x", 80)
			.attr("y", 170)
			.text("No data")
			.attr("font-family", "sans-serif")
			.attr("font-size", "5px")
			.attr("fill", "black")
		
	
	
});
