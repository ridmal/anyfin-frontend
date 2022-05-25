import TextField from '.';
import React from 'react';
import { render, screen } from '@testing-library/react';

it('renders correctly', () => {
  render(<TextField value={'Test'} onChange={() => {}} />);
});

it('should show correct text', () => {
  const title = 'Test-TextField';
  render(<TextField value={'Test-TextField'} onChange={() => {}} />);
  const element = screen.getByDisplayValue(title);
  expect(element).toBeTruthy();
});
