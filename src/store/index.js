import { createStore } from 'vuex';
import router from '@/router';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const axiosInstance = axios.create({
	baseURL: 'https://api.intern.d-tt.nl/api/houses',
	headers: {
		'X-Api-Key': 'QftPEp38KycCIOjqmsBra-XeVk7_hlAN',
		'Content-Type': 'multipart/form-data',
	},
});

const store = createStore({
	state: {
		houses: [],
		searchValue: '',
		activeSortButton: '',
		selectedHouseId: '',
		activeModal: false,
		listing: {},
	},
	plugins: [
		createPersistedState({
			key: 'house-listings',
			storage: window.sessionStorage,
		}),
	],
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
		UPDATE_HOUSES_ARRAY(state, houses) {
			state.houses = houses;
		},
		SET_ACTIVE_MODAL(state, activeModal) {
			state.activeModal = activeModal;
		},
		SET_LISTING(state, listing) {
			state.listing = listing;
		},
		ADD_HOUSE(state, house) {
			state.houses.push(house);
		},
	},

	actions: {
		// api get request to fetch house listings
		fetchHouses({ commit }) {
			axiosInstance
				.get('/')
				.then((res) => {
					commit('SET_HOUSES', res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		},

		deleteListing({ state, commit }) {
			axiosInstance
				.delete(`/${state.selectedHouseId}`)
				.then(() => {
					// filter the house that was deleted and update houses array - rerendering
					const updatedHouses = state.houses.filter(
						(house) => house.id !== state.selectedHouseId
					);
					commit('UPDATE_HOUSES_ARRAY', updatedHouses);
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// api post request to create new listing based on the information filled in the listingForm
		postHouse({ commit, dispatch }, { updatedHouseInfo, uploadedImage }) {
			axiosInstance
				.post('/', updatedHouseInfo)
				.then((res) => {
					const id = res.data.id;
					commit('ADD_HOUSE', { ...updatedHouseInfo, id });
					dispatch('postImage', { id, uploadedImage });
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// api post request to set the image on the created house, based on the id generated
		postImage({ dispatch }, { id, uploadedImage }) {
			const formData = new FormData();
			formData.append('image', uploadedImage);

			axiosInstance.post(`/${id}/upload`, formData).then(() => {
				dispatch('fetchHouses');
				router.push({ path: `/house/${id}` });
			});
		},

		// api post request to edit the information of the listing
		editHouse(
			{ commit, dispatch, state },
			{ updatedHouseInfo, uploadedImage }
		) {
			axiosInstance
				.post(`/${state.selectedHouseId}`, updatedHouseInfo)
				.then(() => {
					commit('ADD_HOUSE', { ...updatedHouseInfo });
					if (!uploadedImage) {
						dispatch('fetchHouses');
						router.push({ path: `/house/${state.selectedHouseId}` });
						return;
					}
					dispatch('postImage', { id: state.selectedHouseId, uploadedImage });
				})
				.catch((err) => {
					console.log(err);
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

		setActiveModal({ commit }, activeModal) {
			commit('SET_ACTIVE_MODAL', activeModal);
		},

		setListing({ state, commit }, selectedHouseId) {
			const listing = state.houses.find(
				(house) => house.id === selectedHouseId
			);
			commit('SET_LISTING', listing);
		},

		addHouse({ commit }, house) {
			commit('ADD_HOUSE', house);
		},
	},
});

export default store;
