/* Sofia Juarez Rodriguez
	10689184
	Homework 6 Data Processing */


//Sources: http://databank.worldbank.org/data/home.aspx , 06.12.17 at 11am


/*Use d3 library and import data from json file*/

queue()
	.defer(d3.json, 'hw5data.json')
	.defer(d3.json, 'hw6exports.json')
	.defer(d3.json, 'hw6imports.json')
	.defer(d3.json, 'hw6private_consumption.json')
	.defer(d3.json, 'hw6private_investment.json')
	.defer(d3.json, 'hw6government_consumption.json')
	.await(drawGraph);

function drawGraph(error, data, exports, imports, private_consumption, private_investment, government_consumption){

	/* 	Error checking */
	if (error) throw error;

	/*Define used variables */

	var width = 300;
	var height = 200;
	var minyear = d3.min(data, function(d) { return d.time;});
	var maxyear = d3.max(data, function(d) { return d.time; });
	var mingdp = 0;
	var maxgdp = 120000;
	
	/* 	Note: d3.min(data, function(d) { return d.value; }) works (it gives me the smallest value of the data) but d3.max(data, function(d) { return d.value; }) gives me a random value. I have asked but they don't know why! That's why I have to hardcode the value myself. */

//---------------------------LINES------------------------------------------------

/*Draw lines on graph. First scale data points out, then set them on svg element.*/	
	var x = d3.scale.linear()
		.domain([minyear, maxyear])
		.range([ 0, width]);
    
	var y = d3.scale.linear()
		.domain([maxgdp, mingdp])
		.range([0,height])		
	
	var line = d3.line()
		.curve(d3.curveBasis)
		.x(function(d){return x(d.time);})
		.y(function(d){return y(d.value);})
	
	var svg = d3.select("div.output svg");
	
/* Create function that retrieves the country name from the data and passes it on to the plot function */
	function getDataForCountry(data, countryName) {
		var result = []
		for (var i = 0; i < data.length; i++) {
			if (data[i].location === countryName)
				result.push(data[i])
		}
		return result
	}

	function getDataForCountryAndYear(data, year, location){
		for (var i = 0; i < data.length; i++) {
			if (data[i].location === location && data[i].time == year)
				return data[i]
		}
	}

	function plotCountry(countryName)	
	{
		var selection = svg.append("path");
		selection
			.attr("class", "line")
			.attr("id", countryName)
			.attr("d", line(getDataForCountry(data, countryName)))
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseout", mouseout)
			.on("click", popupCenter)
	}	

	
/* Plot four countries */
	plotCountry("MEX")
	plotCountry("LUX")
	plotCountry("NLD")
	plotCountry("ESP")


//--------------------------------------------POP-UP----------------------------------------------------

	function getDetailedDataForCountryAndYear(data, location, year){
		for (var i = 0; i < data.length; i++){
			if (location == data[i].location){
				var desiredValue =  data[i][year]}
		}
		return desiredValue
	}

	function popupCenter(url, title, w, h) {
		var left = (screen.width/2)-(w/2);
		var top = (screen.height/2)-(h/2);
		var yearToShow = Math.trunc(x.invert(d3.mouse(this)[0]))
		return window.open("hw6popup.html?countryName="+this.id+"&year="+yearToShow+"&imports="+getDetailedDataForCountryAndYear(imports, this.id, yearToShow)+"&exports="+getDetailedDataForCountryAndYear(exports, this.id, yearToShow)+"&government_consumption="+getDetailedDataForCountryAndYear(government_consumption, this.id, yearToShow)+"&private_consumption="+getDetailedDataForCountryAndYear(private_consumption,this.id, yearToShow)+"&private_investment="+getDetailedDataForCountryAndYear(private_investment, this.id, yearToShow), "GDP breakdown", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	}
			
	
//-------------------------------------AXIS------------------------------------------------------------
	
/*Draw axis, first scaling them and then appending them to a new 'g' element. Make sure to rotate direction y- axis/label. */
	var xaxis = d3.scaleTime()
		.range([ 0, width])
		.domain([new Date(minyear,0,1), new Date(maxyear,0,1)])
		
	var yaxis = d3.scaleLinear()
		.range([0,height])
		.domain([maxgdp, mingdp])

	var g = svg.append("g")
	g.append("g")
		.attr("class", "xaxis")
		.call(d3.axisBottom(xaxis))
		.attr('transform', 'translate(0, ' + height + ')')
		.attr("font-size", "0.2em")
		
	g.append("g")
		.attr("class", "yaxis")
		.call(d3.axisLeft(yaxis))
		.attr("font-size", "0.2em")
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "end")
	
/*Write labels. */
	var xlabel = svg.append("text")
		.attr("x", width/2)
		.attr("y", height + 30)
		.style("text-anchor", "middle")
		.text("Year")
		.attr("font-size", "10px")
		
	var ylabel = svg.append("text")
		.attr("x", -width/3)
		.attr("y", -height/4)
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("GDP per capita")
		.attr("font-size", "10px")
		
	//Create element and append text & squares to it to create color legend.
 	var legend = svg.append("g");
	legend
		.append("text")
		.attr("x", "50")
		.attr("y", "10")
		.text("Click on a point of the line to see the details.")
		.attr("font-family", "sans-serif")
		.attr("font-size", "7px")
		.attr("fill", "black")
		.attr("font-style", "italic")
			

//---------------------------------------TOOLTIP-------------------------------------------

/*Create tooltips, one displaying the location (div1) and another giving coordinates of data point(div2). */
	var div1 = d3.select("body").append("div")
		.attr("class", "tooltip1")
		.style("display", "none")
	var div2 = d3.select("body").append("div")
		.attr("class", "tooltip2")
		.style("display", "none")
	
	function coordinates(){return d3.mouse(this);}

	
	function mouseover() {
		div1.style("display", "inline")
		div2.style("display", "inline")
	}
	
/* Whereas the x.invert function works, the y.invert showed negative numbers due to the direction of the y axis (from bigger to smaller numbers). Therefore I have created a new y2 variable where the direction has been reversed. It still shows a very strange number, but at least not negative. */
	
	
	function mousemove() 
	{
	div1
		  .text(this.id)
		  .style("left", (d3.event.pageX - 34) + "px")
		  .style("top", (d3.event.pageY - 34) + "px") 
	var yearToShow = Math.trunc(x.invert(d3.mouse(this)[0]))
	
	div2
		  .text(yearToShow + ", " + getDataForCountryAndYear(data, yearToShow, this.id).value)
		  .style("left", (d3.event.pageX - 200) + "px")
		  .style("top", (d3.event.pageY + 10) + "px")
	}
	
	function mouseout() {
		div1.style("display", "none")
		div2.style("display", "none")
	}
			
};