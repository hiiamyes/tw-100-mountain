import {SAVE_FUEL_SAVINGS, CALCULATE_FUEL_SAVINGS} from '../constants/ActionTypes';
import objectAssign from 'object-assign';

const initialState = {
  newMpg: "",
  tradeMpg: "",
  newPpg: "",
  tradePpg: "",
  milesDriven: "",
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
        monthly: 0,
        annual: 0,
        threeYear: 0
    }
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.
export default function fuelSavingsAppState(state = initialState, action) {
	switch (action.type) {
	
		default:
			return state;
	}
}
