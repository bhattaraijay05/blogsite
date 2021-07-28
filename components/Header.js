import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import {
	ChartBarIcon,
	CursorClickIcon,
	MenuIcon,
	PhoneIcon,
	PlayIcon,
	SupportIcon,
	XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ModalPage from "./Modals/ModalPage";
import Link from "next/link";
import { UserContext } from "./Auth/UserProvider";
import { auth } from "./Firebase/firebase";

const loginmodal = "loginmodal";
const signupmodal = "joinusmodal";

const nameOfLoginModal = "Sign In";
const nameOfSignUpModal = "Sign Up";

const solutions = [
	{
		name: "Analytics",
		description:
			"Get a better understanding of where your traffic is coming from.",
		href: "#",
		icon: ChartBarIcon,
	},
	{
		name: "Engagement",
		description:
			"Speak directly to your customers in a more meaningful way.",
		href: "#",
		icon: CursorClickIcon,
	},
];
const callsToAction = [
	{ name: "Watch Demo", href: "#", icon: PlayIcon },
	{ name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const resources = [
	{
		name: "Help Center",
		description:
			"Get all of your questions answered in our forums or contact support.",
		href: "#",
		icon: SupportIcon,
	},
];
const recentPosts = [{ id: 1, name: "Boost your conversion rate", href: "#" }];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const [offset, setOffset] = useState(0);
	const [openSolution, setOpenSolution] = useState(false);
	const [openMore, setOpenMore] = useState(false);

	const [position, setPosition] = useState("absolute");
	const [topHeight, setTopHeight] = useState(0);

	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef();

	const [openModalName, setOpenModalName] = useState("");
	const [nameOfModal, setNameOfModal] = useState("");

	const user = useContext(UserContext);
	function closeModal() {
		setOpen(false);
	}

	function openModal(openModName, nameOfMod) {
		setOpen(true);
		setOpenModalName(openModName);
		setNameOfModal(nameOfMod);
	}

	useEffect(() => {
		window.onscroll = () => {
			setOffset(window.pageYOffset);
		};
	}, []);

	useEffect(() => {
		if (offset > 450) {
			setPosition("sticky");
			setTopHeight(0);
		} else {
			setPosition("relative");
			setTopHeight(0);
		}
	}, [offset]);

	return (
		<>
			<Popover
				className="bg-white transition duration-700 ease-in-out"
				style={{
					position: `${position}`,
					top: Number(`${topHeight}`),
					zIndex: 10,
				}}
			>
				{({ open }) => (
					<>
						<div className="max-w-7xl mx-auto px-4 sm:px-6">
							<div className="flex justify-between items-center border-gray-100 py-6 md:justify-start md:space-x-10">
								<div className="flex justify-start lg:w-0 lg:flex-1">
									<Link href="/">
										<img
											className="h-8 w-auto sm:h-10 cursor-pointer"
											src="/logo.png"
											alt="Image"
										/>
									</Link>
								</div>
								<div className="-mr-2 -my-2 md:hidden">
									<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
										<span className="sr-only">
											Open menu
										</span>
										<MenuIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</Popover.Button>
								</div>
								<Popover.Group
									as="nav"
									className="hidden md:flex space-x-10"
								>
									<Popover
										className="relative"
										onMouseOver={() =>
											setOpenSolution(true)
										}
										onMouseLeave={() =>
											setOpenSolution(false)
										}
									>
										{({ open }) => (
											<>
												{/* <Popover.Button
                          className={classNames(
                            open ? "text-gray-900" : "text-gray-500",
                            "group bg-transparent rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none "
                          )}
                        >
                          <span>Solutions</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-600" : "text-gray-400",
                              "ml-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button> */}

												<Transition
													show={openSolution}
													as={Fragment}
													enter="transition ease-out duration-200"
													enterFrom="opacity-0 translate-y-1"
													enterTo="opacity-100 translate-y-0"
													leave="transition ease-in duration-150"
													leaveFrom="opacity-100 translate-y-0"
													leaveTo="opacity-0 translate-y-1"
												>
													<Popover.Panel
														static
														className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
													>
														<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
															<div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
																{solutions.map(
																	(item) => (
																		<a
																			key={
																				item.name
																			}
																			href={
																				item.href
																			}
																			className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
																		>
																			<item.icon
																				className="flex-shrink-0 h-6 w-6 text-indigo-600"
																				aria-hidden="true"
																			/>
																			<div className="ml-4">
																				<p className="text-base font-medium text-gray-900">
																					{
																						item.name
																					}
																				</p>
																				<p className="mt-1 text-sm text-gray-500">
																					{
																						item.description
																					}
																				</p>
																			</div>
																		</a>
																	)
																)}
															</div>
															<div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
																{callsToAction.map(
																	(item) => (
																		<div
																			key={
																				item.name
																			}
																			className="flow-root"
																		>
																			<a
																				href={
																					item.href
																				}
																				className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
																			>
																				<item.icon
																					className="flex-shrink-0 h-6 w-6 text-gray-400"
																					aria-hidden="true"
																				/>
																				<span className="ml-3">
																					{
																						item.name
																					}
																				</span>
																			</a>
																		</div>
																	)
																)}
															</div>
														</div>
													</Popover.Panel>
												</Transition>
											</>
										)}
									</Popover>

									<Link
										href="/editor"
										className="text-base font-medium text-gray-500 hover:text-gray-900"
									>
										Add Posts
									</Link>

									{/* <Link
										href="/data"
										className="text-base font-medium text-gray-500 hover:text-gray-900"
									>
										Data
									</Link> */}
								</Popover.Group>

								<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
									{!user ? (
										<>
											<button
												onClick={() =>
													openModal(
														loginmodal,
														nameOfLoginModal
													)
												}
												className="whitespace-nowrap outline-none focus:outline-none text-base font-medium text-gray-500 hover:text-gray-900"
											>
												Sign in
											</button>
											<button
												onClick={() =>
													openModal(
														signupmodal,
														nameOfSignUpModal
													)
												}
												className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
											>
												Sign up
											</button>
										</>
									) : (
										<Menu
											as="div"
											className="relative inline-block text-left"
										>
											{({ open }) => (
												<>
													<div>
														<Menu.Button
															className="max-w-xs bg-gray-800 rounded-full flex items-center text-white text-lg  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
															id="user-menu-button"
															aria-expanded="false"
															aria-haspopup="true"
														>
															<img
																className="h-10 w-10 rounded-full"
																src={
																	user.photoURL
																		? user.photoURL
																		: `https://ui-avatars.com/api/?name=${user.displayName}&background=0D8ABC&color=fff&font-size=0.6`
																}
																alt={
																	user.displayName
																}
															/>
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
																	{({
																		active,
																	}) => (
																		<a
																			href="#"
																			className={classNames(
																				active
																					? "bg-gray-100 text-gray-900"
																					: "text-gray-700",
																				"block px-4 py-2 text-sm"
																			)}
																		>
																			Profile
																		</a>
																	)}
																</Menu.Item>
																<Menu.Item>
																	{({
																		active,
																	}) => (
																		<a
																			href="#"
																			className={classNames(
																				active
																					? "bg-gray-100 text-gray-900"
																					: "text-gray-700",
																				"block px-4 py-2 text-sm"
																			)}
																		>
																			My
																			Posts
																		</a>
																	)}
																</Menu.Item>
																<Menu.Item>
																	{({
																		active,
																	}) => (
																		<button
																			type="submit"
																			className={classNames(
																				active
																					? "bg-gray-100 text-gray-900"
																					: "text-gray-700",
																				"block w-full text-left px-4 py-2 text-sm"
																			)}
																			onClick={() => {
																				auth.signOut();
																			}}
																		>
																			Sign
																			out
																		</button>
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
						</div>
						<Transition
							show={open}
							as={Fragment}
							enter="duration-200 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="duration-100 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Popover.Panel
								focus
								static
								className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
							>
								<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
									<div className="pt-5 pb-6 px-5">
										<div className="flex items-center justify-between">
											<div>
												<img
													className="h-8 w-auto"
													src="/logo.png"
													alt="Workflow"
												/>
											</div>
											<div className="-mr-2">
												<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none ">
													<span className="sr-only">
														Close menu
													</span>
													<XIcon
														className="h-6 w-6"
														aria-hidden="true"
													/>
												</Popover.Button>
											</div>
										</div>
									</div>
									<div className="py-6 px-5 space-y-6">
										{!user ? (
											<div>
												<button
													onClick={() =>
														openModal(
															signupmodal,
															nameOfSignUpModal
														)
													}
													className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
												>
													Sign up
												</button>
												<p className="mt-6 text-center text-base font-medium text-gray-500">
													Existing user?
													<button
														onClick={() =>
															openModal(
																loginmodal,
																nameOfLoginModal
															)
														}
														className="text-indigo-600 hover:text-indigo-500"
													>
														Sign in
													</button>
												</p>
											</div>
										) : (
											<div>
												<h1 className="text-center text-base font-medium">
													Welcome, {user.displayName}
												</h1>
												<button
													onClick={() =>
														auth.signOut()
													}
													className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
												>
													Sign out
												</button>
											</div>
										)}
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>

			<ModalPage
				openModal={openModal}
				cancelButtonRef={cancelButtonRef}
				closeModal={closeModal}
				open={open}
				openModalType={openModalName}
				nameOfModal={nameOfModal}
			/>
		</>
	);
}
