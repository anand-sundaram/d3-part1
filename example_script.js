// Example 1


// Example 2

var probabilities1 = Array.from({length: 40}, () => Math.random());
var probabilities2 = Array.from({length: 40}, () => Math.random());

var propertyWidth = 220;
var propertyHeight = 300;
var propertyX = 600
var propertyY = 550

var svg = d3.select("body")
    .append("svg")
    .attr("height", 3000)
    .attr("width", 3000)
    .attr("id", "drawhere")

var property = d3.select("#drawhere")
    .append("rect")
    .attr("id", "property")
    .attr("height", propertyHeight)
    .attr("width", propertyWidth)
    .attr("x", propertyX)
    .attr("y", propertyY)
    .style("visibility", "hidden")
    .style("stroke", "black")
    .style("fill", "none");
var propertyColour = d3.select("#drawhere")
    .append("rect")
    .attr("id", "propertyColour")
    .attr("height", propertyHeight / 10)
    .attr("width", propertyWidth)
    .attr("x", propertyX)
    .attr("y", propertyY)
    .style("visibility", "hidden")
    .style("stroke", "black")
    .style("fill", "none");
var propertyName = d3.select("#drawhere")
    .append("text")
    .attr("id", "propertyName")
    .attr("x", propertyX + propertyWidth/2)
    .attr("y", propertyY + 20)
    .attr("font-size", "1em")
    .attr("text-anchor", "middle")
    .style("visibility", "hidden");
var propertyRents = d3.select("#drawhere")
    .append("text")
    .attr("id", "propertyRents")
    .attr("text-anchor", "middle")
    .attr("x", propertyX + propertyWidth/2)
    .attr("y", propertyY + 40)
    .style("visibility", "hidden");
    
function mouseOver(cardData) {
    console.log("detected mouse over " + cardData);
    propertyName.text(cardData.data.value["Name 3"]);
    propertyColour.style("fill", getColor(cardData)).style("opacity", 0.5);
    if (cardData.data.value["Rent"] != "") {
        propertyRents.append("tspan").text("Rent: " + cardData.data.value["Rent"]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
    }
    if (cardData.data.value["Rent (1x House/Railroad/Utility)"] != "") {
        propertyRents.append("tspan").text("Rent with 1 House: " + cardData.data.value["Rent (1x House/Railroad/Utility)"]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
    }
    if (cardData.data.value["Rent (2x House/Railroad/Utility)"] != "") {
        propertyRents.append("tspan").text("Rent with 2 Houses: " + cardData.data.value["Rent (2x House/Railroad/Utility)"]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
    }
    if (cardData.data.value["Rent (3x House/Railroad/Utility)"] != "") {
        propertyRents.append("tspan").text("Rent with 3 Houses: " + cardData.data.value["Rent (3x House/Railroad/Utility)"]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
    }
    if (cardData.data.value["Rent (4x House/Railroad/Utility)"] != "") {
        propertyRents.append("tspan").text("Rent with 4 Houses: " + cardData.data.value["Rent (4x House/Railroad/Utility)"]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
    }
    if (cardData.data.value["Rent (Hotel)"] != "") {
        propertyRents.append("tspan").text("Rent with Hotel: " + cardData.data.value["Rent (Hotel)"]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
    }
    propertyRents.style("visibility", "visible");
    propertyColour.style("visibility", "visible");
    propertyName.style("visibility", "visible");
    property.style("visibility", "visible");
}

function mouseOut(cardData) {
    console.log("detected mouse out " + cardData);
    propertyColour.style("visibility", "hidden");
    propertyName.style("visibility", "hidden");
    propertyRents.style("visibility", "hidden");
    propertyRents.selectAll("*").remove();
    property.style("visibility", "hidden");
}

d3.csv("./files/mpy_csv.csv").then(function(data) {
    console.log(data);

    // Create dummy data
    var cardData = data.filter(isPurchaseableCard);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return 1; })
    var data_ready = pie(d3.entries(cardData))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(550)         // This is the size of the donut hole
            .outerRadius(700)
        )
        .attr("transform", "translate(" + 710 + "," + 710 + ")")
        .attr('fill', getColor)
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
        // .on(eventObj);

    createInnerDonut(svg, data_ready, 400, 550, 1);
    createInnerDonut(svg, data_ready, 250, 400, 2);
});


function isPurchaseableCard(card) {
  return card["Type"] == "Utility" || card["Type"] == "Railroad" || card["Type"] == "Property";
}

function getColor(cardData) {
    var color = cardData.data.value["Color"];
    if (color == "Brown (Dark Purple)") {
        color = "Brown";
    } else if (color == "Dark Blue") {
        color = "Indigo";
    } else if (color == "Light Blue") {
        color = "Blue";
    } else if (color == undefined || color.trim() == "") {
        color = "White";
    }
    return color;
}

function shouldBuy(cardData, donutNumber) {
    return d3.interpolateGreys(1 - getProbability(cardData, donutNumber));
}

function getHouses(cardData, donutNumber) {
    if (getProbability(cardData, donutNumber) > 0.7 && getProbability(cardData, donutNumber) <= 0.9) {
        return "./files/home.svg";
    } else {
        return "";
    }
}

function getHotel(cardData, donutNumber) {
    if (getProbability(cardData, donutNumber) > 0.9) {
        return "./files/hotel.svg";
    } else {
        return "";
    }
}

function getProbability(cardData, donutNumber) {
    if (donutNumber == 1) {
        return probabilities1[parseInt(cardData.data.value["Square"])];
    } else {
        return probabilities2[parseInt(cardData.data.value["Square"])];
    }

}

function createInnerDonut(svg, data_ready, innerRadius, outerRadius, donutNumber) {
    var arc = d3.arc()
    	.outerRadius(outerRadius)
    	.innerRadius(innerRadius);
    houses = svg
        .selectAll('arc')
        .data(data_ready)
        .enter();
    houses    
        .append('path')
        .attr('d', arc)
        .attr("transform", "translate(" + 710 + "," + 710 + ")")
        .attr('fill', function(d) { return shouldBuy(d, donutNumber); })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.5)
    houses
        .append("g")   
        .attr("transform", function(d) {
            var _d = arc.centroid(d);
            _d[0] = _d[0] + 710;	//multiply by a constant factor
            _d[1] = _d[1] + 710;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .append("svg:image")
        .attr("xlink:href", function(d) { return getHouses(d, donutNumber); })
        .attr("width", 30)
        .attr("height", 30);
    houses
        .append("g")   
        .attr("transform", function(d) {
            var _d = arc.centroid(d);
            _d[0] = _d[0] + 710;	//multiply by a constant factor
            _d[1] = _d[1] + 710;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .append("svg:image")
        .attr("xlink:href", function(d) { return getHotel(d, donutNumber); })
        .attr("width", 30)
        .attr("height", 30);
}

