import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  //#region data for the AccountPage
  account: {},
  // these tickets will have an event
  myTickets: [],
  //#endregion

  events: [],


  //#region data for the EventDetailsPage
  activeEvent: null,
  // these tickets will have a profile
  tickets: [],
  comments: []

  //#endregion

})
