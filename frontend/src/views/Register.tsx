import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import useStore from "../store/useStore";
import {toTitleCase} from "../utils/utils";

export default function Register() {
	const {login} = useStore();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!email || !password) return;

		const res = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_API_PATH}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email, password})
		});
		const data = await res.json();
		if (!res.ok) {
			toast.error(toTitleCase(data.message));
			return;
		}
		console.log(data);
		login(data.email);
		navigate("/");
	};

	return (
		<section className="max-w-[1800px] w-full mx-auto px-8 md:px-16 py-4">
			<form onSubmit={handleSubmit} className="flex flex-col justify-between rounded-3xl bg-zinc-200 w-full p-8 gap-8">
				<h1 className="uppercase text-4xl font-semibold text-zinc-900">Register</h1>
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<label className="flex flex-col text-zinc-900 w-full">
						<span className="font-semibold text-lg mb-2">Email</span>
						<input className="px-3 py-2 rounded-lg font-medium bg-zinc-200 border-[2px] border-zinc-900" placeholder="user@example.com" type="text" onChange={event => setEmail(event.target.value)} value={email} />
					</label>
					<label className="flex flex-col text-zinc-900 w-full">
						<span className="font-semibold text-lg mb-2">Password</span>
						<input className="px-3 py-2 rounded-lg font-medium bg-zinc-200 border-[2px] border-zinc-900" placeholder="password" type="password" onChange={event => setPassword(event.target.value)} value={password} />
					</label>
				</div>
				<button className="w-fit self-end uppercase text-lg font-semibold px-5 py-3 rounded-lg bg-lime-400 text-zinc-900 hover:bg-zinc-900 hover:text-lime-400 transition-all" type="submit">
					Register
				</button>
			</form>
		</section>
	);
}
