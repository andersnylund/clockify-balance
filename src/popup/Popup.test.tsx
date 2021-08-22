import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import Popup from './Popup';

describe('<Popup.tsx />', () => {
  it('renders', () => {
    render(<Popup />);

    expect(screen.getByText('Web Extension starter')).toBeInTheDocument();
  });

  it('logs hello to console when clicking button', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {
      // we don't want test logs to clutter our console
    });

    render(<Popup />);

    fireEvent.click(screen.getByText('Log console message'));

    expect(consoleSpy).toHaveBeenCalledWith('Hello from Popup!');
  });
});
