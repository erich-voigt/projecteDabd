import {Link} from "react-router-dom";
import useStore from "../store/useStore";

export default function Header() {
	const {email, logout} = useStore();

	return (
		<div className="flex justify-center items-center">
			<header className="fixed z-50 bg-zinc-900 max-w-[1800px] w-full h-24 px-8 md:px-16 flex justify-center sm:justify-between items-center gap-8">
				<Link to="/">
					<h1 className="max-sm:hidden text-3xl font-semibold">EzyFit</h1>
				</Link>
				<nav>
					<ul className="flex justify-between items-center gap-6 sm:gap-12">
						{email ? (
							<>
								<li>
									<Link to="/" className="uppercase relative after:transition-all after:absolute after:bg-zinc-200 after:h-[2px] after:w-full after:left-0 after:opacity-0 after:bottom-0 hover:after:opacity-100 hover:after:-bottom-1">
										Workouts
									</Link>
								</li>
								<li>
									<Link to="/templates" className="uppercase relative after:transition-all after:absolute after:bg-zinc-200 after:h-[2px] after:w-full after:left-0 after:opacity-0 after:bottom-0 hover:after:opacity-100 hover:after:-bottom-1">
										Templates
									</Link>
								</li>
								<li>
									<button className="uppercase font-semibold px-4 py-2 rounded-md bg-lime-400 bg-opacity-15 text-lime-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all" onClick={() => logout()}>
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link className="uppercase relative after:transition-all after:absolute after:bg-zinc-200 after:h-[2px] after:w-full after:left-0 after:opacity-0 after:bottom-0 hover:after:opacity-100 hover:after:-bottom-1" to="/">
										Home
									</Link>
								</li>
								<li>
									<Link className="uppercase relative after:transition-all after:absolute after:bg-zinc-200 after:h-[2px] after:w-full after:left-0 after:opacity-0 after:bottom-0 hover:after:opacity-100 hover:after:-bottom-1" to="/login">
										Login
									</Link>
								</li>
								<li>
									<Link className="uppercase font-semibold px-4 py-2 rounded-md bg-lime-400 bg-opacity-15 text-lime-400 hover:bg-opacity-100 hover:text-zinc-900 transition-all" to="/register">
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
			<div className="w-full h-24"></div>
		</div>
	);
}
