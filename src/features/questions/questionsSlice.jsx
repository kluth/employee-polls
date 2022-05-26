/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  _getQuestions as getQuestions,
  _saveQuestion as saveQuestion,
  _saveQuestionAnswer as saveQuestionAnswer,
} from '../../_DATA';

const initialState = {
  questions: [],
  question: {},
  status: 'idle',
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const questions = await getQuestions();
    return questions;
  },
);

/* export const fetchQuestion = createAsyncThunk(
    'questions/fetchQuestion',
    async (id) => {
        return await API._getQuestion(id);
    }
); */
export const fetchQuestion = createAsyncThunk(
  'questions/fetchQuestion',
  async (id) => {
    const question = await getQuestions().questions[id];
    return question;
  },
);

export const saveNewQuestion = createAsyncThunk(
  'questions/saveQuestion',
  async (question) => saveQuestion(question),
);

export const saveAnswer = createAsyncThunk(
  'questions/saveAnswer',
  async ({
    authedUser,
    qid,
    answer,
  }) => saveQuestionAnswer({
    authedUser,
    qid,
    answer,
  }),
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
  extraReducers: {
    [fetchQuestions.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.questions = action.payload;
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [fetchQuestion.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchQuestion.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.question = action.payload;
    },
    [fetchQuestion.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [saveQuestion.pending]: (state, action) => {
      state.status = 'loading';
    },
    [saveQuestion.fulfilled]: (state, action) => {
      state.status = 'idle';
    },
    [saveQuestion.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [saveAnswer.pending]: (state, action) => {
      state.status = 'loading';
    },
    [saveAnswer.fulfilled]: (state, action) => {
      state.status = 'idle';
    },
    [saveAnswer.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export default questionsSlice.reducer;
