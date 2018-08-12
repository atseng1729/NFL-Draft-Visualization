import React from 'react';
import {scaleBand} from 'd3-scale';

class PlotComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data,
      teams,
      selectedTeam,
      selectedName,
      mikeMayock,
      mattMiller,
      selectedPosition,
      modifySelectedTeam,
      modifySelectedName,
      modifyMikeMayock,
      modifyMattMiller,
      modifySelectedPosition
    } = this.props;
    const height = 1000;
    const width = 1000;
    const margin = {left: 20, right: 160, bottom: 20, top: 20};
    const plotHeight = height - margin.top - margin.bottom;
    const plotWidth = width - margin.left - margin.right;
    const rectHeight = plotHeight / 32;
    const rectWidth = plotWidth / 32;
    const radius = rectWidth / 3;
    const xScale = scaleBand().domain(teams).range([margin.left, plotWidth]);
    const labelFont = 15;

    function colorScale(avg) {
      if (avg === 0) {
        return '#FFFFFF';
      } else if (avg < 3) {
        return '#FEDADC';
      } else if (avg < 6) {
        return '#FEB6B9';
      } else if (avg < 9) {
        return '#FE9297';
      } else if (avg < 12) {
        return '#FD6E74';
      } else if (avg < 15) {
        return '#FD4A51';
      } else if (avg < 21) {
        return '#FD262F';
      }
      return '#FF0000';
    }
    function checkMiss(value) {
      if (value === '999') {
        return 'DNP';
      }
      return value;
    }

    return (
      <div className="plot-container" >
        <svg width={width} height={height}>
          <g className="xScale-axis" >
            {teams.map((team, idx) => {
              return (
                // modify text size for x scale axis
                <text x={xScale(team) + margin.left / 2 + radius} y={margin.top / 2}
                  style={{fill: 'white', fontSize: 8, textAlign: 'center'}}>
                  {team}
                </text>
              );
            })}
          </g>
          {data.map((row, idx) => {
            return (
              <g className="row-container" transform={`translate(0, ${idx * rectHeight + margin.top})`}
                key={idx} id={row.pick} style={{fill: 'white', fontSize: 12}}>
                <text style={{fontSize: 12, fill: 'white'}}
                  x={margin.left / 2} y={`${rectHeight * 0.6}`}>{row.pick}</text>
                <g className="teams-container"
                  id={`${row.pick}`}
                  transform={`translate(${margin.left}, 0)`}>
                  {row.pickedTeams.map((pickedTeam, i) => {
                    const team = pickedTeam.Team;
                    return (
                      <circle
                        cx={xScale(team) + rectWidth / 2}
                        cy={rectHeight / 2}
                        r={radius}
                        fill={colorScale(Number(pickedTeam.Avg))}
                        onMouseOver={() => {
                          modifySelectedTeam(team);
                          modifySelectedName(pickedTeam.Actual);
                          modifyMikeMayock(checkMiss(pickedTeam.Mayock));
                          modifyMattMiller(checkMiss(pickedTeam.Miller));
                          modifySelectedPosition([
                            xScale(team) + rectWidth + margin.left,
                            idx * rectHeight + rectHeight + margin.top]);
                        }}
                      />
                    );
                  })}
                </g>
              </g>
            );
          })}

          <g width={300} height={300} id="team-description"
            style={{fill: '#dddddd', fontSize: labelFont, textAlign: 'left'}}>
            <text x={selectedPosition[0]} y={selectedPosition[1]}>{selectedName}</text>
            <text x={height - margin.right + radius} y={margin.top + 11 * labelFont}>{'Player Info:'}</text>
            <text x={height - margin.right + radius} y={margin.top + 12 * labelFont}>
              {`Team: ${selectedTeam}`}</text>
            <text x={height - margin.right + radius} y={margin.top + 13 * labelFont}>
              {`Mike Mayock: ${mikeMayock}`}</text>
            <text x={height - margin.right + radius} y={margin.top + 14 * labelFont}>
              {`Matt Miller: ${mattMiller}`}</text>
          </g>
          <g width={300} height={300} id="legend"
            style={{fontSize: labelFont, fill: '#dddddd'}}>
            <circle cx={height - margin.right + 2 * radius} cy={margin.top / 2}
              r={radius} fill={colorScale(0)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + radius / 2}>{'Right on'}</text>
            <circle cx={height - margin.right + 2 * radius}
              cy={margin.top / 2 + labelFont + radius / 2} r={radius} fill={colorScale(2)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + labelFont + radius}>{'Within 3'}</text>
            <circle cx={height - margin.right + 2 * radius}
              cy={margin.top / 2 + 2 * labelFont + radius} r={radius} fill={colorScale(5)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + 2 * labelFont + 1.5 * radius}>{'Within 6'}</text>
            <circle cx={height - margin.right + 2 * radius}
              cy={margin.top / 2 + 3 * labelFont + 1.5 * radius} r={radius} fill={colorScale(8)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + 3 * labelFont + 2 * radius}>{'Within 9'}</text>
            <circle cx={height - margin.right + 2 * radius}
              cy={margin.top / 2 + 4 * labelFont + 2 * radius} r={radius} fill={colorScale(11)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + 4 * labelFont + 2.5 * radius}>{'Within 12'}</text>
            <circle cx={height - margin.right + 2 * radius}
              cy={margin.top / 2 + 5 * labelFont + 2.5 * radius} r={radius} fill={colorScale(14)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + 5 * labelFont + 3 * radius}>{'Within 15'}</text>
            <circle cx={height - margin.right + 2 * radius}
              cy={margin.top / 2 + 6 * labelFont + 3 * radius} r={radius} fill={colorScale(20)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + 6 * labelFont + 3.5 * radius}>{'Within 21'}</text>
            <circle cx={height - margin.right + 2 * radius}
              cy={margin.top / 2 + 7 * labelFont + 3.5 * radius} r={radius} fill={colorScale(999)}/>
            <text x={height - margin.right + 4 * radius}
              y={margin.top / 2 + 7 * labelFont + 4 * radius}>{'DNP'}</text>
          </g>
        </svg>
      </div>
    );
  }
}
PlotComponent.displayName = 'PlotComponent';
export default PlotComponent;
