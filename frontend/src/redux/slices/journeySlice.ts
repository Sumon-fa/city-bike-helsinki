import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GetAllJourneys, JourneyState } from '../../types/journey'
import { getAllJourneys } from '../methods/journeyMethods'

const initialState: JourneyState = {
  journeys: [],
  totalJourneys: 0,
  journey: {
    id: '',
    departure: '',
    departureStationId: '',
    departureStationName: '',
    return: '',
    returnStationId: '',
    returnStationName: '',
    coveredDistance: 0,
    duration: 0,
  },
  isLoading: false,
  isError: null,
}

const journeySlice = createSlice({
  name: 'journey',
  initialState: initialState,
  reducers: {
    clearError(state) {
      state.isError = null
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllJourneys.fulfilled, (state, action: PayloadAction<GetAllJourneys>) => {
      if (!action.payload) {
        return state
      }
      if ('message' in action.payload) {
        state.isError = action.payload
        console.log(state.isError)
        return state
      }
      state.journeys = action.payload.result
      state.totalJourneys = action.payload.totalItems
      state.isLoading = false
      state.isError = null
      return state
    })
  },
})
export const journeyActions = journeySlice.actions

export default journeySlice
