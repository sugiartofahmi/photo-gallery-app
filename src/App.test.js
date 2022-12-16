import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import cheerio from 'cheerio';
import { url, studentName, studentId } from './Task';

describe('test deployment', () => {
  it('should have student name on local', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      const studentNameComponent = screen.getByText(studentName);

      expect(studentNameComponent.textContent).toBe(studentName);
    });
  });

  it('should have student id on local', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      const studentIdComponent = screen.getByText(studentId);

      expect(studentIdComponent.textContent).toBe(studentId);
    });
  });

  it('Application should be deploy on Netlify', () => {
    expect(url).not.toBe('');
    expect(/\.netlify\.app\/?$/i.test(url)).toBe(true);
  });

  it('should have same student name and student id on deploy site', async () => {
    const response = await fetch(`http://18.140.35.237:3000/scrape?url=${url}`);
    const html = await response.text();

    const $ = cheerio.load(html);

    expect($('.studentName').text()).toBe(studentName);
    expect($('.studentId').text()).toBe(studentId);
  });
});
