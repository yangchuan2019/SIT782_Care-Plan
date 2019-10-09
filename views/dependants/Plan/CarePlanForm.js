import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

require('../../../styles/common.css'); //wl

const classes = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width:120
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#69d669',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const GreenButton = withStyles(theme => ({
  root: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

function createData(name, patient, bloodPressure,bloodPressureDetail, weight, weightDetail, glucose,glucoseDetail) {
  return { name, patient, bloodPressure, weight, glucose,bloodPressureDetail,weightDetail,glucoseDetail };
}

class CarePlanForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open:false,
      day: 'Monday',
      bloodPressure:'1',
      weight:'1',
      glucose:'1',
      bloodPressureTime1:'none',
      bloodPressureTime2:'none',
      bloodPressureTime3:'none',
      bloodPressureTime4:'none',
      weightTime1:'none',
      weightTime2:'none',
      weightTime3:'none',
      weightTime4:'none',
      glucoseTime1:'none',
      glucoseTime2:'none',
      glucoseTime3:'none',
      glucoseTime4:'none',
      rows : [
        // createData('Monday', 159, 6.0, 24, 4.0),
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange1 = this.handleInputChange1.bind(this);
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.handleInputChange3 = this.handleInputChange3.bind(this);
    this.handleInputChange4 = this.handleInputChange4.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAdd() {
    this.setState({open: true});
  }
  handleChange(event) {
    this.setState({
      day:event.target.value
    });
  }
  handleClose() {
    this.setState({open: false});
  }
  handleEdit(patient){
    this.setState({open: true});
    let rows = this.state.rows
    for(let i=0;i<rows.length;i++){
      if(rows[i].patient == patient){
        this.setState({
          patient:rows[i].patient,
          day:rows[i].name,
          bloodPressure:rows[i].bloodPressure,
          weight:rows[i].weight,
          glucose:rows[i].glucose,
        });
      }
    }
  }
  handleDelete(patient){
    let rows = this.state.rows,newRows = []
    for(let i=0;i<rows.length;i++){
      if(rows[i].patient != patient){
        newRows.push(rows[i])
      }
    }
    this.setState({
      rows:newRows
    });
  }
  handleSubmit() {
    let bloodPressureDetail = "",weightDetail="",glucoseDetail = ""
    for(let i=0;i<5;i++){
      let v1 = this.state['bloodPressureVal'+i]
      if(v1){
        bloodPressureDetail += " ("+(i+1)+"th:"+v1+") "
      }
      let v2 = this.state['weightVal'+i]
      if(v2){
        weightDetail += " ("+(i+1)+"th:"+v2+") "
      }
      let v3 = this.state['glucoseVal'+i]
      if(v3){
        glucoseDetail += " ("+(i+1)+"th:"+v3+") "
      }
    }
    let rows = this.state.rows,exists = false,newRows = []
    for(let i=0;i<rows.length;i++){
      if(rows[i].patient != this.state.patient){
        newRows.push(rows[i])
      }
    }

    newRows.push(createData(this.state.day, this.state.patient,
      this.state.bloodPressure ,bloodPressureDetail,
      this.state.weight,weightDetail,
      this.state.glucose,glucoseDetail));
    this.setState({
      rows:newRows
    });
    this.handleClose()
  }
  handleInputChange1(event){
    this.setState({
      patient:event.target.value
    });
  }
  handleInputChange2(event){
    let times = Number.parseInt(event.target.value)
    this.setState({
      bloodPressure:times
    })
    for(let i=0;i<times;i++){
      let key = 'bloodPressureTime'+i
      this.setState({
        [key]:'inline-block'
      });
    }
    for(let i=times;i<5;i++){
      let key = 'bloodPressureTime'+i
      this.setState({
        [key]:'none'
      });
    }
  }
  handleInputChange3(event){
    let times = Number.parseInt(event.target.value)
    this.setState({
      weight:times
    })
    for(let i=0;i<times;i++){
      let key = 'weightTime'+i
      this.setState({
        [key]:'inline-block'
      });
    }
    for(let i=times;i<5;i++){
      let key = 'weightTime'+i
      this.setState({
        [key]:'none'
      });
    }
  }
  handleInputChange4(event){
    let times = Number.parseInt(event.target.value)
    this.setState({
      glucose:times
    })
    for(let i=0;i<times;i++){
      let key = 'glucoseTime'+i
      this.setState({
        [key]:'inline-block'
      });
    }
    for(let i=times;i<5;i++){
      let key = 'glucoseTime'+i
      this.setState({
        [key]:'none'
      });
    }
  }
  clickBloodPressureTime0(event){this.setState({bloodPressureVal0:event.target.value});}
  clickBloodPressureTime1(event){this.setState({bloodPressureVal1:event.target.value});}
  clickBloodPressureTime2(event){this.setState({bloodPressureVal2:event.target.value});}
  clickBloodPressureTime3(event){this.setState({bloodPressureVal3:event.target.value});}
  clickBloodPressureTime4(event){this.setState({bloodPressureVal4:event.target.value});}
  clickWeightTime0(event){this.setState({weightVal0:event.target.value});}
  clickWeightTime1(event){this.setState({weightVal1:event.target.value});}
  clickWeightTime2(event){this.setState({weightVal2:event.target.value});}
  clickWeightTime3(event){this.setState({weightVal3:event.target.value});}
  clickWeightTime4(event){this.setState({weightVal4:event.target.value});}
  clickGlucoseTime0(event){this.setState({glucoseVal0:event.target.value});}
  clickGlucoseTime1(event){this.setState({glucoseVal1:event.target.value});}
  clickGlucoseTime2(event){this.setState({glucoseVal2:event.target.value});}
  clickGlucoseTime3(event){this.setState({glucoseVal3:event.target.value});}
  clickGlucoseTime4(event){this.setState({glucoseVal4:event.target.value});}
  componentDidMount() {
    var main = document.getElementsByTagName("body")[0]
    document.body.addEventListener('click', e => {
      var x = e.clientX - 40;
      var y = e.clientY - 40;

      var id = new Date().getTime()
      var div = document.createElement("div");
      div.setAttribute("id", id);
      div.setAttribute("class", "container");
      div.setAttribute("style", "display:block;left:"+x+"px;top:"+y+"px;");
      div.innerHTML = '<div class="inner"></div><div class="middle"></div><div class="outer"></div>'
      main.appendChild(div)
      setTimeout(function(){
        document.getElementById(id).remove()
      },1000)

    });
  }
  componentDidUpdate() {
  }
  render() {
    return (
      <div>
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Day</StyledTableCell>
                  <StyledTableCell>Patient-ID</StyledTableCell>
                  <StyledTableCell>Blood pressure</StyledTableCell>
                  <StyledTableCell>Weight</StyledTableCell>
                  <StyledTableCell>Glucose</StyledTableCell>
                  <StyledTableCell>Operation</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.patient}</TableCell>
                    <TableCell><span className="red-font">{row.bloodPressure} times</span><br />{row.bloodPressureDetail}</TableCell>
                    <TableCell><span className="red-font">{row.weight} times</span><br />{row.weightDetail}</TableCell>
                    <TableCell><span className="red-font">{row.glucose} times</span><br />{row.glucoseDetail}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={this.handleEdit.bind(this, row.patient)}>
                        Edit
                      </Button>
                      <span>&nbsp;</span>
                      <Button variant="contained" color="primary" onClick={this.handleDelete.bind(this,row.patient)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <div className="btn-group">
            <GreenButton variant="contained" color="secondary" onClick={this.handleAdd}>
              Add new plan
            </GreenButton>
          </div>
        </div>

        <div>
          <Dialog onClose={this.handleClose} aria-labelledby="form-dialog-title" open={this.state.open}>
            <DialogTitle id="form-dialog-title">New Care Plan</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="patient"
                label="Patient-ID"
                value={this.state.patient}
                onChange={this.handleInputChange1}
                fullWidth
              />

              <div>
                <span className="td-label">Choose Day:</span>
                <Select value={this.state.day} onChange={this.handleChange}
                        inputProps={{
                          name: 'Day',
                          id: 'day-simple',
                        }}
                >
                  <MenuItem value={'Monday'}>Monday</MenuItem>
                  <MenuItem value={'Tuesday'}>Tuesday </MenuItem>
                  <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                  <MenuItem value={'Thursday'}>Thursday</MenuItem>
                  <MenuItem value={'Friday'}>Friday</MenuItem>
                  <MenuItem value={'Saturday'}>Saturday</MenuItem>
                  <MenuItem value={'Sunday'}>Sunday</MenuItem>
                </Select>
              </div>

              <div>
                <span className="td-label">Choose times for Blood pressure test:</span>
                <Select value={this.state.bloodPressure} onChange={this.handleInputChange2}>
                  <MenuItem value={'1'}>1 time</MenuItem>
                  <MenuItem value={'2'}>2 times </MenuItem>
                  <MenuItem value={'3'}>3 times</MenuItem>
                  <MenuItem value={'4'}>4 times</MenuItem>
                  <MenuItem value={'5'}>5 times</MenuItem>
                </Select>
              </div>
              <div>
                <TextField id="bloodPressureTime0" label="1th:" type="time" defaultValue="00:00" onChange={this.clickBloodPressureTime0.bind(this)}
                  className={classes.textField} style={{display:this.state.bloodPressureTime0}} inputProps={{step: 60}}/>
                <TextField id="bloodPressureTime1" label="2th:" type="time" defaultValue="00:00" onChange={this.clickBloodPressureTime1.bind(this)}
                  className={classes.textField} style={{display:this.state.bloodPressureTime1}} inputProps={{step: 60}}/>
                <TextField id="bloodPressureTime2" label="3th:" type="time" defaultValue="00:00" onChange={this.clickBloodPressureTime2.bind(this)}
                  className={classes.textField} style={{display:this.state.bloodPressureTime2}} inputProps={{step: 60}}/>
                <TextField id="bloodPressureTime3" label="4th:" type="time" defaultValue="00:00" onChange={this.clickBloodPressureTime3.bind(this)}
                  className={classes.textField} style={{display:this.state.bloodPressureTime3}} inputProps={{step: 60}}/>
                <TextField id="bloodPressureTime4" label="5th:" type="time" defaultValue="00:00" onChange={this.clickBloodPressureTime4.bind(this)}
                  className={classes.textField} style={{display:this.state.bloodPressureTime4}} inputProps={{step: 60}}/>
              </div>

              <div>
                <span className="td-label">Choose times for weight test:</span>
                <Select value={this.state.weight} onChange={this.handleInputChange3}>
                  <MenuItem value={'1'}>1 time</MenuItem>
                  <MenuItem value={'2'}>2 times </MenuItem>
                  <MenuItem value={'3'}>3 times</MenuItem>
                  <MenuItem value={'4'}>4 times</MenuItem>
                  <MenuItem value={'5'}>5 times</MenuItem>
                </Select>
              </div>
              <div>
                <TextField id="weightTime0" label="1th:" type="time" defaultValue="00:00" onChange={this.clickWeightTime0.bind(this)}
                           className={classes.textField} style={{display:this.state.weightTime0}} inputProps={{step: 60}}/>
                <TextField id="weightTime1" label="2th:" type="time" defaultValue="00:00" onChange={this.clickWeightTime1.bind(this)}
                           className={classes.textField} style={{display:this.state.weightTime1}} inputProps={{step: 60}}/>
                <TextField id="weightTime2" label="3th:" type="time" defaultValue="00:00" onChange={this.clickWeightTime2.bind(this)}
                           className={classes.textField} style={{display:this.state.weightTime2}} inputProps={{step: 60}}/>
                <TextField id="weightTime3" label="4th:" type="time" defaultValue="00:00" onChange={this.clickWeightTime3.bind(this)}
                           className={classes.textField} style={{display:this.state.weightTime3}} inputProps={{step: 60}}/>
                <TextField id="weightTime4" label="5th:" type="time" defaultValue="00:00" onChange={this.clickWeightTime4.bind(this)}
                           className={classes.textField} style={{display:this.state.weightTime4}} inputProps={{step: 60}}/>
              </div>

              <div>
                <span className="td-label">Choose times for glucose test:</span>
                <Select value={this.state.glucose} onChange={this.handleInputChange4}>
                  <MenuItem value={'1'}>1 time</MenuItem>
                  <MenuItem value={'2'}>2 times </MenuItem>
                  <MenuItem value={'3'}>3 times</MenuItem>
                  <MenuItem value={'4'}>4 times</MenuItem>
                  <MenuItem value={'5'}>5 times</MenuItem>
                </Select>
              </div>
              <div>
                <TextField id="glucoseTime0" label="1th:" type="time" defaultValue="00:00" onChange={this.clickGlucoseTime0.bind(this)}
                           className={classes.textField} style={{display:this.state.glucoseTime0}} inputProps={{step: 60}}/>
                <TextField id="glucoseTime1" label="2th:" type="time" defaultValue="00:00" onChange={this.clickGlucoseTime1.bind(this)}
                           className={classes.textField} style={{display:this.state.glucoseTime1}} inputProps={{step: 60}}/>
                <TextField id="glucoseTime2" label="3th:" type="time" defaultValue="00:00" onChange={this.clickGlucoseTime2.bind(this)}
                           className={classes.textField} style={{display:this.state.glucoseTime2}} inputProps={{step: 60}}/>
                <TextField id="glucoseTime3" label="4th:" type="time" defaultValue="00:00" onChange={this.clickGlucoseTime3.bind(this)}
                           className={classes.textField} style={{display:this.state.glucoseTime3}} inputProps={{step: 60}}/>
                <TextField id="glucoseTime4" label="5th:" type="time" defaultValue="00:00" onChange={this.clickGlucoseTime4.bind(this)}
                           className={classes.textField} style={{display:this.state.glucoseTime4}} inputProps={{step: 60}}/>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}
export default CarePlanForm;

