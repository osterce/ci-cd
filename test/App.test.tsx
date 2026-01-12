import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  test('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Vite \+ React \+ Jenkins \+ Docker \+ Git3/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the counter button with initial count of 0', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /count is 0/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('increments counter when button is clicked', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /count is 0/i });

    fireEvent.click(buttonElement);
    expect(screen.getByText(/count is 1/i)).toBeInTheDocument();

    fireEvent.click(buttonElement);
    expect(screen.getByText(/count is 2/i)).toBeInTheDocument();
  });

  test('renders Vite and React logos', () => {
    render(<App />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Vite logo');
    expect(images[1]).toHaveAttribute('alt', 'React logo');
  });

  test('renders links to Vite and React documentation', () => {
    render(<App />);
    const viteLink = screen.getByRole('link', { name: /vite logo/i });
    const reactLink = screen.getByRole('link', { name: /react logo/i });

    expect(viteLink).toHaveAttribute('href', 'https://vite.de');
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
  });
});
