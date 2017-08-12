import React, { Component } from 'react';
import styled from 'emotion/react';
import { string, node } from 'prop-types';
import withTransition from '../containers/withTransition';

class Page extends Component {
  static propTypes = {
    children: node.isRequired,
    transitionState: string.isRequired, // Supplied by withTransition HOC
  };
  
  componentDidUpdate(prevProps) {
    const { transitionState } = this.props;
    if (prevProps.transitionState !== transitionState)
      if (transitionState === 'exiting') {
        // TweenMax.to(this.node, 0.5, { opacity: 0 });
      } else if (transitionState === 'entering') {
        // TweenMax.from(this.node, 0.5, { opacity: 0 });
      }
  }

  render() {
    const { transitionState, children } = this.props;
    const exit = transitionState === 'exiting' || transitionState === 'exited';

    return (
      <Styled exit={exit} innerRef={c => (this.node = c)}>
        {children}
      </Styled>
    );
  }
}

const Styled = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px;
  position: fixed;
  left: 0;
  top: 0;
  overflow: auto;
  z-index: ${p => p.exit ? 'initial' : 1};

  & > * + * {
    margin-top: 30px;
  }
`;

export default withTransition(Page);
