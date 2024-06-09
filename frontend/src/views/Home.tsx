import {Link} from "react-router-dom";

export default function Home() {
	return (
		<section className="max-w-[1800px] w-full mx-auto px-8 md:px-16 py-4">
			<div className="flex flex-col justify-between rounded-3xl bg-zinc-200 w-full p-8">
				<h1 className="uppercase text-4xl md:text-5xl font-semibold text-zinc-900">Manage your workouts with EzyFit</h1>
				<hr className="w-full h-[2px] mt-16 md:mt-32 mb-6 bg-zinc-900" />
				<div className="flex flex-col lg:flex-row items-end gap-6">
					<div className="flex flex-col sm:flex-row gap-2 w-full lg:w-1/2">
						<Link to="/login" className="flex justify-center items-center gap-2 bg-zinc-300 text-zinc-900 hover:bg-zinc-900 hover:text-lime-400 uppercase font-semibold max-lg:flex-1 lg:w-44 py-6 lg:h-52 rounded-xl text-xl transition-all">
							Login
							<svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M17 7l-10 10" />
								<path d="M8 7l9 0l0 9" />
							</svg>
						</Link>
						<Link to="/register" className="flex justify-center items-center gap-2 bg-lime-400 text-zinc-900 hover:bg-zinc-900 hover:text-lime-400 uppercase font-semibold max-lg:flex-1 lg:w-44 py-6 lg:h-52 rounded-xl text-xl transition-all">
							Register
							<svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M17 7l-10 10" />
								<path d="M8 7l9 0l0 9" />
							</svg>
						</Link>
					</div>
					<p className="text-zinc-900 w-full lg:w-1/2 text-lg text-right text-balanced">Get fit and stay motivated with us! Our all-in-one fitness app offers an easy dashbord for you to track your workouts and progress to help you achieve your goals.</p>
				</div>
			</div>
		</section>
	);
}
