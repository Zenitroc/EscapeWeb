import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('renders links', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
