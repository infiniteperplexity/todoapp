let destination = document.querySelector("#container");
function addColor(value) {
  return {
    type: "ADD",
    color: value
  }
}
 
function removeColor(value) {
  return {
    type: "REMOVE",
    color: value
  }
}

function favoriteColors(state, action) {
  if (state === undefined) {
    state = [];
  }
 
  if (action.type === "ADD") {
    return state.concat(action.color);
  } else if (action.type === "REMOVE") {
    return state.filter(function(item) {
      return item !== action.color;
    });
  } else {
    return state;
  }
}

let store = Redux.createStore(favoriteColors);
store.subscribe(render);
function render() {
  console.log(store.getState());
}

store.dispatch(addColor("blue"));
store.dispatch(addColor("yellow"));
store.dispatch(addColor("green"));
store.dispatch(addColor("red"));
store.dispatch(addColor("gray"));
store.dispatch(addColor("orange"));
store.dispatch(removeColor("gray"));

console.log(store.getState());


ReactDOM.render(
	<div>
  		<br/>
 	</div>,
	destination
);

// Actions and reducers.
// Reducers should never have side effects
  // this example doesn't even mutate the "state" variable; instead, it returns new state
// so the store only has one reducer?  that conditionally checks the different types of Action?
