import React from 'react';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import config from './BarOption';

class BarReact extends React.Component {
  constructor(props) {
    super(props);
    let id = ( '_' + Math.random()).replace('.','_');
    this.state = {
      pieId : 'pie' + id
    };
  }
  init(id) {
    //判断dom有没有生成
    let myChart = echarts.getInstanceByDom(document.getElementById(id));
    if( myChart === undefined){
      myChart = echarts.init(document.getElementById(id));
    }
    console.log(config.series[0].data);
    myChart.setOption(config);
  }
  hello(){}
  componentDidMount() {
    /**
     * 在组件加载后生成dom节点
     */
    this.init(this.state.pieId);
  }
  componentDidUpdate() {
    let data = this.props;
    console.log('componentDidUpdate!');
    let seriesData = [
      {value:data.data.v1,itemStyle:{color:'#369EAD'}},
      {value:data.data.v2,itemStyle:{color:'#C24642'}},
      {value:data.data.v3,itemStyle:{color:'#7F6084'}},
      {value:data.data.v4,itemStyle:{color:'#86B402'}}
    ];
    setTimeout(()=>{
      config.series[0].data = seriesData;
      this.init(this.state.pieId);
    },500);
  }
  render() {
    return (
      <div>
        <div id={this.state.pieId} style={{width: '1200px', height: '400px'}}></div>
      </div>
    );
  }
}
export default BarReact;
