import TextEnhancer from './components/TextEnhancer';
import { useReducer } from 'react';
import {enhanceText} from './services'
const initialState = {
  text: '',
  enhancedTexts: [],
  currentEnhancedIndex: 0,
  waitingForRequest: false,
  errorMessage: null
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TEXTINPUT':
      return { ...state, text: action.value };
    case 'REQUEST_ENHANCE':
      return { ...state, waitingForRequest:true}
    case 'REQUEST_ENHANCE_SUCCESS':
      return { ... state, enhancedTexts: [ ...state.enhancedTexts, action.value], waitingForRequest: false, currentEnhancedIndex: state.enhancedTexts.length }
    case 'REQUEST_ENHANCE_FAIL':
      return { ... state, errorMessage: action.value, waitingForRequest: false }
    case 'USE_SUGGESTION':
      return { ...state, text: state.enhancedTexts[state.currentEnhancedIndex], enhancedTexts: [] };
    case 'DISCARD':
      return { ...state, enhancedTexts: state.enhancedTexts.filter((_,index)=>action.value!==index), currentEnhancedIndex: action.value>0?action.value-1:0 };
    case 'CHANGE_OPTION':
      return {...state, currentEnhancedIndex: action.value}
    default:
      return state;
  }
};


export default function CommentsPage() {
  const [form, dispatchForm] = useReducer(formReducer, initialState);
  const requestEnhancedText = async(input) => {
    dispatchForm({ type: 'REQUEST_ENHANCE'})
    enhanceText(input).then(val=>{
      console.log(val.choices)
      dispatchForm({
        type: 'REQUEST_ENHANCE_SUCCESS',
        value: val.choices[0].text.replace(/[\n"]/g, '').trim()
      });
    }).catch(err=>{
      dispatchForm({
        type: 'REQUEST_ENHANCE_FAIL',
        value: err.message.replace(/[\n"]/g, '').trim()
      });
    })

  }

  return (
    <>
      <TextEnhancer
        label="Textarea1"
        text={form.text}
        enhancedTexts={form.enhancedTexts}
        requestEnhanced={requestEnhancedText}
        dispatch={dispatchForm}
        currentOption={form.currentEnhancedIndex}
        isLoading={form.waitingForRequest}
        error={form.errorMessage}
      />
    </>
  );
}
