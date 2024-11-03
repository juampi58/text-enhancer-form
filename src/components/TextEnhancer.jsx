import { memo } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

function TextEnhancer({ label, text, enhancedTexts, dispatch, requestEnhanced, isLoading, error, currentOption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputLabel>{label}
      </InputLabel>
      <TextField
        multiline
        rows={10}
        style={{ width: '25rem' }}
        placeholder="Write here..."
        name="feedback-field"
        value={text}
        onChange={(e) =>
          dispatch({
            type: 'UPDATE_TEXTINPUT',
            value: e.target.value,
          })
        }
      />
      {enhancedTexts.length < 1 ? (
        <Button
          onClick={() => requestEnhanced(text)}
          style={{ alignSelf: 'end' }}
          variant='outlined'
          disabled={isLoading}
        >Enhance</Button>
      ) : (
        <>
          <TextField
            multiline
            rows={10}
            style={{ width: '25rem' }}
            value={enhancedTexts[currentOption]}
          />
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <Button
              onClick={() => dispatch({ type: 'DISCARD', value: currentOption})}
             >"Discard"
            </Button>
            <Button
              onClick={() => requestEnhanced(text)}
              disabled={enhancedTexts.length > 2 || isLoading}
            >Try again</Button>
            <Button
              onClick={() => dispatch({ type: 'USE_SUGGESTION', vaule: currentOption })}
            >Use text</Button>
          </Stack>
          <Stack direction='row' sx={{justifyContent:'flex-end', visibility: enhancedTexts.length>1?'unset':'hidden', alignItems:'center'}}>
            <IconButton aria-label="previous" disabled={currentOption<1} onClick={()=> dispatch({type:'CHANGE_OPTION', value: currentOption-1})}>
              <KeyboardArrowLeftOutlinedIcon />
            </IconButton>
            <Typography>{currentOption+1}/{enhancedTexts.length}</Typography>
            <IconButton aria-label="next" disabled={currentOption>enhancedTexts.length-2} onClick={()=> dispatch({type:'CHANGE_OPTION', value: currentOption+1})}>
              <KeyboardArrowRightOutlinedIcon />
            </IconButton>
          </Stack>
        </>
      )}
    </div>
  );
}

export default memo(TextEnhancer);
