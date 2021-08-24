import { useRouter } from "next/router";
import React from "react";

export default function Profile() {
	const router = useRouter();
	const { profile } = router.query;
	return (
		<>
			<div className="container mx-auto my-5 p-5">
				<div className="md:flex no-wrap md:-mx-2 ">
					<div className="w-full md:w-3/12 md:mx-2  shadow-xl">
						<div className="bg-white p-3 ">
							<div className="image overflow-hidden">
								<img
									className="h-auto w-full mx-auto"
									src="https://images.unsplash.com/photo-1620923640099-637045e83c19?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									alt=""
								/>
							</div>
							<h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
								Jane Doe
							</h1>
							<h3 className="text-gray-600 font-lg text-semibold leading-6">
								Owner at Her Company Inc.
							</h3>
							<p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Reprehenderit, eligendi
								dolorum sequi illum qui unde aspernatur non
								deserunt
							</p>
						</div>
						<div className="my-4" />
					</div>
					<div className="w-full md:w-9/12 mx-2 h-64">
						<div className="bg-white p-3 shadow-xl rounded-sm">
							<div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
								<span clas="text-green-500">
									<svg
										className="h-5"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</span>
								<span className="tracking-wide">About</span>
							</div>
							<div className="text-gray-700">
								<div className="grid md:grid-cols-2 text-sm">
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">
											Full Name
										</div>
										<div className="px-4 py-2">
											Jane Doe
										</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">
											Gender
										</div>
										<div className="px-4 py-2">Female</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">
											Email.
										</div>
										<div className="px-4 py-2">
											<a
												className="text-blue-800"
												href="mailto:jane@example.com"
											>
												user@example.com
											</a>
										</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">
											Birthday
										</div>
										<div className="px-4 py-2">
											Feb 06, 1998
										</div>
									</div>
									<div className="grid grid-cols-2">
										<div className="px-4 py-2 font-semibold">
											Twitter
										</div>
										<div className="px-4 py-2">
											Feb 06, 1998
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="my-4" />
						<div className="bg-white p-3 shadow-sm rounded-sm">
							<div className="grid grid-cols-2">
								<div>
									<div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
										<span clas="text-green-500">
											<svg
												className="h-5"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												/>
											</svg>
										</span>
										<span className="tracking-wide">
											Posts
										</span>
									</div>
									<ul className="list-inside space-y-2">
										<li>
											<div className="text-teal-600">
												Owner at Her Company Inc.
											</div>
											<div className="text-gray-500 text-xs">
												March 2020 - Now
											</div>
										</li>
										<li>
											<div className="text-teal-600">
												Owner at Her Company Inc.
											</div>
											<div className="text-gray-500 text-xs">
												March 2020 - Now
											</div>
										</li>
										<li>
											<div className="text-teal-600">
												Owner at Her Company Inc.
											</div>
											<div className="text-gray-500 text-xs">
												March 2020 - Now
											</div>
										</li>
										<li>
											<div className="text-teal-600">
												Owner at Her Company Inc.
											</div>
											<div className="text-gray-500 text-xs">
												March 2020 - Now
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
