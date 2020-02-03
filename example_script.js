// Example 1
d3.select("body").style("background-color", "black");

// Example 2
d3.select("body")
  .append("svg")
    .attr("height", 500)
    .attr("width", 500)
    .attr("id", "drawhere")

// Example 3
d3.select("#drawhere")
  .append("rect")
    .attr("height", 500)
    .attr("width", 500)
    .attr("id", "background")
    .attr("fill", "white")

// Example 4
d3.select("#drawhere")
  .append("g")
    .attr("id", "rectangles")
d3.select("#drawhere")
    .append("g")
    .attr("id", "circles")

// Example 5
let colors = ["red", "blue", "black"]
for (let i=0; i < colors.length; i++) {
    d3.select("#rectangles")
      .append("rect")
        .attr("height", 25)
        .attr("width", 25)
        .attr("x", 35*i)
        .attr("y", 20)
        .attr("fill", colors[i])

    d3.select("#circles")
      .append("circle")
        .attr("r", 12)
        .attr("cx", 12 + 35*i)
        .attr("cy", 80)
        .attr("fill", colors[i])
}

// Example 6
d3.select("#rectangles")
  .attr("transform", "translate(150, 150)")
  
// console.log(d3.selectAll("rect,circle"))

d3.selectAll("rect, circle")
  .filter((x,i) => i%2==1)
  .attr("fill", "grey")

d3.csv("./data.csv")
  .then( (data) => {
      console.log(data);
  })










