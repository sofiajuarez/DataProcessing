/* Sofia Juarez Rodriguez
	10689184
	Homework 3 Data Processing */
	

/*Use d3 library and import data from json file*/	
d3.json("hw3data.json", function(jsondata) {
	
	/* Create an object that is the selection of the html element that will contain the graph */
  	var svg = d3.select("div.output svg");
	var selection = svg.selectAll("rect");
	
//------------------------DRAW BARS--------------------------------------------------------------------
	
	selection
		.data(jsondata)
		/*Add bars in the svg element*/
		.enter().append("rect")
		/*Change colors of bars according to temperature*/
		.attr("class", function(d){
			if(d.Temperature <= 0){
				return "barpurple bar"
			}
			else if(d.Temperature <= 100 && d.Temperature > 0){
				return "barblue bar"
			}
			else if(d.Temperature <= 150 && d.Temperature > 100){
				return "bargreen bar"
			}
			else if(d.Temperature <= 200 && d.Temperature > 150){
				return "barorange bar"
			}
			else{return "barred bar"}
			})
		/*Define origin of graph*/
		.attr("x",0)
		/*Define y-position, width and height of each bar*/
		.attr("y", function(d,i) { return i*10+30 })
		.attr("width", function(d,i) {
			/*+38 because it is the lowest value*/
			return d.Temperature*1 + 38;
			})
		.attr("height", 10)
		/*Call functions when hovering on bars (see below)*/
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseout", mouseout)
		
// ---------------------AXIS-------------------------------------------------------------------------------------		
	
	/*Create axis: y is scaled in time and x in length*/
	var y = d3.scaleTime()
		.domain([new Date(2016, 10, 17), new Date(2017, 10, 17)])
		/*Scale axis from the position of the first bar to that of the last*/
		.range([30, 3690])
	var x = d3.scaleLinear()
		/*Scale axis from lowest x position to biggest one, correspoding to the lowest and highest temperature resp.*/
		.range([0,274])
		.domain([-3.8, 23.6])
	
	var g = svg.append("g")
		/*Write axis(axises?)*/
		g.append("g")
			.attr("class", "xaxis")
			.call(d3.axisBottom(x))
		g.append("g")
			.attr("class", "yaxis")
			.call(d3.axisLeft(y))
		.append("text")
		/*Rotate text on y axis 90 degrees*/
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "end")
			
	
//-------------------TOOLTIP------------------------------------------------------------------------------------
	
	/*Create a div element but make it invisible*/
	var div = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("display", "none")
	
	/*Display tooltip when hovering on bar*/
	function mouseover() {
		div.style("display", "inline")
	}

	function mousemove(data) {
		div
			/*Display temperature*/
		  .text(data.Temperature/10)
		  /*Position text with respect to mouse*/
		  .style("left", (d3.event.pageX - 34) + "px")
		  .style("top", (d3.event.pageY - 12) + "px")
	}
	
	/*Hide tooltip when mouse is removed from bar*/
	function mouseout() {
		div.style("display", "none")
	}

});


