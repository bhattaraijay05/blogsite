import Header from "../components/Header";
import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import { useEffect, useState } from "react";
import UserProvider from "../components/Auth/UserProvider";
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
