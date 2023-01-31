import '@testing-library/jest-native/extend-expect';

import 'react-native'
import React from 'react'
import Home from '../Class/Screens/Main'
import renderer from 'react-test-renderer'
import {render, screen, fireEvent} from '@testing-library/react-native'



const navigation = {
    navigate: jest.fn(),
    slot:'4'
  };

// test('Home snapshot',()=>{
//     const snap=renderer.create(
//         <Home/>
//     ).toJSON();
//     expect(snap).toMatchSnapshot();
// });

// let findElement=function(tree:any,element:any){
//     return true
// }

// it('find element',()=>{
//     let tree=renderer.create(
//         <Home  navigation={navigation} />
//     ).toJSON();
//     expect(findElement(tree,'inputData')).toBeDefined();


// })

test('examples of some things', async () => {
    const expectedNumber = 4
    render(<Home/>)
    const tree = renderer.create(<Home  />);
    fireEvent.press(screen.getByTestId('SubmitButton'))

}),



describe('Parking', () => {

    it('renders correctly', () => {
        let {container} = render(<Home />);
        expect(container).toBeTruthy();
      });

      it('check Flatlisst', () => {
        render(<Home />);
        expect(screen.getByTestId('header')).toBeVisible();
      }),
      it('check Flatlisst', () => {
        const { getByPlaceholderText} = render(
            <Home />,
          );
          const textInput = getByPlaceholderText('SLOTS TO BOOK');
          fireEvent.changeText(textInput);
          expect(textInput).toBeTruthy();

      })
     

})





