import React, { useContext, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { options } from "../components/Editor";
import firebase, { db } from "../components/Firebase/firebase";
import { categories } from "../components/Categories/allCategories";
import ProtectedRoute from "../src/HOC/ProtectedRoute";
import { UserContext } from "../components/Auth/UserProvider";
import { useRouter } from "next/router";
import { RotateSpinner } from "react-spinners-kit";
// import { UserContext } from "../components/Auth/UserProvider";
var slugify = require("slugify");

const Editor = dynamic(
	() =>
		import("../components/Editor/editor").then(
			(mod) => mod.EditorContainer
		),
	{ ssr: false }
);

function EditorPage() {
	const user = useContext(UserContext);

	const Router = useRouter();
	const [editor, setEditor] = useState(null);
	const [topic, setTopic] = useState("");
	const [description, setDescription] = useState("");
	const [allCategory, setAllCategory] = useState([]);

	const [spinner, setSpinner] = useState(false);

	// const user = useContext(UserContext);
	const saveData = async (e) => {
		e.preventDefault();

		if (topic !== "" && description !== "" && allCategory.length > 0) {
			await setSpinner(true);
			await editor
				.save()
				.then(async (outputData) => {
					const dataToSave = {
						...outputData,
						topic: topic,
						description: description,
						slug: `${slugify(topic.toLowerCase())}-${Math.floor(
							Math.random() * 1000000000000001
						)}`,
						category: allCategory,
						senderName: user.displayName,
						senderEmail: user.email,
						senderId: user.uid,
						postedTime: new Date(
							firebase.firestore.Timestamp.now().seconds * 1000
						).toLocaleDateString(),
						senderImage: user.profileUrl
							? user.profileUrl
							: `https://ui-avatars.com/api/?name=${user?.displayName}&background=0D8ABC&color=fff&font-size=0.6`,
					};
					await db.collection("items").add(dataToSave);
				})
				.catch((error) => {
					console.log("Saving failed: ", error);
				});

			setTopic("");
			setDescription("");
			await editor.clear();
			setSpinner(false);
			Router.push("/");
		} else {
			alert("Please fill all to continue");
		}
	};

	const data = {
		time: 1587670998983,
		blocks: [
			{
				type: "header",
				data: {
					text: "Content Goes Here",
					level: 2,
					alignment: "center",
				},
			},
			{
				type: "paragraph",
				data: {
					text: "Remove everything and start writing your content",
					alignment: "center",
				},
			},
		],
		version: "2.17.0",
	};

	const handleCheckboxChange = (event) => {
		if (event.target.checked) {
			setAllCategory((prevState) => [...prevState, event.target.value]);
		} else {
			setAllCategory((prevState) =>
				prevState.filter((day) => day !== event.target.value)
			);
		}
	};
	return (
		<>
			<Head>
				<title>EditorJs</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<>
				<main>
					<div className="w-full sm:w-3/5 shadow-xl">
						<input
							type="text"
							className="h-14 w-full   pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
							placeholder="Topic"
							onChange={(e) => setTopic(e.target.value)}
							value={topic}
						/>
					</div>
					<div className="w-full sm:w-3/5 shadow-xl mt-5">
						<textarea
							className="resize-none border  w-full pl-10 pr-20 rounded-lg z-0 py-2  focus:shadow focus:outline-none "
							placeholder="Topic Description"
							style={{ height: 120 }}
							onChange={(e) => setDescription(e.target.value)}
							value={description}
						></textarea>
					</div>
					<div className="w-full sm:w-3/5 shadow-xl my-5 pb-5">
						<h2 className="text-center">
							Select All Categories That Match
						</h2>
						<div className="flex flex-row flex-wrap">
							{categories.map((category, index) => (
								<label
									className="inline-flex items-center mt-3 px-10"
									key={index}
								>
									<input
										type="checkbox"
										className="form-checkbox h-5 w-5 text-gray-600"
										value={slugify(category)}
										id={category}
										onChange={handleCheckboxChange}
									/>
									<span className="ml-2 text-gray-700">
										{category}
									</span>
								</label>
							))}
						</div>
					</div>
				</main>
				<>
					<main>
						<div className="w-full sm:w-3/5 shadow-xl">
							<Editor
								reInit
								readOnly={false}
								editorRef={setEditor}
								options={options}
								data={data}
							/>
						</div>
						{spinner && (
							<RotateSpinner
								size={40}
								color="indigo"
								loading={true}
							/>
						)}

						{topic && (
							<div className="py-10">
								<button
									className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
									type="button"
									onClick={saveData}
								>
									Save
								</button>
							</div>
						)}
					</main>
				</>
			</>
		</>
	);
}

export default ProtectedRoute(EditorPage);
