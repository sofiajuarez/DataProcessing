/* Sofia Juarez Rodriguez
	10689184
	Homework 5 Data Processing */


//Sources: https://data.oecd.org/gdp/gross-domestic-product-gdp.htm , 28.11.17 at 10am

/*pop-up window function for index page*/
function popupCenter(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}


/*Use d3 library and import data from json file*/
d3.json("hw5data.json", function(error, jsondata){

/* 	Error checking */
	if (error) throw error;

/*Define used variables */
	var width = 300;
	var height = 200;
	var minyear = 2006;
	var maxyear = 2016;
	var mingdp = 0;
	var maxgdp = 120000;
	
//---------------------------SCATTERED POINTS------------------------------------------------

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


	function plotCountry(countryName)	
	{
		var selection = svg.append("path");
		selection
			.attr("class", "line")
			.attr("id", countryName)
			.attr("d", line(getDataForCountry(jsondata, countryName)))
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseout", mouseout)
	}	

/* Plot four countries */
	plotCountry("ESP")
	plotCountry("MEX")
	plotCountry("LUX")
	plotCountry("NLD")


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
	var y2 = d3.scale.linear()
	.domain([mingdp, maxgdp])
	.range([0,height])
	
	function mousemove(data) 
	{
	div1
		  .text(this.id)
		  .style("left", (d3.event.pageX - 34) + "px")
		  .style("top", (d3.event.pageY - 12) + "px")    
	div2
		  .text(Math.trunc(x.invert(d3.mouse(this)[0])) + ", " + y2.invert(d3.mouse(this)[0]))
		  .style("left", (d3.event.pageX - 34) + "px")
		  .style("top", (d3.event.pageY + 10) + "px")  
	}
	
	function mouseout() {
		div1.style("display", "none")
		div2.style("display", "none")
	}
			
});