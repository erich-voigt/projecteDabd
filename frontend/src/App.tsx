import {useEffect, useState} from "react";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import useStore from "./store/useStore";
import EditTemplate from "./views/EditTemplate";
import Home from "./views/Home";
import Login from "./views/Login";
import NewTemplate from "./views/NewTemplate";
import Register from "./views/Register";
import Templates from "./views/Templates";
import Workouts from "./views/Workouts";

export default function App() {
	const {email, getEmail} = useStore();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getEmail();
		setLoading(false);
	}, []);

	if (!loading) {
		return (
			<HashRouter>
				<main>
					<Header />
					<div>
						<Routes>
							<Route path="/" element={email ? <Workouts /> : <Home />} />
							<Route path="/templates" element={email ? <Templates /> : <Navigate to="/" />} />
							<Route path="/template/new" element={email ? <NewTemplate /> : <Navigate to="/" />} />
							<Route path="/template/edit/:id" element={email ? <EditTemplate /> : <Navigate to="/" />} />
							<Route path="/login" element={email ? <Navigate to="/" /> : <Login />} />
							<Route path="/register" element={email ? <Navigate to="/" /> : <Register />} />
						</Routes>
					</div>
				</main>
			</HashRouter>
		);
	}
}
