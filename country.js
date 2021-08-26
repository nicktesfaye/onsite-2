
  
  const csvUrl ="https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1"
  
  const fetchText= async (url) =>{
    const response = await fetch(url)
    return await response.text()
  };

  let country = []
  let cases =[]

  fetchText(csvUrl).then(text =>{
        
        covidData=d3.csvParse(text)
        for(let i=covidData.columns.length-42;i<covidData.columns.length;i+=3)
            country.push((covidData.columns[i].slice(12)).slice(0,-1))   
        for(let i=covidData.columns.length-40;i<covidData.columns.length;i+=3)
            cases.push((covidData.columns[i].slice(12)).slice(0,-2))
        cases[cases.length-1] = cases[cases.length-1].slice(0,-1)
  

  const width = 1600;
  const height = 700;
  const margin = { top: 50, bottom: 50, left: -50, right: 50 };
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(cases.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLog()
    .base(10)
    .domain([1, 800000000])
    .range([height - margin.bottom, margin.top])
  
    svg
    .append("g")
    .selectAll("rect")
    .data(cases)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", (d,i) => y(d))
      .attr("class", "rect")
      .attr("fill", "#c6f74b")
      .attr("height", d => y(1) - y(d))
      .attr("width", x.bandwidth());



    var bar = svg.selectAll("g");


    bar
    .append("text")
    .data(cases)
    .join("text")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d)-5 )
    .attr("class", "text")
    .attr("font-weight", 'bold')
    .attr("fill", 'brown')
    .text((d)=>d);
  

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, country.format))
      .attr("font-size", '20px')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
     .call(d3.axisBottom(x).tickFormat(i=>country[i]))
     .attr("font-size", '15px')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();

});