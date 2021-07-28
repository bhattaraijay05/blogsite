import Router from "next/router";
import { Transition, Menu } from "@headlessui/react";

import Link from "next/link";
import React, { useContext, Fragment, useState } from "react";
import { UserContext } from "../Auth/UserProvider";

import { db } from "../Firebase/firebase";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const ContentStructure = ({ data }) => {
	const [open, setOpen] = useState(false);
	const user = useContext(UserContext);
	const deletePost = async () => {
		await db.collection(`items`).doc(data.id).delete();
		Router.reload(window.location.pathname);
	};

	const openMenu = () => {
		setOpen(true);
	};

	return (
		<>
			<section className="text-gray-600 body-font overflow-hidden">
				<div className="container px-5 py-10 mx-auto">
					<div className=" w-full h-full md:flex container ">
						<div
							className="h-48 w-48 flex-none center bg-cover h-full no-repeat rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden my-auto p-7 "
							style={{
								backgroundImage:
									'url("https://images.unsplash.com/photo-1548867450-0466088a4c4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60)',
							}}
							title="Image"
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
							<Menu as="div" className="float-right text-left">
								{({ open }) => (
									<>
										<div>
											<Menu.Button
												className="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												id="user-menu-button"
												aria-expanded="false"
												aria-haspopup="true"
												onClick={openMenu}
											>
												Delete
											</Menu.Button>
										</div>

										<Transition
											show={open}
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items
												static
												className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
											>
												<div className="py-1">
													<Menu.Item>
														{({ active }) => (
															<p
																onClick={
																	deletePost
																}
																className={classNames(
																	active
																		? "bg-gray-100 text-gray-900"
																		: "text-gray-700",
																	"block px-4 py-2 text-sm"
																)}
																style={{
																	cursor: "pointer",
																}}
															>
																Yes
															</p>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<p
																onClick={() => {
																	setOpen(
																		false
																	);
																}}
																className={classNames(
																	active
																		? "bg-gray-100 text-gray-900"
																		: "text-gray-700",
																	"block px-4 py-2 text-sm"
																)}
																style={{
																	cursor: "pointer",
																}}
															>
																No
															</p>
														)}
													</Menu.Item>
												</div>
											</Menu.Items>
										</Transition>
									</>
								)}
							</Menu>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default ContentStructure;
