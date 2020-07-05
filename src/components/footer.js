import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {ListGroup,  Navbar, Nav, Form, NavDropdown, Dropdown, FormControl, Button } from 'react-bootstrap';

class Footer extends Component
{
    
    render(){
        return (
            <Navbar bg="primary" style={{padding:"0%", alignContent:"center"}}>
                <ListGroup horizontal style={{width: "100%"}}>
                    <ListGroup.Item className={"footer-nav"}>Expert System Action</ListGroup.Item>
                    <ListGroup.Item className={"footer-nav"}>ML Engine Recommendation </ListGroup.Item>
                    <ListGroup.Item className={"footer-nav"}>Action</ListGroup.Item>
                </ListGroup>
            </Navbar>
          );
    }
}

export default Footer;