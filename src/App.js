import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: "",
      salary: "",
      hobby: "",
      problem: null,
    };
    // this.problem=""
  }

  onChangehandler = (e) => {
    // console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  // this is how we declare a variable
  // problem = "";
  submitHandler = (e) => {
    // this prevents submitting of form
    // e.preventDefault();
    // console.log(this.state);
    axios
      .post(
        "https://sheet.best/api/sheets/83aa22f6-621c-4202-b210-3a2b61739d94",
        this.state
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          problem: "posted",
        });
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ problem: "notposted" });
      });
  };

  render() {
    // console.log(this.problem);
    const { name, age, salary, hobby, problem } = this.state;
    return (
      <>
        {problem === null ? (
          <div style={{ padding: 20 }}>
            <Header as="h1" color="blue" textAlign="center">
              React Google Sheets
            </Header>
            <div
              style={{ padding: 20, justifyContent: "center", display: "flex" }}
            >
              <Form style={{ width: "50%" }} onSubmit={this.submitHandler}>
                <Form.Field as="h3">
                  <label>Name</label>
                  <input
                    placeholder="Enter your name"
                    type="text"
                    required="true"
                    name="name"
                    value={name}
                    onChange={this.onChangehandler}
                  />
                </Form.Field>
                <Form.Field as="h3">
                  <label>Age</label>
                  <input
                    placeholder="Enter your age"
                    type="number"
                    required="true"
                    name="age"
                    value={age}
                    onChange={this.onChangehandler}
                  />
                </Form.Field>
                <Form.Field as="h3">
                  <label>Salary</label>
                  <input
                    placeholder="Enter your salary"
                    type="number"
                    required="true"
                    name="salary"
                    value={salary}
                    onChange={this.onChangehandler}
                  />
                </Form.Field>
                <Form.Field as="h3">
                  <label>Hobby</label>
                  <input
                    placeholder="Enter your hobby"
                    type="text"
                    required="true"
                    name="hobby"
                    value={hobby}
                    onChange={this.onChangehandler}
                  />
                </Form.Field>
                <Button color="facebook" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        ) : problem === "posted" ? (
          <div
            style={{padding: 20, justifyContent: "center", display: "flex" }}
          >
            <Message positive >
              <Message.Header>
                <h1>Successfully Stored In Database</h1>
                <hr/>
              </Message.Header>
                <p><h2>Name  : {name}</h2></p>
                <p><h2>Age   : {age}</h2></p>
                <p><h2>Salary: {salary}</h2></p>
                <p><h2>Hooby : {hobby}</h2></p>
            </Message>
          </div>
        ) : (
          <div
            style={{ padding: "40px" , justifyContent: "center", display: "flex", textAlign:"center" }}
          >
            <Message negative >
              <Message.Header>
                <h2>Sorry Some Error Occured</h2>
              </Message.Header>
              <h3>Please try again</h3>
            </Message>
          </div>
        )}
      </>
    );
  }
}
export default App;
