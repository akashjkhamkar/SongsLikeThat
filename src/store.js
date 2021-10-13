import { createStore, combineReducers } from 'redux'

import SongsReducer from './reducers/songs'
import ArtistReducer from './reducers/artists'
import MixReducer from './reducers/mix'
import LoadingReducer from "./reducers/loading"
import SearchReducer from "./reducers/search"
import ResultsReducer from "./reducers/results"
import NotificationReducer from "./reducers/notification"
import UserReducer from "./reducers/user"

const megaReducer = combineReducers({
    songs: SongsReducer,
    artists: ArtistReducer,
    mix: MixReducer,
    loading: LoadingReducer,
    search: SearchReducer,
    results: ResultsReducer,
    notification: NotificationReducer,
    user: UserReducer
})

const store = createStore(megaReducer)

export default store