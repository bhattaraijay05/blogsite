import Head from "next/head";
import Categories from "../components/Categories/Categories";
import { db } from "../components/Firebase/firebase";
import Home from "../components/Home";
import Content from "../components/MainPage/Content";

export default function App({ data }) {
	return (
		<>
			<Head>
				<title>My App</title>
				<meta
					name="description"
					content="Write your blogs and share to like minded peoples"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<>
				<Home />
				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-3 lg:col-span-1 px-8">
						<Categories />
					</div>
					<div className="col-span-3 lg:col-span-2">
						<Content data={data} />
					</div>
				</div>
			</>
		</>
	);
}

export const getStaticProps = async () => {
	const entries = await db.collection("items").orderBy("time", "desc").get();
	const entriesData = entries.docs.map((entry) => ({
		id: entry.id,
		...entry.data(),
	}));
	return {
		props: { data: entriesData },
		revalidate: 10,
	};
};
