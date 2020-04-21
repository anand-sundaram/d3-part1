var propertyWidth = 400;
var propertyHeight = 500;
var propertyX = 2600;
var propertyY = 1020;

var minProbability = 0;
var maxProbability = 0;

var svg = d3.select("body")
    .append("svg")
    .attr("height", 3100)
    .attr("width", 3100)
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
    .attr("y", propertyY + 35)
    .attr("font-size", "2em")
    .attr("text-anchor", "middle")
    .style("visibility", "hidden");
var propertyRents = d3.select("#drawhere")
    .append("text")
    .attr("font-family", "Oswald")
    .attr("font-size", "2em")
    .attr("id", "propertyRents")
    .attr("text-anchor", "middle")
    .attr("x", propertyX + propertyWidth/2)
    .attr("y", propertyY + 80)
    .style("visibility", "hidden");
var propertyStats = d3.select("#drawhere")
    .append("text")
    .attr("font-family", "Oswald")
    .attr("id", "propertyStats")
    .attr("font-size", "2em")
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
            propertyRents.append("tspan").text("Rent: " + cardData.data.value["Rent"][0]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 1) {
            propertyRents.append("tspan").text("Rent with 1 House: " + cardData.data.value["Rent"][1]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 2) {
            propertyRents.append("tspan").text("Rent with 2 Houses: " + cardData.data.value["Rent"][2]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 3) {
            propertyRents.append("tspan").text("Rent with 3 Houses: " + cardData.data.value["Rent"][3]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 4) {
            propertyRents.append("tspan").text("Rent with 4 Houses: " + cardData.data.value["Rent"][4]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 5) {
            propertyRents.append("tspan").text("Rent with Hotel: " + cardData.data.value["Rent"][5]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
    }
    if (cardData.data.value["Type"] == "Railroad") {
        if (cardData.data.value["Rent"] != undefined) {
            propertyRents.append("tspan").text("Rent: " + cardData.data.value["Rent"][0]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 1) {
            propertyRents.append("tspan").text("Rent with 1 other railroad: " + cardData.data.value["Rent"][1]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 2) {
            propertyRents.append("tspan").text("Rent with 2 other railroads: " + cardData.data.value["Rent"][2]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 3) {
            propertyRents.append("tspan").text("Rent with all the railroads: " + cardData.data.value["Rent"][3]).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
        }
    }
    propertyStats.append("tspan").text("Probability of landing: " + cardData.data.value["p_landings"].toFixed(3)).attr("x", propertyX + propertyWidth/2).attr("dy", 40);
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
        return '#A020F0';
    } else if (color == "Dark Blue") {
        return "DarkBlue";
    } else if (color == "Light Blue") {
        return '#ADD8E6'
    } else if (color == "Green") {
        return "Green";
    } else if (color == undefined || color.trim() == "") {
        return "White";
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
    // if (recommendation <= 0) {
    //     return d3.interpolateReds(0.7);
    // } else if (recommendation == 1) {
    //     return d3.interpolateGreens(0.2);
    // } else if (recommendation == 2) {
    //     return d3.interpolateGreens(0.4);
    // } else if (recommendation == 3) {
    //     return d3.interpolateGreens(0.5);
    // } else if (recommendation == 4) {
    //     return d3.interpolateGreens(0.6);
    // } else if (recommendation >= 5) {
    //     return d3.interpolateGreens(0.7);
    // }
    // return d3.interpolateGreens(0.5);
    if (recommendation <= 0) {
        return d3.interpolateReds(0.10);
    } else if (recommendation == 1) {
        return d3.interpolateReds(0.25);
    } else if (recommendation == 2) {
        return d3.interpolateReds(0.35);
    } else if (recommendation == 3) {
        return d3.interpolateReds(0.45);
    } else if (recommendation == 4) {
        return d3.interpolateReds(0.55);
    } else if (recommendation >= 5) {
        return d3.interpolateReds(0.65);
    }
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
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] >= 2 
    && cardData.data.value["strategies"][donutNumber]["recommendation"] < 5) {
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
    if (recommendation == 1 || recommendation == 5) {
        return 10 * (donutNumber + 3)
    }
    if (recommendation == 2 || recommendation == 4) {
        return 10 * (donutNumber + 3) - 9
    }
    if (lineNumber == 2) {
        return 10 * (donutNumber + 3) + 9;
    }
    return 10 * (donutNumber + 3) - 9;
        
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
        .attr("transform", "translate(" + 1240 + "," + 1240 + ")")
        .attr('fill', function(d) { return shouldBuy(d, donutNumber); })
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
    houses.append("text")
        .attr("font-family", "Oswald")
        .attr("font-size", "1.5em")
        .data(data_ready)
        .attr("x", 2 ^ donutNumber + 10 * (donutNumber + 1))
        .attr("dy", 30)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#strategyRing' + donutNumber + "card" + d.data.value['ID']; })
        .text(function (d) { return getStrategyLabelText(d, donutNumber);});
        
    houses.append("text")
        .attr("font-family","FontAwesome")
        .attr('font-size', function(d) { return '30px';} )
        .data(data_ready)
        .attr("x", function(d) { return getIconsSpacing(d, donutNumber, 0); })
        .attr("dy", 70)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#strategyRing' + donutNumber + "card" + d.data.value['ID']; })
        .text(function(d) { return getIcons(d, donutNumber); })
        .append("tspan").text(function(d) { return getIcons(d, donutNumber, 1); }).attr("x", function(d) { return getIconsSpacing(d, donutNumber, 1); }).attr("dy", 50)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut)
        .append("tspan").text(function(d) { return getIcons(d, donutNumber, 2); }).attr("x", function(d) { return getIconsSpacing(d, donutNumber, 2); }).attr("dy", 35)
        .on("mouseout", mouseOut);
}


var country = getParameterByName("country") == undefined ? "singapore" : getParameterByName("country");
d3.json("https://monopoly-nus.appspot.com/api/locations/" + country).then( propertyData => {
    d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/1").then( strategy1Data => {
        d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/2").then( strategy2Data => {
            d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/3").then( strategy3Data => {
                d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/4").then( strategy4Data => {
                    d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/5").then( strategy5Data => {
                        d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/6").then( strategy6Data => {
                            d3.json("https://monopoly-nus.appspot.com/api/basic/strategy/7").then( strategy7Data => {
                                buildCircularChart(
                                    propertyData.locations, 
                                    [
                                        strategy1Data.locations, 
                                        strategy2Data.locations, 
                                        strategy3Data.locations,
                                        strategy4Data.locations, 
                                        strategy5Data.locations, 
                                        strategy6Data.locations,
                                        strategy7Data.locations
                                    ]
                                );
                            });
                        });
                    });
                });
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
            "2 players",
            "3 players",
            "4 players",
            "5 players",
            "6 players",
            "7 players",
            "8 players"
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
        
    var curAngle = 0;
    var interval = null;
    var outerRadius = 1200;
    var innerRadius = outerRadius - 40;
    var translation = outerRadius + 40;
    var donutWidth = 120;
    
    outerRing.append('path')
        .attr('id', function(d) { return 'outerRing' + d.data.value['ID']; })
        .attr('d', d3.arc()
            .innerRadius(1160)         // This is the size of the donut hole
            .outerRadius(outerRadius)
        )
        .attr("transform", "translate(" + translation + "," + translation + ")")
        .attr('fill', getColor)
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .style("opacity", 0.5)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
        
    outerRing.append("text")
        .attr("font-family", "Oswald")
        .attr("font-size", "1.5em")
        .data(data_ready)
        .attr("x", getPropertyLabelTextOffset)
        .attr("dy", 30)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#outerRing' + d.data.value['ID']; }) //place the ID of the path here
        .text(getPropertyColorLabelText);

    var outerDonutRadius = innerRadius;
    var innerDonutRadius = innerRadius - donutWidth;
    for (let donutNumber = 6; donutNumber >= 0; donutNumber--) {
        createInnerDonut(svg, data_ready, innerDonutRadius, outerDonutRadius, donutNumber);
        outerDonutRadius = innerDonutRadius;
        innerDonutRadius = outerDonutRadius - donutWidth;
    }
}

function getPropertyColorLabelText(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return cardData.data.value["property_name_label"];
    } else {
        return cardData.data.value["Name"];
        if (cardData.data.value["Name"].length >= 25) {
            return cardData.data.value["Name"].substring(0, 25) + "..";
        } else {
            return cardData.data.value["Name"];
        }
    }
}

function getPropertyLabelTextOffset(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return 50;
    } 
    if (cardData.data.value["Name"].length >= 25) {
        return 7;
    } else {
        return (25 - cardData.data.value["Name"].length) * 4 + 10;
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
var keys = [-1, 0, 1, 2, 3, 4]
var labels = ["Not Recommended", "", "", "", "", "Very Strongly Recommended"]


var size = 35
legendSvg.selectAll("mydots")
  .data(keys)
  .enter()
  .append("rect")
    .attr("x", 2650)
    .attr("y", function(d,i){ return 100 + i*(size)})
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return recommendationColour(d + 1)})

// Add one dot in the legend for each name.
legendSvg.selectAll("mylabels")
  .data(labels)
  .enter()
  .append("text")
    .attr("font-family", "Oswald")
    .attr("font-size", "2em")
    .attr("x", 2650 + size*1.4)
    .attr("y", function(d,i){ return 100 + i*(size) + (size/2)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    
var iconKeys = ["\uf015", "\uf239", "\uf0f7"];
var iconLabels = ["House", "Subway", "Hotel"];
var size = 35
legendSvg.selectAll("mydots")
  .data(iconKeys)
  .enter()
  .append("text")
    .attr("font-family","FontAwesome")
    .attr('font-size', function(d) { return '40px';} )
    .attr("x", 2350)
    .attr("y", function(d,i){ return 110 + i*(60) + (size/2)})
    .text(function(d){ return d})

// Add one dot in the legend for each name.
legendSvg.selectAll("mylabels")
  .data(iconLabels)
  .enter()
  .append("text")
    .attr("font-family", "Oswald")
    .attr("font-size", "2em")
    .attr("x", 2350 + size*1.4)
    .attr("y", function(d,i){ return 100 + i*(60) + (size/2)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")