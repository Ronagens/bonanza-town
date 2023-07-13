import React, { useEffect, useState } from 'react';


const HeaderNavBar = (props) => {
  const { user } = props;

  if (user) {
    return (
      <div className="header-nav-bar">
        <header>
          <h1>FILE SHARE BONANZA TOWN</h1>
        </header>
        <div className="user-info">
          <p className="text-groovy" id="username-text">Welcome to the bonanza, {user.username}</p>
          <button className="input-button" onClick={(e) => { props.logoutUser(e) }}>Logout</button>
        </div>
      </div>
    )
  }
  else {
    return(
      <div className='header-nav-bar'>
        <header>
          <h1>FILE SHARE BONANZA TOWN</h1>
        </header>
        <div className='user-info'>
          <form id="login-form" onSubmit={(e) => { e.preventDefault() }}>
            <input type="text" id="input-username" className="input-field" placeholder="username" onChange={(e) => props.updateUserInfo(e)} />
            <input type="text" id="input-password" className="input-field" placeholder="password" onChange={(e) => props.updateUserInfo(e)} /><br/>
            <button className="input-button" onClick={(e) => { props.loginUser(e) }}>Login</button>
            <button className="input-button" onClick={(e) => { props.createUser(e) }}>Sign up</button>
          </form>
        </div>
      </div>
    );
  }
  
};

export default HeaderNavBar;