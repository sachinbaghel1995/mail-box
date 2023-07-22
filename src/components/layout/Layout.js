import React from "react";

import MainNavigation from "../navigation/MainNavigation";

const Layout = (props) => {
  return (
    <React.Fragment>
      <MainNavigation />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
