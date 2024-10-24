import { memo } from 'react';
import Button from './Button';

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
          action={() => dispatch({ type: 'REQUEST_ENHANCE' })}
          title="Enhance"
          style={{ alignSelf: 'end' }}
        />
      ) : (
        <>
          <textarea
            style={{ height: '10rem', width: '25rem' }}
            value={enhancedText ? enhancedText : ''}
            readOnly
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              action={() => dispatch({ type: 'DISCARD' })}
              title="Discard"
            />
            <Button
              action={() => dispatch({ type: 'REQUEST_ENHANCE' })}
              title="Try again"
            />
            <Button
              action={() => dispatch({ type: 'USE_SUGGESTION' })}
              title="Use text"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default memo(TextEnhancer);
