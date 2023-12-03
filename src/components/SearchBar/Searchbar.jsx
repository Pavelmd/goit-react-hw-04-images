import css from './SearchBar.module.css';
import { useState } from 'react';
export const Searchbar = ({ onSubmit }) => {
  const [currentSearch, setCurrentSearch] = useState('');
  const handleChange = event => setCurrentSearch(event.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const inputForSearch = e.target.elements.inputForSearch;
    setCurrentSearch(inputForSearch.value);
    onSubmit(currentSearch);
    e.target.reset();
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="inputForSearch"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
