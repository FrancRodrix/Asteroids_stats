import '@testing-library/jest-native/extend-expect';

import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import Detail from '../Park';

const navigation = {
  navigation: jest.fn(),
  params: {
    slots: JSON.parse(4),
  },
  registrationView: true,

  props: {
    modalVisible: false,
    payment: false,
    rows: [],
    carNum: [],
  },
};

describe('Parking', () => {
  it('renders correctly', () => {
    let {container} = render(<Detail route={navigation} />);
    expect(container).toBeTruthy();
  });
  it('renders correctly', () => {
    let {container, getByTestId} = render(<Detail route={navigation} />);
    const area = getByTestId('container');
    expect(area).toBeVisible();
  });

  it('button is pressed', () => {
    const buttonFn = jest.fn();

    render(<Detail handleAddToParking={() => buttonFn()} route={navigation} />);
    fireEvent.press(screen.getByTestId('ParkButton'));
  }),
    it('check Flatlisst', () => {
      render(<Detail route={navigation} />);
      expect(screen.getByTestId('list')).toBeVisible();
    }),
    it('check Flatlisst', () => {
      render(<Detail route={navigation} />);
      expect(screen.getByTestId('list')).toHaveProp('data');
    }),
    it('button is pressed', () => {
      const buttonFn = jest.fn();

      const {getAllByTestId} = render(
        <Detail onPress={() => buttonFn()} route={navigation} />,
      );
      const showMore = getAllByTestId('ParkingSlot')[0];
      fireEvent.press(showMore);
      expect(getAllByTestId('ParkingSlot')).toBeTruthy();
    }),
    it('check button', () => {
      const {getByTestId, getAllByTestId} = render(
        <Detail route={navigation} />,
      );
      const showMore = getAllByTestId('ParkingSlot')[0];
      fireEvent.press(showMore);
      const button = getByTestId('Close');
      const setModalVisible = jest.fn();
      render(
        <Detail onPress={() => setModalVisible(true)} route={navigation} />,
      );
      fireEvent.press(button);
      expect(button).toBeTruthy();
    }),
    it('check button', () => {
      render(<Detail route={navigation} />);
      expect(screen.getByTestId('name')).toBeTruthy();
    }),
    it('check button', () => {
      render(<Detail route={navigation} />);
      expect(screen.getByTestId('start')).toBeVisible();
    }),
    it('check button', () => {
      render(<Detail route={navigation} />);
      expect(screen.getByTestId('end')).toBeVisible();
    }),
    it('check button', () => {
      const {getAllByA11yState, getByTestId, getAllByTestId} = render(
        <Detail route={navigation} />,
      );
      const button = getByTestId('Paybutton');
      onPress = jest.fn();
      asyncPostCall = jest.fn();
      render(<Detail onPress={() => asyncPostCall()} route={navigation} />);
      fireEvent.press(button);
      expect(button).toBeTruthy();
    }),
    it('check button1', () => {
      const {getAllByA11yState, getByTestId, getAllByTestId} = render(
        <Detail route={navigation} />,
      );
      const click = screen.getByTestId('Deallocate');
      remove = jest.fn();
      setPayment = jest.fn();
      render(
        <Detail
          onPress={() => {
            remove(rows, carNum), setPayment(true);
          }}
          route={navigation}
        />,
      );
      fireEvent.press(click);
      expect(click).toBeTruthy();
    }),
    it('PAY check', () => {
      const {getByText} = render(<Detail route={navigation} />);
      const clickButton = getByText('Please make the Payment');
      expect(clickButton).toBeVisible();
    });

  it('check Flatlisst', () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(
      <Detail route={navigation} />,
    );
    const clickButton = getByText('PARK');
    fireEvent.press(clickButton);
    fireEvent.press(getByTestId('RegModal'));
    const textInput = getByPlaceholderText('Vehicle no');
    fireEvent.changeText(textInput);
    expect(textInput).toBeTruthy();
  });

  it('check Flatlisst', () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(
      <Detail route={navigation} />,
    );
    const clickButton = getByText('PARK');
    fireEvent.press(clickButton);
    fireEvent.press(getByTestId('RegModal'));
    const button = getByTestId('allocate');
    handleAddToParking = jest.fn();
    generateNumberPlate = jest.fn();
    render(
      <Detail
        handleAddToParking={() => generateNumberPlate()}
        route={navigation}
      />,
    );
    fireEvent.press(button);
    expect(button).toBeTruthy();
  });
});
