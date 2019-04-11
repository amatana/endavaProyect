import { SET_QUESTIONS, DELETE_QUESTION } from '../constants';
import axios from 'axios';

const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions

});

// const setDeletedQuestion = (questId) => ({
//   type: DELETE_QUESTION,
//   questId

// });

export const searchAllQuestions = (area) => dispatch =>
  axios.get('/api/questions/reqAllQuestions/' + area)
    .then(res => dispatch(setQuestions(res.data)));

export const deleteQuestion = (questId, area) => dispatch =>
  axios.get('/api/questions/delete/' + questId)
    .then(() => dispatch(searchAllQuestions(area)));

export const editQuestion = (questId, modifiedQuestion, area) => dispatch =>
  axios.post(`/api/questions/edit/${questId}`, {
    content: modifiedQuestion
  })
    .then(() => dispatch(searchAllQuestions(area)));

export const saveQuestionsFromFile = (questionsArray, area) => dispatch => {
  let arrayPromsises = [];
  for (let i = 0; i < questionsArray.length; i++) {
    arrayPromsises.push(axios.post('/api/questions/create', questionsArray[i]));
  }
  Promise.all(arrayPromsises)
    .then(() => {console.log('=========== MANDO A BUSCAR LAS PREGUNTAS A BD= ==========', area);dispatch(searchAllQuestions(area))});
};

export const saveTagsFromFile = (questionsArray) => dispatch => {
  let arrayPromsises = [];
  let arrayNonDuplicatedTags = [];
  for (let j = 0; j < questionsArray.length; j++) {
    for (let i = 0; i < questionsArray[j].tags.length; i++) {
      if (arrayNonDuplicatedTags.indexOf(questionsArray[j].tags[i]) < 0) arrayNonDuplicatedTags.push(questionsArray[j].tags[i]);
    }
  }
  for (let i = 0; i < arrayNonDuplicatedTags.length; i++) {
    arrayPromsises.push(axios.post('/api/questions/create/tags', {
      tag: arrayNonDuplicatedTags[i]
    }));
    Promise.all(arrayPromsises)
      .then(() => {});
  }
};
