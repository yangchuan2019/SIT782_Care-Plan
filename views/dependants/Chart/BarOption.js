module.exports = {

  title: {
    text: 'Results',
    left: 'center',
  },

  tooltip : {
    trigger: 'axis',
    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
      type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: '{a} <br/>{b} : {c}'
  },
  grid: {
    top: 40,
    bottom: 35,
    left: 10,
    right: 10
  },
  xAxis: {
    type : 'category',
    splitLine: {show:false},
    data : ['Low','Normal','High','Very High']
  },
  yAxis: {
    type : 'value'
  },
  series: [
    {
      name: '',
      type: 'bar',
      data:[
        {value:'0',itemStyle:{color:'#369EAD'}},
        {value:'0',itemStyle:{color:'#C24642'}},
        {value:'0',itemStyle:{color:'#7F6084'}},
        {value:'0',itemStyle:{color:'#86B402'}}
      ]
    }
  ]
};
