import Header from "../components/Header";
import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import { useEffect, useState } from "react";
import UserProvider from "../components/Auth/UserProvider";
import Head from "next/head";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	const [isVisible, setIsVisible] = useState(false);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};
		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	return (
		<>
			<Head>
				<title>My App</title>
				<meta
					name="description"
					content="Write your blogs and share to like minded peoples"
				/>
				<link rel="icon" href="/favicon.ico" />
				<script
					data-ad-client="ca-pub-9819657337267884"
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
				></script>
				<meta name="google-site-verification" content="-JjvHOlDmrzhGcAQQf0hBA0kQuEaU7tOnftj5RYWA_A" />
			</Head>
			<UserProvider>
				<div>
					{isVisible && (
						<div onClick={scrollToTop}>
							<p id="myBtn">&uarr;</p>
						</div>
					)}
				</div>

				<Header />
				<Component {...pageProps} site="My App" />
			</UserProvider>
		</>
	);
}

export default MyApp;
