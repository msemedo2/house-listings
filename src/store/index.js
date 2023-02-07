import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
	state: {
		houses: [],
		searchValue: '',
		activeSortButton: '',
		selectedHouseId: '',
	},

	mutations: {
		SET_HOUSES(state, houses) {
			state.houses = houses;
		},
		UPDATE_SEARCH_VALUE(state, searchValue) {
			state.searchValue = searchValue;
		},
		SET_ACTIVE_SORT_BUTTON(state, sortButton) {
			state.activeSortButton = sortButton;
		},
		SET_SELECTED_HOUSE_ID(state, selectedHouseId) {
			state.selectedHouseId = selectedHouseId;
		},
	},

	actions: {
		// Fetch house Listings from the Api
		fetchHouses({ commit }) {
			const url = 'https://api.intern.d-tt.nl/api/houses';
			const API_KEY = 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN';

			axios
				.get(url, {
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

		setActivateSortButton({ commit }, sortButton) {
			commit('SET_ACTIVE_SORT_BUTTON', sortButton);
		},

		setSelectedHouseId({ commit }, selectedHouseId) {
			commit('SET_SELECTED_HOUSE_ID', selectedHouseId);
		},
	},
});
