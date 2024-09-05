import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUser extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  toggle = () => {
    this.props.toggleOpen()
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}
        toggle={() => { this.props.toggleOpen() }}
        className={'modal-user-container'}
        size='lg'
        centered
      >
        <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email</label>
              <input type='text'></input>
            </div>
            <div className='input-container'>
              <label>Password</label>
              <input type='password'></input>
            </div>
            <div className='input-container'>
              <label>First name</label>
              <input type='text'></input>
            </div>
            <div className='input-container'>
              <label>Last name</label>
              <input type='text'></input>
            </div>
            <div className='input-container max-width-input'>
              <label>Address</label>
              <input type='text'></input>
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='px-3' onClick={() => { this.toggle() }}>Save change</Button>{' '}
          <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }

}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);