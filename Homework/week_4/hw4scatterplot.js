/* Sofia Juarez Rodriguez
	10689184
	Homework 4 Data Processing */


//Sources: http://techslides.com/list-of-countries-and-capitals , 22.11.17
//https://www.accuweather.com/en/europe-weather , 22.11.17 at 15h
// http://www.worldatlas.com/capcitys.htm

/*Use d3 library and import data from json file*/
d3.json("hw4data.json", function(error, jsondata){

	//Error checking
	if (error) throw error;

	//Define used variables
	var width = 300;
	var height = 200;
	var minlat = 30;
	var maxlat = 70;
	var mintemp = -10;
	var maxtemp = 25;
	var cities = {"Lisbon":"SE", "Madrid":"SE","Rome": "SE","Paris": "CE","Valletta": "SE","London": "CE","Athens": "SE","Brussels": "CE","Berlin": "CE","Amsterdam": "CE","Warsaw": "CE","Moscow": "NE","Oslo": "NE","Helsinki": "NE","Stockholm": "NE","Reykjavik": "NE","Copenhagen": "CE","Riga": "NE"}
	var colors = ["red","green","blue", "grey"];
	var position = ["Southern Europe", "Central Europe", "Northern Europe", "No Data"]
	
//---------------------------SCATTERED POINTS------------------------------------------------

	//Draw points on map. First scale them out, then set them on svg element.
	var x = d3.scale.linear()
	  .domain([minlat, maxlat])
	  .range([ 0, width]);
    
	var y = d3.scale.linear()
		.domain([maxtemp, mintemp])
		.range([0,height])
	
  	var svg = d3.select("div.output svg");
	var selection = svg.selectAll("circle");
	selection
		.data(jsondata)
		.enter().append("circle")
        .attr("cy", function(d){return y(d.Temperature);})
        .attr("cx", function(d){return x(d.Latitude);})
		.attr("r", function(d){return Math.log(d.Population)/2;})
		.attr("class", function(d){ 
			if(cities[d.City] === "SE"){
				return "red";
			}
			else if(cities[d.City] === "CE"){
				return "green";
			}
			else {
				return "blue";
			}
		})
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseout", mouseout)

//--------------------------------LEGEND-----------------------------------------------------------------------
	
	//Create element and append text & squares to it to create color legend.
 	var legend = svg.append("g");
	var key = svg.selectAll("g");
	for (i = 0; i < 4; i++ ){
		key	
			.append("text")
			.attr("x", width/4)
			.attr("y", height/3*2 + i*20)
			.text(position[i])
			.attr("font-family", "sans-serif")
			.attr("font-size", "7px")
			.attr("fill", "black")
		}
			
	for (i = 0; i < 4; i++ ){
		key	
			.append("rect")
			.attr("x", width/4 - 15)
			.attr("y", height/3*2 - 10 + i*20)
			.attr("width", "10")
			.attr("height", "10")
			.attr("fill", colors[i])
	}	
//-------------------------------------AXIS------------------------------------------------------------
	
	//Draw axis, first scaling them and then appending them to a new 'g' element. Make sure to rotate direction y- axis/label.
	var xaxis = d3.scaleLinear()
		.range([ 0, width])
		.domain([minlat, maxlat])
		
	var yaxis = d3.scaleLinear()
		.range([0,height])
		.domain([maxtemp, mintemp])

	var g = svg.append("g")
	g.append("g")
		.attr("class", "xaxis")
		.call(d3.axisBottom(xaxis))
		.attr("font-size", "0.5em")
		
	g.append("g")
		.attr("class", "yaxis")
		.call(d3.axisLeft(yaxis))
		.attr("font-size", "0.5em")
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "end")
	
	//Write labels.
	var xlabel = svg.append("text")
		.attr("x", width/2)
		.attr("y", "-5")
		.style("text-anchor", "middle")
		.text("Latitude")
		.attr("font-size", "10px")
		
	var ylabel = svg.append("text")
		.attr("x", minlat*(-3))
		.attr("y", mintemp*3)
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("Temperature in C")
		.attr("font-size", "10px")

//---------------------------------------TOOLTIP-------------------------------------------

	//Create tooltips, one displaying the population (div1) and another giving coordinates of data point(div2).
	var div1 = d3.select("body").append("div")
		.attr("class", "tooltip1")
		.style("display", "none")
	var div2 = d3.select("body").append("div")
		.attr("class", "tooltip2")
		.style("display", "none")
	
	function mouseover() {
		div1.style("display", "inline")
		div2.style("display", "inline")
	}
	
	function mousemove(data) {
		div1
		  .text(data.City + ", " + data.Population + " inhabitants")
		  .style("left", (d3.event.pageX - 34) + "px")
		  .style("top", (d3.event.pageY - 12) + "px")
		div2
		  .text(data.Latitude + ", " + data.Temperature + "C")
		  .style("left", (d3.event.pageX - 34) + "px")
		  .style("top", (d3.event.pageY + 10) + "px")
		  
	}
	
	function mouseout() {
		div1.style("display", "none")
		div2.style("display", "none")
	}
			
});