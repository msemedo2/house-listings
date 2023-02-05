import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state: {
		houses: [],
	},
	mutations: {
		SET_HOUSES(state, houses) {
			state.houses = houses;
		},
	},
	actions: {
		fetchHouses({ commit }) {
			const url = 'https://api.intern.d-tt.nl/api/houses';
			const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
			const API_KEY = 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN';
			axios
				.get(proxyUrl + url, {
					headers: {
						'X-Api-Key': API_KEY,
					},
				})
				.then((res) => {
					commit('SET_HOUSES', res.data);
				});
		},
	},
});
