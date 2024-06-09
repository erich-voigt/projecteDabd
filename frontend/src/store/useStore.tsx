import {create} from "zustand";

type Store = {
	email: string | null;
	login: (email: string) => void;
	logout: () => void;
	getEmail: () => string | null;
};

const useStore = create<Store>()(set => ({
	email: null,
	login: email => {
		set({email});
		localStorage.setItem("email", email);
	},
	logout: () => {
		set({email: null});
		localStorage.removeItem("email");
	},
	getEmail: () => {
		let res = localStorage.getItem("email");
		set({email: res});
		return res;
	}
}));

export default useStore;
