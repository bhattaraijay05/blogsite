import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "../../components/Firebase/firebase";
import ContentStructure from "../../components/MainPage/ContentStructure";

const Topic = ({ data }) => {
	const router = useRouter();
	const { category } = router.query;

	return (
		<>
			<Head>
				<title>Category || {category ? category : "..."}</title>
				<meta name="description" content={category} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<>
				<div className="ml-10">
					<h2>Category - {category}</h2>
				</div>
				{data ? (
					<div className="grid grid-cols-4 gap-4">
						<div className="col-span-4 lg:col-span-3 px-8">
							{data.map((data, index) => (
								<ContentStructure data={data} key={index} />
							))}
						</div>
					</div>
				) : (
					<main>
						<h1>The Content will be added soon 😊</h1>
					</main>
				)}
			</>
		</>
	);
};

export default Topic;

export const getStaticPaths = async () => {
	const entries = await db
		.collection("items")
		.orderBy("category", "asc")
		.get();
	const paths = entries.docs.map((entry) => ({
		params: {
			category: entry.data().category[0],
		},
	}));
	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async (context) => {
	const res = await db
		.collection("items")
		.where("category", "array-contains", context.params.category)
		.get();
	const entry = res.docs.map((entry) => entry.data());
	if (entry.length) {
		return {
			props: {
				data: entry,
			},
		};
	} else {
		return {
			props: {},
		};
	}
};
