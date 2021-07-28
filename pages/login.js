import Head from "next/head";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MagicSpinner, RotateSpinner } from "react-spinners-kit";
import { UserContext } from "../components/Auth/UserProvider";
import { auth, signInWithGoogle } from "../components/Firebase/firebase";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [spinner, setSpinner] = useState(false);

	const signInWithEmailAndPasswordHandler = (event, email, password) => {
		event.preventDefault();
		try {
			setSpinner(true);
			auth.signInWithEmailAndPassword(email, password);
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
		setEmail("");
		setPassword("");
		setSpinner(false);
		Router.back();
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.currentTarget;

		if (name === "userEmail") {
			setEmail(value);
		} else if (name === "userPassword") {
			setPassword(value);
		}
	};

	const user = useContext(UserContext);

	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/");
			setLoading(false);
		}
		if (!user) {
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return (
			<div className="initialLoader">
				<MagicSpinner size={100} color="indigo" loading={true} />
			</div>
		);
	} else
		return (
			<>
				<Head>
					<title>Login</title>
					<meta name="description" content="Login" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div
					className="mt-20"
					style={{
						justifyContent: "center",
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					{error !== null && (
						<div className="py-4 bg-red-600 w-full text-white text-center mb-3">
							{error}
						</div>
					)}

					<div className="mt-2 w-3/5 sm:w-2/5">
						<div>
							<div className="text-sm font-bold text-gray-700 tracking-wide">
								Email Address
							</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
								type="email"
								name="userEmail"
								value={email}
								placeholder="yourname@example.com"
								id="userEmail"
								onChange={(event) => onChangeHandler(event)}
							/>
						</div>
						<div className="mt-3">
							<div className="flex justify-between items-center">
								<div className="text-sm font-bold text-gray-700 tracking-wide">
									Password
								</div>
								<div>
									<Link href="/forgetpassword">
										<button
											type="button"
											className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                  cursor-pointer"
										>
											Forgot Password?
										</button>
									</Link>
								</div>
							</div>
							<input
								className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
								type="password"
								name="userPassword"
								value={password}
								placeholder="Your Password"
								id="userPassword"
								onChange={(event) => onChangeHandler(event)}
							/>
						</div>
						<div className="mt-4">
							<button
								onClick={(event) => {
									signInWithEmailAndPasswordHandler(
										event,
										email,
										password
									);
									setSpinner(true);
								}}
								type="button"
								className="bg-indigo-500 text-gray-100 p-2 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
							>
								Log In
							</button>
						</div>
					</div>
					<div className="mt-2 mx-auto">
						<button
							onClick={() => {
								signInWithGoogle();
								setSpinner(true);
							}}
							type="button"
							style={{
								width: 280,
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
							className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1  m-2 border border-blue-500 hover:border-transparent rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						>
							<div
								style={{
									flex: 0.1,
									alignItems: "flex-end",
									zIndex: 3,
								}}
							>
								<img src="/google.png" alt="Google" />
							</div>
							<div
								style={{
									flex: 0.7,
								}}
							>
								Login with Google
							</div>
						</button>
					</div>

					{spinner && (
						<RotateSpinner
							size={40}
							color="indigo"
							loading={true}
						/>
					)}

					<div className="mt-4">
						<p>
							Don't have an account?{" "}
							<Link href="signup">
								<button className="text-indigo-900 font-semibold text-lg focus:outline-none">
									Sign up
								</button>
							</Link>
						</p>
					</div>
				</div>
			</>
		);
};

export default Login;
