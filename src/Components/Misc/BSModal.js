import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
var Loader = require("react-loader");

class BSModal extends Component {
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      mapLoaded: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  close() {
    this.setState({ showModal: false, mapLoaded: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  handleLoad() {
    this.setState({ mapLoaded: true });
  }

  render() {
    return (
      <div>
        <div className="cursor-pointer" onClick={this.open}>
          <span
            className="glyphicon glyphicon-map-marker"
            aria-hidden="true"
          />{" "}
          <span className="wcc-link">{this.props.buttonLabel}</span>
        </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.buttonLabel}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.map &&
              <iframe
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                title={this.propsbuttonLabel}
                src={this.props.map}
                onLoad={this.handleLoad}
              />}
            <Loader type="ball-pulse" loaded={this.state.mapLoaded} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BSModal;
