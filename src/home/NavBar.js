import React from 'react';
// import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      render() {
        {console.log(this.props)}
        return (
          <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">HelpMinder</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink>{this.props.username}</NavLink> 
                  </NavItem>   
                  <NavItem>
                    <NavLink onClick={this.props.logout}>Logout</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
}

export default NavBar;
