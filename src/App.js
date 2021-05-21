import './styles.css';
import React, { Fragment, useReducer, useState } from 'react';

const initialState = {
  count: 0,
  step: 1
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + state.step,
        step: state.step
      };

    case 'decrement':
      return {
        count: state.count - state.step,
        step: state.step
      };

    case 'reset':
      return { count: (state.count = 0), step: state.step };

    case 'updateStep':
      return {
        count: state.count,
        step: action.step
      }

    default:
      return state;
  }
};

function Slider({ onChange, min, max }) {
  const [value, setValue] = useState(1);

  return (
    <Fragment>
      <h1 className='i-b'>{value}</h1>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const value = Number(e.target.value);
          onChange(value);
          setValue(value);
        }}
      />
    </Fragment>
  );
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Fragment>
      <Slider
        min={1}
        max={10}
        onChange={(value) =>
          dispatch({
            type: 'updateStep',
            step: value
          })
        }
      />
      <h1>{state.count}</h1>
      <button className="mr-1" onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button className="mr-1" onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
    </Fragment>
  );
}

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
