import Head from "next/head";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { db } from "../../components/Firebase/firebase";
import { UserContext } from "../../components/Auth/UserProvider";

const Editor = dynamic(
	() =>
		import("../../components/Editor/editor").then(
			(mod) => mod.EditorContainer
		),
	{ ssr: false }
);

export default function Post({ data }) {
	return (
		<>
			<Head>
				<title>{data.topic}</title>
				<meta
					name="description"
					content={`${data.topic} ${data.description}`}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="text-gray-600 body-font">
				<div className="container mx-auto flex px-5 pt-12 pb-1 items-center justify-center flex-col">
					<p className="title-font sm:text-4xl text-center text-3xl mb-1 font-medium text-gray-900">
						{data?.topic}
					</p>
					<main className="w-full sm:3/5 md:w-4/5 px-14">
						<p className="mb-2 leading-relaxed">
							{data.description}
						</p>
					</main>
					<p className="mb-2 leading-relaxed">
						By: {data.senderName}
					</p>
				</div>
				{data?.image && (
					<div className="container mx-auto flex px-5 py-4 items-center justify-center flex-col">
						<img
							className=" w-5/6 mb-1 object-cover object-center rounded"
							alt="Image"
							src="https://dummyimage.com/1600x700"
						/>
					</div>
				)}
			</div>
			<main className="container mx-auto flex items-center justify-center flex-col">
				<main className="w-full sm:w-3/5 sm:3/5 md:w-4/5 px-5">
					<Editor readOnly={true} data={data} />
				</main>
			</main>
		</>
	);
}

export const getStaticPaths = async () => {
	const entries = await db.collection("items").get();
	const paths = entries.docs.map((entry) => ({
		params: {
			post: entry.data().slug,
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
		.where("slug", "==", context.params.post)
		.get();

	const entry = res.docs.map((entry) => entry.data());
	if (entry.length) {
		return {
			props: {
				data: entry[0],
			},
		};
	} else {
		return {
			props: {},
		};
	}
};
