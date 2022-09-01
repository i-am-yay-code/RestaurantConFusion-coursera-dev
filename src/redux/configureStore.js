import { configureStore } from '@reduxjs/toolkit'
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export default configureStore({
    reducer: {
        dishes: Dishes,
        comments: Comments,
        promotions: Promotions,
        leaders: Leaders,
        ...createForms({
            feedback: InitialFeedback
        })
    },
    middleware: [thunk, logger]
})

