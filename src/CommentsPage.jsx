import TextEnhancer from './components/TextEnhancer';
import { useCallback, useReducer } from 'react';
import { getRandomElement } from './utils';
const initialState = {
  text: '',
  enhancedText: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TEXTINPUT':
      return { ...state, text: action.value };
    case 'REQUEST_ENHANCE':
      return {
        enhancedText: fetchEnhancement(),
      };
    case 'USE_SUGGESTION':
      return { ...state, text: state.enhancedText, enhancedText: '' };
    case 'DISCARD':
      return { ...state, enhancedText: '' };
    default:
      return state;
  }
};

const RESULT = ['Enhancment 1', 'Enhancment 2', 'Enhancment 3'];

const fetchEnhancement = () => {
  return getRandomElement(RESULT);
};
export default function CommentsPage() {
  const [form, dispatchForm] = useReducer(formReducer, initialState);

  const requestEnhansment = useCallback(() =>
    dispatchForm({ type: 'REQUEST_ENHANCE' })
  );
  return (
    <>
      <TextEnhancer
        label="Textarea1"
        text={form.text}
        enhancedText={form.enhancedText}
        dispatch={dispatchForm}
      />
    </>
  );
}
