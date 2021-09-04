import { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom } from 'd3';

let svg
let widthsvg, heightsvg
let givenData
let graphicTab = 'housingExpenditure'

const render = data => {
    const yValue = d => d.country
    const margin = { top: 0, right: 20, bottom: 20, left: 180 };
    const innerWidth = widthsvg - margin.left - margin.right;
    const innerHeight = heightsvg - margin.top - margin.bottom;

    const xScale = scaleLinear()
      .domain([0, max(data, d => d[graphicTab])])
      .range([0, innerWidth]);

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const yAxis = axisLeft(yScale)
    const xAxis = axisBottom(xScale);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    yAxis(g.append('g'));
    xAxis(g.append('g').attr('transform', `translate(0, ${innerHeight})`))
        

    g.selectAll('rect').data(data)
      .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(d[graphicTab]))
        .attr('height', yScale.bandwidth())
          .append('title')
          .text((item) => {
              return item[graphicTab]
          })
  }

export const changeGraphic = type => {
    graphicTab = type
    svg.selectAll("*").remove()
    render(givenData)
}

export const init = () => {
    svg = select('svg')
    widthsvg = +svg.attr('width')
    heightsvg = +svg.attr('height')
    //lectura del csv
    csv('data.csv').then(data => {
        data.forEach(values => {
            Object.keys(values).forEach(category => {
                if (category !== 'country') {
                    values[category] = +values[category]
                }
            })
        })
        givenData = data;
        render(givenData)
    })
}