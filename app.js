const svgHeight = 400
const svgWidth = 1000

const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    }

const chartHeight = svgHeight - margin.top - margin.bottom
const chartWidth = svgWidth - margin.left - margin.right

const parseDate = d3.timeParse("%d-%b")

const svg = d3.select("body").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

const chartG = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

d3.csv("mojoData.csv").then(data => {

    const x = d3.scaleTime()
        .domain(d3.extent(data.map(d => parseDate(d.date))))
        .range([0,chartWidth])

    const y = d3.scaleLinear()
        .domain([0, d3.max([
            ...data.map(d => parseInt(d.morning)),
            ...data.map(d => parseInt(d.evening)),
            ]),
        ])
        .range([chartHeight, 0])

    const yAxis = d3.axisLeft(y)
    const xAxis = d3.axisBottom(x)

    chartG.append("g")
        .call(yAxis)

    chartG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)
    const lineMorning = d3.line()
        .x(d => x(parseDate(d.date)))
        .y(d => y(d.morning))

    const lineEvening = d3.line()
        .x(d => x(parseDate(d.date)))
        .y(d => y(d.evening))

    chartG.append("path")
        .attr("d", lineMorning(data))
        .attr("fill", "none")
        .attr("stroke", "#000000")

    chartG.append("path")
        .attr("d", lineEvening(data))
        .attr("fill", "none")
        .attr("stroke", "#0000FF")



})