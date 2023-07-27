import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SideBar from "../../components/layout/SideBar";
import Compose from "../../components/compose/Compose";
import Sent from "../../components/sent/Sent";
import Received from "../../components/receive/Received";
import { readMail } from "../../store/mail-actions";


const Home = () => {
  const state = useSelector((state) => state.show);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const firstTime = useSelector((state) => state.mail.firstTime);
  const currentMailData = useSelector((state) => state.mail.mailData);
  const dispatch = useDispatch();

  if (isLoggedIn && firstTime) {
    const loggedUserEmail = JSON.parse(localStorage.getItem("idToken")).email;
    const emailUrl = loggedUserEmail.replace("@", "").replace(".", "");
    dispatch(readMail(emailUrl, loggedUserEmail));
  }

  // setInterval(() => {
  //   if (isLoggedIn) {
  //     const loggedUserEmail = JSON.parse(localStorage.getItem('idToken')).email;
  //     const emailUrl = loggedUserEmail.replace('@', '').replace('.', '');
  //     dispatch(updateMail(emailUrl, loggedUserEmail, currentMailData));
  //   }
  // }, 5000);

  return (
    <React.Fragment>
      <SideBar />
      {state.compose && <Compose />}
      {state.sent && <Sent />}
      {state.received && <Received />}
    </React.Fragment>
  );
};

export default Home;
