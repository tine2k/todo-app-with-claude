import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DarkModeToggle from './DarkModeToggle';

describe('DarkModeToggle', () => {
  it('renders without crashing', () => {
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows MoonIcon when darkMode is false (light mode)', () => {
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    // MoonIcon is shown in light mode
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveAttribute('title', 'Switch to dark mode');
  });

  it('shows SunIcon when darkMode is true (dark mode)', () => {
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={true} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    // SunIcon is shown in dark mode
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveAttribute('title', 'Switch to light mode');
  });

  it('calls onToggle when button is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('calls onToggle multiple times when clicked multiple times', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(3);
  });

  it('has proper accessibility attributes in light mode', () => {
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveAttribute('title', 'Switch to dark mode');
  });

  it('has proper accessibility attributes in dark mode', () => {
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={true} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveAttribute('title', 'Switch to light mode');
  });

  it('has proper CSS classes for styling', () => {
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('rounded-lg');
    expect(button).toHaveClass('transition-colors');
    expect(button).toHaveClass('hover:bg-gray-100');
    expect(button).toHaveClass('dark:hover:bg-gray-700');
  });

  it('is keyboard accessible', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    render(<DarkModeToggle darkMode={false} onToggle={mockToggle} />);

    const button = screen.getByRole('button');
    button.focus();

    expect(button).toHaveFocus();

    // Press Enter key
    await user.keyboard('{Enter}');
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});