import React, { Component } from 'react';
import { object } from 'prop-types';

function withTransition(WrappedComponent) {
  return class ComponentWithTransition extends Component {
    static displayName = `${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'}WithTransition`;

    static contextTypes = {
      transition: object.isRequired,
    };

    onTransitionUpdate = () => {};

    componentDidMount() {
      this.context.transition.subscribe(this.onTransitionUpdate);
    }

    componentWillUnmount() {
      this.context.transition.unsubscribe(this.onTransitionUpdate);
    }

    render() {
      const { transition } = this.context;
      return (
        <WrappedComponent {...this.props} transitionState={transition.state} />
      );
    }
  };
}

export default withTransition;