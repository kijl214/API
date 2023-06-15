import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Breedhelper from './Breed_helper';

jest.mock('axios');

describe('Breedhelper Component', () => {
  const breedsData = [
    { id: '1', name: 'Breed 1' },
    { id: '2', name: 'Breed 2' },
    { id: '3', name: 'Breed 3' },
  ];


  test('Renders the component correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: breedsData });

    render(<Breedhelper />);

    expect(screen.getByText('Breeds Helper')).toBeInTheDocument();
    expect(screen.getByText('Select a breed')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Breed 1')).toBeInTheDocument();
      expect(screen.getByText('Breed 2')).toBeInTheDocument();
      expect(screen.getByText('Breed 3')).toBeInTheDocument();
    });
  });



  test('Errors when fetching breeds are caught and logged', async () => {
    const error = new Error('Failed to fetch breeds');
    axios.get.mockRejectedValueOnce(error);

    console.error = jest.fn();

    render(<Breedhelper />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error getting breeds: ', error);
    });
  });

  test('Errors when fetching breed images are caught and logged', async () => {
    axios.get.mockResolvedValueOnce({ data: breedsData });
    const error = new Error('Failed to fetch breed image');
    axios.get.mockRejectedValueOnce(error);

    console.error = jest.fn();

    render(<Breedhelper />);

    const selectInput = screen.getByRole('combobox');
    fireEvent.change(selectInput, { target: { value: '3' } });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error getting breed image: ', error);
    });
  });
});