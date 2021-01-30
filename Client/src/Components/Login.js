import React,{Component} from 'react';
import {Form, FormGroup, Label, FormText } from 'reactstrap';
import { hostname } from './hostname';

class Login extends Component{
  state = {
    mailId:"",
    pass:"",
    EmailError:"",
    PassError:"",
    login:[],
    loginError:"",
    istrue:false,
    type:"password"
  };

  submit= (e) =>{   
    e.preventDefault();
    let error = 0;
    if(this.state.mailId==="")
    {
      error=1;
      this.setState({
      EmailError:"Must Enter Inputs"
      })
    }
    if(this.state.pass==="")
    {
      error=1;
      this.setState({
      PassError:"Must Enter Inputs"
      })
    }

    if(error === 0)
    {
        const headers = {
          method:'GET'
        };
          
        fetch( `${hostname}users/${this.state.mailId}/${this.state.pass}`, headers)
          .then(response=>response.json())
          .then(response=>{
            if(response.length > 0)
            {
              this.props.getEmail(this.state.mailId,response[0].name);
              if(this.state.mailId === "Admin@gmail.com")
              {
                this.props.history.push('./adminproducts');
              }
              else
              {
                this.props.addToCart(true);
                this.props.history.push('./');
              }
              
            }
            else{
              this.setState({
                loginError:"Incorrect username and password"
              })
            }
          })
          .catch(err=>console.log(err))
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      mailId:e.target.value
    })
  }

  handlePassChange = (e) => {
    this.setState({
      pass:e.target.value
    })
  }

  render(){
    return (
      
      <div style={{height:'79vh',transform: "translateY(12%)"}} className="pl-2 pr-2">
      <Form className="container login" onSubmit={(e) => this.submit(e)}>
          <h3 className="m-2 pt-3" >Login</h3>

          <FormText color="white">{this.state.loginError}</FormText>
          
          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="EmailId"  ><h5>Email-Id:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                  <input type="string" style={{height:"2rem",color:"white"}} placeholder="Give your Email Id"
                     value={this.state.mailId} onChange={this.handleEmailChange} />
                  <FormText color="white">{this.state.EmailError}</FormText>
              </div>
          </FormGroup>
          
          <FormGroup row className="p-2">
              <Label className="col-4 text-center" for="Password" ><h5>Password:</h5></Label>
              <div className="col-8 col-md-6 justify-content-center">
                <div className="pass-wrapper">
                  <input  type={this.state.type} style={{height:"2rem",color:"white"}} placeholder="Give your Password"
                     value={this.state.pass} onChange={this.handlePassChange}  /> 
                  <img src={this.state.type === "password" ? "./show-password1.png" : "./show-password.png"} style={{height:"1.5rem"}} onClick={this.state.type === "password" ? () => {this.setState({type:"text"})} : ()=>{this.setState({type:"password"})} }></img>
                </div>
                  <FormText color="white" className=" p-1">{this.state.PassError}</FormText>
              </div>
          </FormGroup>

          <FormGroup className="row p-2">
              <div className="col-4 offset-7">
                  <div className="buton" type = "submit" onClick={this.submit}>Login</div>
              </div>
          </FormGroup>
          <h5 className="p-3">New user?<a href="/signin" style={{color:"#1a2980"}}> Signin</a></h5>
      </Form>
      
  </div>
    );
  }
}

export default Login;
