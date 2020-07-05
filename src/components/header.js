import React, { Component } from 'react';
import { Navbar, Nav, Form, NavDropdown, Dropdown, FormControl, Button } from 'react-bootstrap';
// import logo from '../assets/img/logo/react_logo.png'; // Tell webpack this JS file uses this image
import logo from '../logo-2.png'; 
import avatar from '../assets/img/user.png';
import '../assets/css/style.css';

class Header extends Component {
  // Import result is the URL of your image
  render(){
      return(
        <Navbar bg="primary">
            <Navbar.Brand>
            <img
                src={logo}
                width="120"
                height="60"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                navitem="React chart"
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                        <NavDropdown 
                            title={
                                <img className="avatar" 
                                    src={avatar} 
                                    alt="user pic"
                                />
                            } 
                            
                            id="basic-nav-dropdown">

                            <Dropdown.Item >Profile</Dropdown.Item>
                            <Dropdown.Item divider />
                            <Dropdown.Item >
                                <i className="fa fa-sign-out"></i> Logout
                            </Dropdown.Item>
                        </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        //   <div className={"header"}>
        //     <img className={"logo-img"} src={logo} alt="Logo" />
        //     <span className={"logo-label"}>React chart</span>
        //   </div>
        );
  }

}

export default Header;