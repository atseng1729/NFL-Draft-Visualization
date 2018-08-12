import React from 'react';
import {csv} from 'd3-fetch';
import PlotComponent from './plotComponent';

class RootComponent extends React.Component {
  state = {
    loading: true,
    data: [],
    teams: [],
    selectedTeam: 'N/A',
    selectedName: '',
    mikeMayock: 'N/A',
    mattMiller: 'N/A',
    selectedPosition: [-100, -100]
  }

  componentWillMount() {
    // if the data you are going to import is small, then you can import it using es6 import
    // import MY_DATA from './data/example.json'
    // (I tend to think it's best to use screaming snake case for imported json)
    csv('data/data.csv')
      .then(rawData => {
        const picks = [...new Array(32)].map((d, i) => i + 1);
        const teams = Array.from(new Set(rawData.map(row => row.Team))).sort();
        const reformatData = picks.map(pick => {
          const selectRows = rawData.reduce((acc, row) => {
            if (Number(row.Pick) === pick) {
              acc.push(row);
            }
            return acc;
          }, []);

          return ({
            pick,
            pickedTeams: selectRows
          });
        });

        this.setState({
          loading: false,
          data: reformatData,
          teams
        });
      });
  }

  render() {
    const {
      loading,
      data,
      teams,
      selectedTeam,
      selectedName,
      mikeMayock,
      mattMiller,
      selectedPosition
    } = this.state;

    if (loading) {
      return <h1>LOADING</h1>;
    }

    return (
      <div className="flex center flex-column">

        <h1 style={{width: 1000}}>
          <img src="../data/NFL.svg" style={{width: 70, height: 70, align: 'left'}}/>
          <text style={{fontSize: 40}}> NFL Mock Draft Accuracy 2009-2018</text>
        </h1>
        <style>{'body { background-color: #2B2B2B; } div {color:#ffffff;'}}</style>
        <PlotComponent
          data={data}
          teams={teams}
          selectedTeam={selectedTeam}
          selectedName={selectedName}
          mikeMayock={mikeMayock}
          mattMiller={mattMiller}
          selectedPosition={selectedPosition}
          modifySelectedTeam={team => this.setState({selectedTeam: team})}
          modifySelectedName={name => this.setState({selectedName: name})}
          modifyMikeMayock={rating => this.setState({mikeMayock: rating})}
          modifyMattMiller={rating => this.setState({mattMiller: rating})}
          modifySelectedPosition={position => this.setState({selectedPosition: position})}
          />
        <div className="flex center">
          <h1 style={{width: 1000, fontSize: 20, textAlign: 'left'}}>
          Every year between the end of the NFL season and when the
           NFL draft rolls around in Late April, sports media channels are
          filled with 'Draft Experts' making their predictions. They produce
          Mock Drafts of the '1st' round, which helps excite football fans
          because they are eager to see which players will be the future of
          their franchises. However, there is little data, and fewer
          visualizations providing accountability for experts predictions.
          This visualization demonstrates the accuracy of two of the more notable experts
          Mike Mayock of NFL Network and Matt Miller of Bleacher Report.
          As a side effect and added benefit, it helps visualize the distribution
          of picks in the first round of the NFL Draft over the last decade </h1>
        </div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
