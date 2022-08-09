import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    query: "",
  };

  handleNameChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

        if (this.state.query.trim() === '') {
      alert('Введите запрос.');
      return;
    }

     this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>


          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.query}
          />
                    <button type="submit" className="SearchForm-button">
            <span style={{ fontSize: 30 }}>&#9906;</span>
          </button>
        </form>
      </header>
    );
  }
}
