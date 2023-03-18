import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

function ForgotPasswordPage({history}) {
  return (
    <div>
      <h1>Forgot Password Page</h1>
      <button onClick={() => history.push('/sign-in')}>Reset Password</button>
    </div>
  );
}

export default ForgotPasswordPage;
