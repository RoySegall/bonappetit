import React from 'react';
import styles from './styles.scss';
import Link from 'react-router/lib/Link';


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Roy',
    };

    // Do this for now since we cannot install the plugin that need version 7 of babel. Dammit!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({name: event.target.dataset.name});
  };

  render() {
    return (
      <section>
        <form>
          Name: {this.state.name}
          <br />
          <br />
          <a data-name="Roy" onClick={this.handleClick}>Roy</a>
          &nbsp;
          <a data-name="Noy" onClick={this.handleClick}>Noy</a>
        </form>

        <Link to="/tools">Go to tools</Link>
      </section>
    );
  }
}

export default Home;
