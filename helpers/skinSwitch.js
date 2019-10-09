class API {
  constructor() {
    this.mode = localStorage.getItem("devMode")
    this.bgColor = this.mode == 'true' ? '\t#708090' : '#ffffff'
    this.color = this.mode == 'true' ? '#ffffff' : '#000000de'
  }
  getColor(){
    return {
      color:this.color,
      bgColor:this.bgColor
    }
  }
  init = () => {
    document.body.style.backgroundColor = this.bgColor
    document.body.style.color = this.color
  }
}

const instance = new API();
export default instance;
