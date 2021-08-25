const data = [
    { state: 'Day1', cases: 8000 },
    { state: 'Day2', cases: 76000 },
    { state: 'Day3', cases: 900000 },
    { state: 'Day4', cases: 8200000 },
    { state: 'Day5', cases: 90000000 },
    { state: 'Day6', cases: 750000000 },
    { state: 'Day7', cases: 86000 },
  ];
  
  const width = 900;
  const height = 650;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLog()
    .base(10)
    .domain([1, 10000000000])
    .range([height - margin.bottom, margin.top])

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;}
  
  svg
    .append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.cases))
      .attr('title', (d) => d.cases)
      .attr("class", "rect")
      .attr("fill", "#c6f74b")
      .attr("height", d => y(1) - y(d.cases))
      .attr("width", x.bandwidth());

    var bar = svg.selectAll("g");


    bar
    .append("text")
    .data(data)
    .join("text")
    .attr("x", (d, i) => x(i)+10)
    .attr("y", d => y(d.cases)-5 )
    .attr("font-weight", 'bold')
    .attr("fill", 'brown')
    .text((d)=>d.cases);
  
  
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].state))
      .attr("font-size", '20px')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
