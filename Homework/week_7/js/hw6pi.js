/* Sofia Juarez Rodriguez
	10689184
	Final project Data Processing */



//Use d3 library and import data from json file.
d3.json("https://github.com/sofiajuarez/DataProcessing/blob/master/Homework/week_7/data/hw6private_investment.json", function(error, jsondata){

	//Error checking
	if (error) throw error;

	//Define variables.
	var width = d3.max(jsondata, function(d){ return d[2006];});
	var height = 70;
	var arr = [];
	
	//Retrieve data.
	var toPlot = function(){for (var i = 0; i < jsondata.length; i++){
		arr.push(jsondata[i][2006]);} return arr;
	}
	
	//Truncate numbers. Source:https://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
	function truncate (num, places) {
		return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
	}
	
//--------------------------------BARS------------------------------------------------------------------
	
	//Create bars.
	var svg = d3.select("div.output svg")	
	svg.selectAll("rect")
	  .data(toPlot)
	  .enter().append("rect")
		.attr("x", 0)
		.attr("y", function(d,i) { return i*(height/4) + 5 })
		.attr("width", function(d){return d*100;})
		.attr("height", height/7)
		.style("fill", "brown")

		
	//Append values to bars.
 	var legend = svg.append("g");
	var key = svg.selectAll("g");
	for (i = 0; i < 4; i++ ){
		key	
			.append("text")
			.attr("x", 3)
			.attr("y", i*(height/4)+12)
			.text(truncate(arr[i], 2))
			.attr("font-family", "sans-serif")
			.attr("font-size", "7px")
			.attr("fill", "yellow")
		}


//----------------------AXIS-------------------------------------------------------------------------------------		

	//Create and scale axis according to previously defined variables.
	var x = d3.scaleLinear()
		.range([0,width*100])
		.domain([0, width])

	var y = d3.scaleBand()
		.domain(['NLD', 'MEX', 'LUX', 'ESP'])
		.range([0, height])
		.paddingInner(0.05)
	
	//Append axis to svg element.
	var g = svg.append("g")
		g.append("g")
			.attr("class", "xaxis")
			.call(d3.axisBottom(x))
			.attr('transform', 'translate(0, ' + height + ')')
			.attr("font-size", "0.3em")
		g.append("g")
			.attr("class", "yaxis")
			.call(d3.axisLeft(y))
			.attr("font-size", "0.3em")
		.append("text")
		
			//Turn y-axis ticks to their side.
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "end")
			
	//Write x label.
	var xlabel = svg.append("text")
		.attr("x", width*50)
		.attr("y", height + 20)
		.style("text-anchor", "middle")
		.text("% of GDP")
		.attr("font-size", "0.4em")
		
			
});
