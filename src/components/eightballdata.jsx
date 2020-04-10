import React, { Component } from "react";

class MagicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "Will the skay fall?",
      data: [] ,
    };
  }

  async componentDidMount() {
    this.askEightBall();
  }

  askEightBall = async () => {
    let params = encodeURIComponent(this.state.textInput);
    let uri = `https://8ball.delegator.com/magic/JSON/${params}`;
    try {
      await fetch(uri)
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            textInput: "",
            data: [...this.state.data, json.magic],
          });
          console.log(this.state);
        });
    } catch (error) {
      this.setState({
        data: [error.message],
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      textInput: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.askEightBall();
  };

  render() {
    const { data, textInput } = this.state;

    return (
      <div className="Magic Ball">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={textInput}
            placeholder="Ask the magic ball."
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {data.map((magic) => (
          <div key={magic.question}>
            <p>
              {magic.question}: {magic.answer}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default MagicData;
