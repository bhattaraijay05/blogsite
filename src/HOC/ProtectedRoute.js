import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../components/Auth/UserProvider";

const ProtectedRoute = (ProtectedComponent) => {
	return (props) => {
		if (typeof window !== "undefined") {
			const Router = useRouter();

			const user = useContext(UserContext);

			if (!user) {
				Router.replace("/login");
				return null;
			} else {
				return <ProtectedComponent {...props} />;
			}
		}

		return null;
	};
};

export default ProtectedRoute;
