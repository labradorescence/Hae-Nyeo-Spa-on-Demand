import React from 'react';
import ReactDOM from 'react-dom' //L17
import Button from '../Button.js'

import {render, cleanup } from '@testing-library/react'; //render function in line 21 
//cleanup: after each render, it cleans up after one test, before it renders for the next test again.

import "@testing-library/jest-dom/extend-expect";//expect on L20

import renderer from "react-test-renderer" //on L35



afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>, div)
})

it("renders button correctly", () => {
    const {getByTestId} = render(<Button label = "click me please"></Button>) //uses render function from @testing-library/react
    expect(getByTestId("button")).toHaveTextContent("click me please")//we are expecting `button` tag to have text content, "click me please" because that's how we rendered it.
})

//14:46 what if we pass different prop
//change the prop "click me please" prop to "save" prop. It will fail and say "Found multiple elements by [data-testid="button"]."  This render is running at the same time with the first test. So inorder to prevent that, after every single test, we will clean up.  So import clean up and add `afterEach(cleanup)` at the beginning of the first test.
it("renders button correctly", () => {
    const {getByTestId} = render(<Button label = "save"></Button>)
    expect(getByTestId("button")).toHaveTextContent("save")
})

//16:08 //snapshot testing 
//import renderer from "react-test-renderer" 
it("it matches snapshot 1", () => {
    const tree = renderer.create(<Button label = "save"></Button>).toJSON(); //use the `renderer` function, that we imported from `react-test-renderer` on line 10, `create` a snapshop, Button component with prop called label with text "save". once the button snapshot dom is created, we will convert it into a virtual DOM object, json. Then save it inisde an object called 'tree'
    expect(tree).toMatchSnapshot(); //When this line is run, it's expecting the tree object to match the snapshot in the snapshot file. 

    //if there wasn't an object called tree, then create a snapshot. (button.test.js.snap) If there is a tree already, then match it to the original snapshot. 

    //``` button.test.js.snap
   {/* exports[`it matches snapshot 1 1`] = `
 <div
  className="button-style"
  data-testid="button"
>
  hi 
  save
</div>
`; */}
    

    //This is useful bc it will track and if there's any changes in the button.js file, it will fail bc it's different from the original button.js, which was snapshotted in the snapshot.

    //if you change the original Button.js file, for example, add "hello" next to "hi" then the test will fail and show this on the terminal.

    //    - Snapshot  - 1
    //    + Received  + 1
})

//test 5: snapshop, new prop
it("it matches snapshot 2", () => {
    const tree = renderer.create(<Button label = "click me"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
})