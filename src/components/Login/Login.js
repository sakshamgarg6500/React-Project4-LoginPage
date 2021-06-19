import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [emailIsValid, setEmailIsValid] = useState();
	const [enteredPassword, setEnteredPassword] = useState("");
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("Checking form validity");
			setFormIsValid(
				enteredEmail.includes("@") && enteredPassword.trim().length > 6
			);
		}, 500); //for 500 milliseconds

		return () => {
			//this cleanup function runs before react executes this [useEffect] function the next time exept the first time
			console.log("Cleanup");
			clearTimeout(identifier); //clear the timeout before it runs the next time
		};
	}, [enteredEmail, enteredPassword]);

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);

		setFormIsValid(
			event.target.value.trim().length > 6 && enteredEmail.includes("@")
		);
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes("@"));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(enteredEmail, enteredPassword);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					id="email"
					label="E-Mail"
					type="email"
					isValid={emailIsValid}
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					id="password"
					label="Password"
					type="password"
					isValid={passwordIsValid}
					value={enteredPassword}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>

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
