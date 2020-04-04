// Example 1


// Example 2

var probabilities1 = Array.from({length: 40}, () => Math.random());
var probabilities2 = Array.from({length: 40}, () => Math.random());

var propertyWidth = 220;
var propertyHeight = 300;
var propertyX = 600;
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
var propertyStats = d3.select("#drawhere")
    .append("text")
    .attr("id", "propertyStats")
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
            propertyRents.append("tspan").text("Rent: " + cardData.data.value["Rent"][0]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 1) {
            propertyRents.append("tspan").text("Rent with 1 House: " + cardData.data.value["Rent"][1]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 2) {
            propertyRents.append("tspan").text("Rent with 2 Houses: " + cardData.data.value["Rent"][2]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 3) {
            propertyRents.append("tspan").text("Rent with 3 Houses: " + cardData.data.value["Rent"][3]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 4) {
            propertyRents.append("tspan").text("Rent with 4 Houses: " + cardData.data.value["Rent"][4]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 5) {
            propertyRents.append("tspan").text("Rent with Hotel: " + cardData.data.value["Rent"][5]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
    }
    if (cardData.data.value["Type"] == "Railroad") {
        if (cardData.data.value["Rent"] != undefined) {
            propertyRents.append("tspan").text("Rent: " + cardData.data.value["Rent"][0]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 1) {
            propertyRents.append("tspan").text("Rent with 1 other railroad: " + cardData.data.value["Rent"][1]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 2) {
            propertyRents.append("tspan").text("Rent with 2 other railroads: " + cardData.data.value["Rent"][2]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
        if (cardData.data.value["Rent"] != undefined && cardData.data.value["Rent"].length > 3) {
            propertyRents.append("tspan").text("Rent with all the railroads: " + cardData.data.value["Rent"][3]).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
        }
    }
    propertyStats.append("tspan").text("Probability of landing: " + cardData.data.value["p_landings"].toFixed(3)).attr("x", propertyX + propertyWidth/2).attr("dy", 20);
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
    if (cardData.data.value["strategies"][donutNumber]["recommendation"] <= 0) {
        return d3.interpolateReds(0.7);
    } else if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 1) {
        return d3.interpolateGreens(0.2);
    } else if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 2) {
        return d3.interpolateGreens(0.4);
    } else if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 3) {
        return d3.interpolateGreens(0.5);
    } else if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 4) {
        return d3.interpolateGreens(0.6);
    } else if (cardData.data.value["strategies"][donutNumber]["recommendation"] >= 5) {
        return d3.interpolateGreens(0.7);
    }
    return d3.interpolateGreens(0.5);
}

function getHouses(cardData, donutNumber) {
    if (cardData.data.value["is_label_card"]) {
        return;
    }
    if (cardData.data.value["Type"] == "Street") {
        if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 1) {
            return "./files/one-home.svg";
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 2) {
            return "./files/two-homes.svg";
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 3) {
            return "./files/three-homes.svg";
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 4) {
            return "./files/four-homes.svg";
        } else {
            return "";
        }
    }
    if (cardData.data.value["Type"] == "Railroad") {
        if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 1) {
            return "./files/one-train.svg";
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 2) {
            return "./files/two-trains.svg";
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 3) {
            return "./files/three-trains.svg";
        } if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 4) {
            return "./files/four-trains.svg";
        } else {
            return "";
        }
    }
    
}

function getHotel(cardData, donutNumber) {
    if (cardData.data.value["is_label_card"]) {
        return;
    }
    if (cardData.data.value["strategies"][donutNumber]["recommendation"] == 5) {
        return "./files/hotel.svg";
    } else {
        return "";
    }
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
        .data(data_ready)
        .attr("x", 7 * (4 - donutNumber))
        .attr("dy", 20)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#strategyRing' + donutNumber + "card" + d.data.value['ID']; })
        .text(function (d) { return getStrategyLabelText(d, donutNumber);});
    houses
        .append("g")   
        .attr("transform", function(d) {
            var _d = arc.centroid(d);
            _d[0] = _d[0] + 680;	//multiply by a constant factor
            _d[1] = _d[1] + 680;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .append("svg:image")
        .attr("xlink:href", function(d) { return getHouses(d, donutNumber); })
        .attr("width", 70)
        .attr("height", 70)
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
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
        .attr("height", 30)
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
            .innerRadius(670)         // This is the size of the donut hole
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
        .data(data_ready)
        .attr("x", getPropertyLabelTextOffset)
        .attr("dy", 20)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#outerRing' + d.data.value['ID']; }) //place the ID of the path here
        .text(getPropertyColorLabelText);

    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('id', function(d) { return 'innerRing' + d.data.value['ID']; })
        .attr('d', d3.arc()
            .innerRadius(600)         // This is the size of the donut hole
            .outerRadius(670)
        )
        .attr("transform", "translate(" + 710 + "," + 710 + ")")
        .attr('fill', "white")
        .attr("stroke", "black")
        .style("stroke-width", "1px")
        .on("mouseover", mouseOver)
        .on("mouseout", mouseOut);
        
    svg.append("text")
        .data(data_ready)
        .attr("x", 30)
        .attr("dy", 40)
        .append("textPath") //append a textPath to the text element
        .attr("xlink:href", function(d) { return '#innerRing' + d.data.value['ID']; }) //place the ID of the path here
        .text(getStrategyText);

    createInnerDonut(svg, data_ready, 500, 600, 0);
    createInnerDonut(svg, data_ready, 400, 500, 1);
    createInnerDonut(svg, data_ready, 300, 400, 2);
    // createProbabilityLine(svg, data_ready, 200, 250);
}

function getPropertyColorLabelText(cardData) {
    if (cardData.data.value["is_label_card"]) {
        return cardData.data.value["property_name_label"];
    } else {
        if (cardData.data.value["Name"].length >= 16) {
            return cardData.data.value["Name"].substring(0, 16) + "..";
        } else {
            return cardData.data.value["Name"];
        }
        
    }
}

function getPropertyLabelTextOffset(cardData) {
    console.log("getPropertyLabelTextOffset");
    console.log(cardData.data.value["Name"]);
    if (cardData.data.value["is_label_card"]) {
        return 15;
    } 
    if (cardData.data.value["Name"].length >= 16) {
        return 15;
    } else {
        return (16 - cardData.data.value["Name"].length) * 7;
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