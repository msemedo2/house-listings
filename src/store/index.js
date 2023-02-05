import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state: {
		houses: [],
		searchValue: '',
	},
	mutations: {
		SET_HOUSES(state, houses) {
			state.houses = houses;
		},
		UPDATE_SEARCH_VALUE(state, searchValue) {
			state.searchValue = searchValue;
		},
	},
	actions: {
		// Fetch house Listings from the Api
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
		updateSearchValue({ commit }, searchValue) {
			commit('UPDATE_SEARCH_VALUE', searchValue);
		},
	},
});
