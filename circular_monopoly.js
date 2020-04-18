
var probabilities1 = Array.from({length: 40}, () => Math.random());
var probabilities2 = Array.from({length: 40}, () => Math.random());

var propertyWidth = 270;
var propertyHeight = 300;
var propertyX = 580;
var propertyY = 550;

var minProbability = 0;
var maxProbability = 0;

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
    .attr("height", propertyHeight / 9)
    .attr("width", propertyWidth)
    .attr("x", propertyX)
    .attr("y", propertyY)
    .style("visibility", "hidden")
    .style("stroke", "black")
    .style("fill", "none");
var propertyName = d3.select("#drawhere")
    .append("text")
    .attr("font-family", "Oswald")
    .attr("id", "propertyName")
    .attr("x", propertyX + propertyWidth/2)
    .attr("y", propertyY + 27)
    .attr("font-size", "1.5em")
    .attr("text-anchor", "middle")
    .style("visibility", "hidden");
var propertyRents = d3.select("#drawhere")
    .append("text")
    .attr("font-family", "Oswald")
    .attr("font-size", "1.3em")
    .attr("id", "propertyRents")
    .attr("text-anchor", "middle")
    .attr("x", propertyX + propertyWidth/2)
    .attr("y", propertyY + 40)
    .style("visibility", "hidden");
var propertyStats = d3.select("#drawhere")
    .append("text")
    .attr("font-family", "Oswald")
    .attr("id", "propertyStats")
    .attr("font-size", "1.3em")
    .attr("text-anchor", "middle")
    .attr("x", propertyX + propertyWidth/2)
    .attr("y", propertyY + propertyHeight - 50)
    .style("visibility", "hidden");
    
function mouseOver(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return;
    }
    propertyName.text(cardData.data.value["Name"]);
    propertyColour.style("fill", getColor(cardData)).style("opacity", 0.5);
    if (cardData.data.value["Type"] == "Street") {
        if (cardData.data.value["Rent"] != undefined) {
            propertyRents.append("tspan").text("Rent: " + cardData.data.value["Rent"][0]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 1) {
            propertyRents.append("tspan").text("Rent with 1 House: " + cardData.data.value["Rent"][1]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 2) {
            propertyRents.append("tspan").text("Rent with 2 Houses: " + cardData.data.value["Rent"][2]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 3) {
            propertyRents.append("tspan").text("Rent with 3 Houses: " + cardData.data.value["Rent"][3]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 4) {
            propertyRents.append("tspan").text("Rent with 4 Houses: " + cardData.data.value["Rent"][4]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 5) {
            propertyRents.append("tspan").text("Rent with Hotel: " + cardData.data.value["Rent"][5]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
    }
    if (cardData.data.value["Type"] == "Railroad") {
        if (cardData.data.value["Rent"] != undefined) {
            propertyRents.append("tspan").text("Rent: " + cardData.data.value["Rent"][0]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 1) {
            propertyRents.append("tspan").text("Rent with 1 other railroad: " + cardData.data.value["Rent"][1]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 2) {
            propertyRents.append("tspan").text("Rent with 2 other railroads: " + cardData.data.value["Rent"][2]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 3) {
            propertyRents.append("tspan").text("Rent with all the railroads: " + cardData.data.value["Rent"][3]).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
        }
    }
    propertyStats.append("tspan").text("Probability of landing: " + cardData.data.value["p_landings"].toFixed(3)).attr("x", propertyX + propertyWidth/2).attr("dy", 25);
    propertyRents.style("visibility", "visible");
    propertyStats.style("visibility", "visible");
    propertyColour.style("visibility", "visible");
    propertyName.style("visibility", "visible");
    property.style("visibility", "visible");
}

function mouseOut(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return;
    }
    propertyColour.style("visibility", "hidden");
    propertyName.style("visibility", "hidden");
    propertyRents.style("visibility", "hidden");
    propertyRents.selectAll("*").remove();
    propertyStats.style("visibility", "hidden");
    propertyStats.selectAll("*").remove();
    property.style("visibility", "hidden");
}

var line = d3.lineRadial()
    		.angle(function(d) { return getAngle(d); })
    		.radius(function(d) { return getRadius(d); });

function isPurchaseableCard(card) {
  return card["Type"] == "Utility" || card["Type"] == "Railroad" || card["Type"] == "Street";
}

function getColor(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return "White";
    }
    var color = cardData.data.value["Color"];
    if (color == "Brown (Dark Purple)") {
        color = "Brown";
    } else if (color == "Dark Blue") {
        color = "Indigo";
    } else if (color == "Light Blue") {
        color = "Blue";
    } else if (color == "Green") {
        color = "Lawngreen";
    } else if (color == undefined || color.trim() == "") {
        color = "White";
    }
    return color;
}

function shouldBuy(cardData, donutNumber) {
    if (cardData.data.value["is_label_card"]) {
        return "White";
    }
    return recommendationColour(cardData.data.value["strategies"][donutNumber]["recommendation"]);
}

function recommendationColour(recommendation) {
    if (recommendation <= 0) {
        return d3.interpolateReds(0.7);
    } else if (recommendation == 1) {
        return d3.interpolateGreens(0.2);
    } else if (recommendation == 2) {
        return d3.interpolateGreens(0.4);
    } else if (recommendation == 3) {
        return d3.interpolateGreens(0.5);
    } else if (recommendation == 4) {
        return d3.interpolateGreens(0.6);
    } else if (recommendation >= 5) {
        return d3.interpolateGreens(0.7);
    }
    return d3.interpolateGreens(0.5);
}

function getIcons(cardData, donutNumber, lineNumber) { 
    if (cardData.data.value["is_label_card"]) {
        return;
    }
    var icon = "\uf015";
    if (cardData.data.value["Type"] == "Street") {
        icon = "\uf015";
    }
    if (cardData.data.value["Type"] == "Railroad") {
        icon = "\uf239";
    }
    if (lineNumber == 1) {
        if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 1) {
            return icon;
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] >= 2) {
            return icon + " " + icon;
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 5) {
            return "\uf0f7";
        } else {
            return "";
        }
    }
    if (lineNumber == 2) {
        if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 3) {
            return icon;
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 4) {
            return icon + " " + icon;
        } else {
            return "";
        }
    }
    
}

function getIconsSpacing(cardData, donutNumber, lineNumber) {
    var recommendation = 1;
    if (cardData.data.value["strategies"] != undefined 
        && cardData.data.value["strategies"][donutNumber] != undefined) {
        recommendation = cardData.data.value["strategies"][donutNumber]["recommendation"]
    }
    return 7 * (4 - donutNumber) + 9 * (3 - recommendation + (lineNumber - 1) * 2);
}

function getAngle(cardData) {
    return 2 * Math.PI * parseInt(cardData.data.value["ID"]) / 28;
}

function getRadius(cardData) {
    return (cardData.data.value["p_landings"] - minProbability)/(maxProbability - minProbability) * 250 + 150;
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
        .attr('id', function(d) { return 'strategyRing' + donutNumber + "card" + d.data.value['ID']; })
        .attr('d', arc)
        .attr("transform", "translate(" + 710 + "," + 710 + ")")
        .attr('fill', function(d) { return shouldBuy(d, donutNumber); })
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
    houses.append("text")
        .attr("font-family", "Oswald")
        .attr("font-size", "1.3em")
        .data(data_ready)
        .attr("x", 7 * (4 - donutNumber))
        .attr("dy", 30)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#strategyRing' + donutNumber + "card" + d.data.value['ID']; })
        .text(function (d) { return getStrategyLabelText(d, donutNumber);});
        
    houses.append("text")
        .attr("font-family","FontAwesome")
        .attr('font-size', function(d) { return '30px';} )
        .data(data_ready)
        .attr("x", function(d) { return getIconsSpacing(d, donutNumber); })
        .attr("dy", 70)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#strategyRing' + donutNumber + "card" + d.data.value['ID']; })
        .text(function(d) { return getIcons(d, donutNumber); })
        .append("tspan").text(function(d) { return getIcons(d, donutNumber, 1); }).attr("x", function(d) { return getIconsSpacing(d, donutNumber, 1); }).attr("dy", 50)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .append("tspan").text(function(d) { return getIcons(d, donutNumber, 2); }).attr("x", function(d) { return getIconsSpacing(d, donutNumber, 2); }).attr("dy", 35)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
}

function createProbabilityLine(svg, data_ready, innerRadius, outerRadius) {
    var arc = d3.arc()
    	.outerRadius(outerRadius)
    	.innerRadius(innerRadius);
    var completeData = [...data_ready];
    var lastElement = {};
    Object.assign(lastElement, completeData[0]);
    lastElement["ID"] = 28;
    completeData.push(lastElement);
    probabilityLine = svg
        .selectAll('arc')
        .data(completeData)
        .enter();
    probabilityLine    
        .append('path')
        .datum(completeData)
        .attr("transform", "translate(" + 710 + "," + 710 + ")")
        .attr("fill", "none")
        .attr("stroke", "#4099ff")
        .attr("d", line);
}

var country = getParameterByName("country") == undefined ? "singapore" : getParameterByName("country");
d3.json("https://monopoly-nus.appspot.com/api/locations/" + country).then( propertyData => {
    d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/2").then( strategy3Data => {
        d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/4").then( strategy4Data => {
            d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/6").then( strategy5Data => {
                buildCircularChart(
                    propertyData.locations, 
                    [strategy3Data.locations, strategy4Data.locations, strategy5Data.locations]
                );
            });
        });
    });
});

function buildCircularChart(properties, strategies) {
    for (let x = 0; x < properties.length; x++) {
        currentProperty = properties[x];
        currentProperty["p_landings"] = strategies[0][x]["p_landings"];
        currentProperty["strategies"] = []
        for (let y = 0; y < strategies.length; y++) {
            var strategy = {};
            strategy["recommendation"] = strategies[y][x]["recommendation"];
            strategy["build_order"] = strategies[y][x]["build_order"];
            strategy["build_cost"] = strategies[y][x]["build_cost"];
            strategy["expected_cost"] = strategies[y][x]["expected_cost"];
            strategy["expected_rent"] = strategies[y][x]["expected_rent"];
            currentProperty["strategies"].push(strategy);
        }
        if (strategies[0][x]["p_landings"] < minProbability) {
            minProbability = strategies[0][x]["p_landings"];
        }
        if (strategies[0][x]["p_landings"] > maxProbability) {
            maxProbability = strategies[0][x]["p_landings"];
        }
    }
    var cardData = properties.filter(isPurchaseableCard);
    for (let step = 0; step < cardData.length; step++) {
        cardData[step]["ID"] = step;
    }
    var labelCard = {
        "ID": -1,
        "is_label_card": true,
        "property_color_label": "Colour of Property",
        "property_name_label": "Name of Property",
        "strategy_labels": [
            "3 players",
            "5 players",
            "7 players"
        ]
    }
    cardData.unshift(labelCard);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function(d) {return 1; })
    var data_ready = pie(d3.entries(cardData))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    
    var outerRing = svg
        .selectAll('whatever')
        .data(data_ready)
        .enter();
    
    outerRing.append('path')
        .attr('id', function(d) { return 'outerRing' + d.data.value['ID']; })
        .attr('d', d3.arc()
            .innerRadius(660)         // This is the size of the donut hole
            .outerRadius(700)
        )
        .attr("transform", "translate(" + 710 + "," + 710 + ")")
        .attr('fill', getColor)
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", 0.5)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
        
    outerRing.append("text")
        .attr("font-family", "Oswald")
        .attr("font-size", "1.3em")
        .data(data_ready)
        .attr("x", getPropertyLabelTextOffset)
        .attr("dy", 25)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#outerRing' + d.data.value['ID']; }) //place the ID of the path here
        .text(getPropertyColorLabelText);

    createInnerDonut(svg, data_ready, 560, 660, 0);
    createInnerDonut(svg, data_ready, 460, 560, 1);
    createInnerDonut(svg, data_ready, 360, 460, 2);
}

function getPropertyColorLabelText(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return cardData.data.value["property_name_label"];
    } else {
        if (cardData.data.value["Name"].length >= 14) {
            return cardData.data.value["Name"].substring(0, 14) + "..";
        } else {
            return cardData.data.value["Name"];
        }
        
    }
}

function getPropertyLabelTextOffset(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return 10;
    } 
    if (cardData.data.value["Name"].length >= 14) {
        return 13;
    } else {
        return (15 - cardData.data.value["Name"].length) * 8;
    }
}

function getStrategyLabelText(cardData, donutNumber) {
    if (cardData.data.value["is_label_card"]) {
        return cardData.data.value["strategy_labels"][donutNumber];
    }
}

function getStrategyText(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return "Strategy For";
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var legendSvg = d3.select("#drawhere")

// create a list of keys
var keys = [-1, 0, 1, 2, 3]
var labels = ["Not Recommended", "Can Consider", "Recommended", "Strongly Recommended", "Very Strongly Recommended"]


var size = 25
legendSvg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 1500)
    .attr("y", function(d,i){ return 100 + i*(size+5)})
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ console.log(d); return recommendationColour(d + 1)})

// Add one dot in the legend for each name.
legendSvg.selectAll("mylabels")
  .data(labels)
  .enter()
  .append("text")
    .attr("font-family", "Oswald")
    .attr("font-size", "1.3em")
    .attr("x", 1500 + size*1.4)
    .attr("y", function(d,i){ return 100 + i*(size+5) + (size/2)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")