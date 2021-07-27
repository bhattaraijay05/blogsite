import Router from "next/router";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../Auth/UserProvider";
import { db } from "../Firebase/firebase";
const ContentStructure = ({ data }) => {
	const user = useContext(UserContext);
	const deletePost = async () => {
		await db.collection(`items`).doc(data.id).delete();
		Router.reload(window.location.pathname);
	};

	return (
		<>
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 py-10 mx-auto">
					<div className=" w-full md:flex container ">
						<div
							className="h-48 w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden my-auto p-7"
							style={{
								backgroundImage:
									'url("https://tailwindcss.com/img/card-left.jpg")',
							}}
							title="Woman holding a mug"
						></div>
						<div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white container rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
							<div className="mb-8">
								<div className="text-black font-bold text-xl mb-2">
									<Link href={`/post/${data.slug}`}>
										{data.topic}
									</Link>
								</div>

								<Link href={`/post/${data.slug}`}>
									<p className="text-grey-darker text-base cursor-pointer">
										{data.description.substring(0, 200)}...
									</p>
								</Link>
							</div>
							<div className="flex items-center">
								<img
									className="w-10 h-10 rounded-full mr-4"
									src={data.senderImage}
									alt="Avatar of Jonathan Reinink"
								/>
								<div className="text-sm">
									<p className="text-black leading-none">
										{data.senderName}
									</p>
									<p className="text-grey-dark">
										{data.postedTime}
									</p>
								</div>
							</div>
						</div>
						{user && user.uid === data.senderId && (
							<button
								onClick={deletePost}
								className="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							>
								Delete
							</button>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default ContentStructure;
