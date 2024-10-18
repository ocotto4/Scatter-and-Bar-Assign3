import React, { Component } from 'react';
import * as d3 from 'd3';
import Child1 from './Child1';
import Child2 from './Child2';
import tips from './tips.csv';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount(){
    var self = this;
    d3.csv(tips, function(d){
      return{
        tip: parseFloat(d.tip),
        total_bill:parseFloat(d.total_bill),
        day:d.day
      }
    }).then(function(csv_data){
      self.setState({data:csv_data})
      //console.log(csv_data)
    })
    .catch(function(err){
      console.log(err);
    })
  }



  render() {
    return (
      <div className="parent">
        <div classname="child1">
          <Child1 data1={this.state.data}/>
        </div>
        <div classname="child1">
          <Child2 data2={this.state.data}/>
        </div>
        
      </div>
      
  
    );
  }
}

export default App;

