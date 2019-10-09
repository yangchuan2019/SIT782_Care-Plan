import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import BarReact from './Bar';

const classes = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  }
}));
const btnClass = {
  marginLeft:'90px'
};

class ChartForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      v : '1',
      v1:0,v2:0,v3:0,v4:0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({v: event.target.value});
  }

  handleSubmit() {
    let choose = this.state.v;
    if(choose === '1'){
      this.setState({v1: this.state.v1+1});
    }else if(choose === '2'){
      this.setState({v2: this.state.v2+1});
    }else if(choose === '3'){
      this.setState({v3: this.state.v3+1});
    }else if(choose === '4'){
      this.setState({v4: this.state.v4+1});
    }
    //call child
    let component = this.chartRender;
    component.hello();
  }
  componentDidMount() {

  }
  componentDidUpdate() {
  }
  render() {
    return (
      <div>
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Choice for today results</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={this.state.v} onChange={this.handleChange}>
              <FormControlLabel value="1" control={<Radio />} label="0-40/minute" />
              <FormControlLabel value="2" control={<Radio />} label="40-80/minute" />
              <FormControlLabel value="3" control={<Radio />} label="80-120/minute" />
              <FormControlLabel value="4" control={<Radio />} label="120-160/minute" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="secondary" style={btnClass} onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
        <div>
          <BarReact data={this.state} ref={(c) => { this.chartRender = c; }}/>
        </div>
      </div>
    );
  }
}
export default ChartForm;
