import { useReducer, useRef, memo, useCallback, useMemo } from "react";
import "./Calculator.css";
import { calculate } from "../../utils/Calculate";

const initialCalculator = {
  num1: 0,
  operation: "",
  result: 0,
  historicResults: [],
  historicResultsSorted: [],
};

const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "Operation":
      return {
        ...state,
        num1: parseInt(action.payload.inputValue),
        operation: action.payload.operation,
      };
    case "calculate":
      return {
        ...state,
        result: action.payload,
        num1: 0,
        operation: "",
        historicResults: [...state.historicResults, action.payload],
      };
    case "sort":
      return { ...state, historicResultsSorted: [...action.payload] };
    default:
      return state;
  }
};

export const Calculator = memo(() => {

  const [state, dispatch] = useReducer(
    calculatorReducer,
    initialCalculator
  );

  const input = useRef();

  const { result, operation, num1, historicResults, historicResultsSorted } =
    state;

  const setOperation = useCallback(
    (operation) => {
      dispatch({
        type: "Operation",
        payload: { inputValue: input.current.value, operation: operation },
      });
      input.current.value = "";
    },
    [operation]
  );

  useMemo(() => {
    dispatch({
      type: "sort",
      payload: historicResults.toSorted((a, b) => a - b),
    });
  }, [historicResults]);

  return (
    <div className="calculator">
      <input type="number" ref={input} />
      <div className="operations">
        <button onClick={() => setOperation("+")}>+</button>
        <button onClick={() => setOperation("-")}>-</button>
        <button onClick={() => setOperation("*")}>X</button>
        <button onClick={() => setOperation("/")}>/</button>
        <button onClick={() => setOperation("%")}>%</button>
        <button onClick={() => calculate(dispatch, input, num1, operation)}>
          =
        </button>
      </div>
      <h2>Last result: {result}</h2>
      <div className="historic">
        <h2>historic results:</h2>
        {historicResultsSorted.map((hResult ,index) => (            
          <h3 key={index}>{hResult}</h3>
        ))}
      </div>
    </div>
  );
});
Calculator.displayName = "Calculator";
