import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from './Home.jsx';

/**
 *
 *
 * @class HomePage
 * @extends {React.Component}
 */
class HomePage extends React.Component {
  /**
   *
   *
   * @memberof HomePage
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.push('/dashboard');
    }
  }

  /**
   *
   *
   * @returns
   * @memberof HomePage
   */
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

HomePage.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated
});
export default connect(mapStateToProps)(HomePage);
