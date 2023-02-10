# House Listing Project with Vue.js and Vuex

House listing project built with Vue.js and Vuex.

## Requirements

- Node.js
- npm

## Installation

To install the project, follow these steps:

1. Clone the repository to your local machine:

- git clone https://github.com/msemedo2/house-listings.git

2. Change into the project directory:

- cd house-listings

3. Install the dependencies:

- npm install

## Usage

To start the development server, run the following command:

- npm run dev

This will start the development server and you can view the project in your browser at `http://localhost:8080/`.

## Features

- Create a new listing for a house
- Edit an existing listing
- Delete a listing
- View all listings in a list
- View listing details

## Project Structure

The project is structured as follows:

- `src/components`: Contains all the Vue.js components used in the project
- `src/store`: Contains the Vuex store for the project
- `src/routes`: Contains the routes for the different pages in the project
- `src/views`: Contains the views for the different pages in the project
- `src/main.js`: The main entry point for the project

## Vuex Store

The Vuex store for this project is used to manage the state of the application.
The store contains the following state properties:

- `houses`: Array of all the listings
- `searchValue`: Value that is being searched for
- `activeSortButton`: Sort button that is active
- `selectedHouseId`: The id of the selected listing
- `activeModal`: Boolean of delete modal
- `listing`: Information of selected listing

The store also contains the following actions:

- `fetchHouses`: Fetches all the houses
- `deleteListing`: Deletes selected house
- `updateSearchValue`: Updates information on a selected house
- `setActivateSortButton`: Sets the sort button that is active
- `setSelectedHouseId`: Sets the id for the selected house
- `setActiveModal`: Sets the the modal
- `setListing`: Sets the selected house information
- `addHouse`: Adds house to array of houses
