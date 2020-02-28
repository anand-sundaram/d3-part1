d3.select("body").style("background-color", "white");

var svg = d3.select("#chart")
    .append("svg")
    .attr("height", 2000)
    .attr("width", 2000)
    .attr("id", "drawhere")
    .append('g')
    


d3.select("#drawhere")
    .append("g")
    .attr("id", "rectangles")
    
var width = 80;
var height = 100;
var propertyWidth = 220;
var propertyHeight = 300;
var xOffset = 0;
var yOffset = 0;
var currentX = 120;
var currentY = 20;
var currentWidth = width;
var currentHeight = height;
var propertyX = 400
var propertyY = 400

var propertyData = []
d3.csv("data.csv").then(function(data) {
  console.log(data);
  propertyData = data;


    var property = d3.select("#rectangles")
        .append("rect")
        .attr("id", "property")
        .attr("height", propertyHeight)
        .attr("width", propertyWidth)
        .attr("x", propertyX)
        .attr("y", propertyY)
        .style("visibility", "hidden")
        .style("stroke", "black")
        .style("fill", "none");
    var propertyColour = d3.select("#rectangles")
        .append("rect")
        .attr("id", "propertyColour")
        .attr("height", propertyHeight / 10)
        .attr("width", propertyWidth)
        .attr("x", propertyX)
        .attr("y", propertyY)
        .style("visibility", "hidden")
        .style("stroke", "black")
        .style("fill", "none");
    var propertyName = d3.select("#rectangles")
        .append("text")
        .attr("id", "propertyName")
        .attr("x", propertyX + propertyWidth/2)
        .attr("y", propertyY + 20)
        .attr("font-size", "1.5em")
        .attr("text-anchor", "middle")
        .style("visibility", "hidden");
    var propertyRents = d3.select("#rectangles")
        .append("text")
        .attr("id", "propertyRents")
        .attr("text-anchor", "middle")
        .attr("x", propertyX + propertyWidth/2)
        .attr("y", propertyY + 40)
        .style("visibility", "hidden");
        

    for (let i = 1; i <= 40; i++) {
        if (i == 1) {
            currentWidth = height;
            currentHeight = height;
            xOffset = currentWidth;
            yOffset = 0;
        } else if (i <= 10) {
            currentWidth = width;
            currentHeight = height;
            xOffset = currentWidth;
            yOffset = 0;
        } else if (i == 11) {
            currentWidth = height;
            currentHeight = height;
            xOffset = 0;
            yOffset = currentHeight;
        } else if (i <= 20) {
            currentWidth = height;
            currentHeight = width;
            xOffset = 0;
            yOffset = currentHeight;
        } else if (i == 21) {
            currentWidth = height;
            currentHeight = height;
            xOffset = -width;
            yOffset = 0;
        } else if (i <= 30) {
            currentWidth = width;
            currentHeight = height;
            xOffset = -currentWidth;
            yOffset = 0;
        } else if (i == 31) {
            currentWidth = height;
            currentHeight = height;
            xOffset = 0;
            currentX = currentX - (height - width)
            yOffset = -width;
        } else if (i <= 40) {
            currentWidth = height;
            currentHeight = width;
            xOffset = 0;
            yOffset = -currentHeight;
        } 
        d3.select("#rectangles")
            .append("rect")
            .attr("id", "cell" + i)
            .attr("height", currentHeight)
            .attr("width", currentWidth)
            .attr("x", currentX)
            .attr("y", currentY)
            .style("stroke", "black")
        	.style("fill", propertyData[i - 1] != null ? d3.interpolateOranges(Number(propertyData[i - 1].probability)) : d3.interpolateOranges(Math.random()))
        	.style("stroke-width", 3)
            .on("mouseover", function(d){
                propertyColour.style("fill", d3.interpolatePurples(0.3))
                propertyRents.append("tspan").text("Rent: 20").attr("x", propertyX + propertyWidth/2).attr("dy", 20);
                propertyRents.append("tspan").text("Rent with 1 House: 30").attr("x", propertyX + propertyWidth/2).attr("dy", 20);
                propertyRents.append("tspan").text("Rent with 2 House: 40").attr("x", propertyX + propertyWidth/2).attr("dy", 20);
                propertyRents.append("tspan").text("Rent with 3 House: 50").attr("x", propertyX + propertyWidth/2).attr("dy", 20);
                propertyRents.append("tspan").text("Rent with Hotel: 60").attr("x", propertyX + propertyWidth/2).attr("dy", 20);
                if (i <= propertyData.length) {
                    propertyName.text(propertyData[i - 1].propertyName);
                    propertyColour.style("fill", propertyData[i - 1].propertyColour)
                    propertyRents.append("tspan")
                        .text("Probability: " + propertyData[i - 1].probability)
                        .attr("x", propertyX + propertyWidth/2)
                        .attr("dy", 60)
                        .attr("font-size", "2em");
                } else {
                    propertyName.text("cell" + i); 
                }
                
                propertyRents.style("visibility", "visible");
                propertyColour.style("visibility", "visible");
                propertyName.style("visibility", "visible");
                property.style("visibility", "visible");
            })
            .on("mouseout", function(){
                propertyColour.style("visibility", "hidden");
                propertyName.style("visibility", "hidden");
                propertyRents.style("visibility", "hidden");
                propertyRents.selectAll("*").remove();
                property.style("visibility", "hidden");
            });
        currentX = currentX + xOffset;
        currentY = currentY + yOffset;
    }
});