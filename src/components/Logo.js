import React from 'react';

const Logo = (props) => {
  return (
    <img
      style={{marginTop: "5px"}}
      width="150px"
      alt="Logo"
      src="/static/logo.png"
      {...props}
    />
  );
};

export default Logo;
