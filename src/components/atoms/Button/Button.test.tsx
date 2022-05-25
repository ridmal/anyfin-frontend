import Button from '.';
import React from 'react';
import { render, screen } from '@testing-library/react';

it('renders correctly', () => {
  render(<Button onPress={() => {}} title="Test Button" />);
});

it('should show correct title', () => {
  const title = 'Test Button';
  render(<Button onPress={() => {}} title={title} />);
  const element = screen.getByText(title);
  expect(element).toBeTruthy();
});
