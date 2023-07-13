import React, { useEffect, useState } from 'react';


const HeaderNavBar = (props) => {


  return(
    <div className='header-nav-bar'>
      <header>
        <h1>FILE SHARE BONANZA TOWN</h1>
      </header>
      <div className='user-info'>
        <form id="login-form" onSubmit={(e) => { e.preventDefault() }}>
          <input type="text" id="input-username" placeholder="username" onChange={(e) => props.updateUserInfo(e)} />
          <input type="text" id="input-password" placeholder="password" onChange={(e) => props.updateUserInfo(e)} />
          <button onClick={(e) => { props.loginUser(e) }}>Login</button>
          <button onClick={(e) => { props.createUser(e) }}>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default HeaderNavBar;