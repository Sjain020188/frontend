import React from 'react';
import styled from 'styled-components';
import { media } from 'libs/styled';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'store/settings/actions';
import { updateBottomChatPosition } from 'libs/Utils';
import { CrossIcon } from 'shared_components/icons';

const Notification = styled.div`
  background-color: rgba(210, 236, 241, 0.98);
  bottom: 0;
  min-height: 50px;
  border-top: 1px solid #7dd7e5;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding-right: 30px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  display: ${props => (props.closed ? 'none' : 'flex')};
  ${media.minSmall} {
    padding-right: 0;
  }
`;

const Text = styled.span`
  color: #12545f;
  > a {
    color: #6fcf97;
  }
`;

const CloseButton = styled.span`
  color: #12545f;
  position: absolute;
  right: 10px;
  cursor: pointer;
  > svg {
    width: 22px;
    height: 22px;
  }
`;

class GDPRBanner extends React.Component {
  constructor(props) {
    super(props);
    this.gdprRef = React.createRef();
    this.ticking = false;
  }

  componentDidMount() {
    if (!this.props.closed) {
      this.sendRenderedHeight();
    }

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 0 && this.props.height !== 0) {
            this.props.renderedGdpr(0);
          }
          if (window.scrollY === 0 && this.props.height === 0) {
            this.sendRenderedHeight();
          }
          this.ticking = false;
        });
      }
      this.ticking = true;
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.closed && !this.props.closed) {
      this.sendRenderedHeight();
    }
  }

  sendRenderedHeight = () => {
    const height = this.gdprRef.current.getBoundingClientRect().height;
    this.props.renderedGdpr(height);
  };

  showAgain = () => {
    this.props.showGdpr();
  };

  dismiss = () => {
    updateBottomChatPosition();
    this.props.dismissGdpr();
  };

  render() {
    const { closed } = this.props;

    return (
      <Notification closed={closed} ref={this.gdprRef} onClick={this.dismiss}>
        <Text>
          This site uses cookies to provide you with a great user experience. By using Please.com
          you accept our use of{' '}
          <a href="/cookie-policy" target="_blank" onClick={e => e.stopPropagation()}>
            cookies
          </a>
          .
        </Text>
        <CloseButton onClick={this.dismiss}>
          <CrossIcon style={{ width: 24, height: 24 }} />
        </CloseButton>
      </Notification>
    );
  }
}

const mapStateToProps = state => ({
  closed: state.settings.gdprDismissed,
  height: state.settings.gdprHeight,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GDPRBanner);
