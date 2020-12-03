import React, { useState } from 'react'
import Routes from './Routes'
import { Link, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import './App.css'

import SdkService from './utils/sdkService'
import {TokenModalProvider} from "./containers/TokenModal";

function App(props) {
  window.sdk = new SdkService()
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  async function handleLogout(event) {
    event.preventDefault()

    userHasAuthenticated(false)

    try {
      await window.sdk.signOut()
      props.history.push('/login')
    } catch (error) {
      console.log('error on logout', error)
    }
  }

  return (
    <div className='App'>
      <TokenModalProvider>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>
                <svg width="143" height="36" viewBox="0 0 143 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect width="143" height="36" fill="url(#pattern0)"/>
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0" transform="translate(-0.00174825) scale(0.0011655 0.00462963)"/>
                    </pattern>
                    <image id="image0" width="861" height="216" xlinkHref="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { isAuthenticated
                ? <>
                    <LinkContainer to='/change-username'>
                       <NavItem>Change Attribute</NavItem>
                     </LinkContainer>

                    <LinkContainer to='/change-password'>
                       <NavItem>Change Password</NavItem>
                     </LinkContainer>

                    <NavItem onClick={handleLogout}>Logout</NavItem>
                  </>
                : <>
                    <LinkContainer to='/signup-with-did'>
                      <NavItem>Sign Up with DID</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/signup'>
                      <NavItem>Sign Up</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/passwordless-login'>
                      <NavItem>Passwordless Login</NavItem>
                    </LinkContainer>
                  </>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </TokenModalProvider>
    </div>
  )
}

export default withRouter(App)
