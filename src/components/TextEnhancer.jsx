import { memo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function TextEnhancer({ label, text, enhancedText, dispatch }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label>{label}</label>
      <textarea
        style={{ height: '10rem', width: '25rem' }}
        placeholder="Write here..."
        name="feedback-text"
        value={text}
        onChange={(e) =>
          dispatch({
            type: 'UPDATE_TEXTINPUT',
            field: 'feedback-text',
            value: e.target.value,
          })
        }
      />
      {enhancedText === '' ? (
        <Button
          onClick={() => dispatch({ type: 'REQUEST_ENHANCE' })}
          style={{ alignSelf: 'end' }}
        >Enhance</Button>
      ) : (
        <>
          <textarea
            style={{ height: '10rem', width: '25rem' }}
            value={enhancedText ? enhancedText : ''}
            readOnly
          />
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button
              onClick={() => dispatch({ type: 'DISCARD' })}
             >"Discard"
            </Button>
            <Button
              onClick={() => dispatch({ type: 'REQUEST_ENHANCE' })}
              
            >Try again</Button>
            <Button
              onClick={() => dispatch({ type: 'USE_SUGGESTION' })}
            >Use text</Button>
          </Stack>
        </>
      )}
    </div>
  );
}

export default memo(TextEnhancer);
