import React, { useEffect, useState } from 'react';


const HeaderNavBar = (props) => {


  return(
    <div className='header-nav-bar'>
      <header>
        <h1>FILE SHARE BONANZA TOWN</h1>
      </header>
      <div className='user-info'>
        <form id="login-form" onSubmit={(e) => { e.preventDefault(); console.log(e.target[0].value) }}>
          <input type="text" id="login-username" placeholder="username"/>
          <input type="text" id="login-password" placeholder="password"/>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default HeaderNavBar;