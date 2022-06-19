import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

import { useNoteContext } from '../../context/nodes/NodeContext';

const dispatchType = {
  emailState: "EMAIL_STATE",
  emailCheck: "EMAIL_CHECK",
  passwordState: "PASSWORD_STATE",
  passwordCheck: "PASSWORD_CHECK"
}

const emailReducer = function (state, action) {
  if (action.type === dispatchType.emailState) return { value: action.value, isValid: action.value.includes('@') };
  if (action.type === dispatchType.emailCheck) return { value: state.value, isValid: state.value.includes('@') };
}

const passwordReducer = function (state, action) {
  if (action.type === dispatchType.passwordState) return { value: action.value, isValid: action.value.trim().length > 6 }
  if (action.type === dispatchType.passwordCheck) return { value: state.value, isValid: state.value.trim().length > 6 }
}


const Login = () => {
  const ctx = useNoteContext();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      value: event.target.value,
      type: dispatchType.emailState
    })

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      value: event.target.value,
      type: dispatchType.passwordState
    })

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: dispatchType.emailCheck
    })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: dispatchType.passwordCheck
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.login.loginHandler(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
