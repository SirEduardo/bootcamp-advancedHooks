

export const calculate = (dispatch, input, num1, operation) => {
  switch (operation) {
    case "+":
      dispatch({
        type: "calculate",
        payload: num1 + parseInt(input.current.value),
      });
      break;
    case "-":
      dispatch({
        type: "calculate",
        payload: num1 - parseInt(input.current.value),
      });
      break;
    case "*":
      dispatch({
        type: "calculate",
        payload: num1 * parseInt(input.current.value),
      });
      break;
    case "/":
      dispatch({
        type: "calculate",
        payload: num1 / parseInt(input.current.value),
      });
      break;
    case "%":
      dispatch({
        type: "calculate",
        payload: num1 % parseInt(input.current.value),
      });
      break;
    default:
      break;
  }
  input.current.value = "";
};
