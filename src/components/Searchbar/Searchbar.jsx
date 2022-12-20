import { toast } from 'react-toastify';
import { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';
import { ReactComponent as AddIcon } from '../icons/search.svg';

// const { Component } = require("react");

function Searchbar({ onSub }) {
  const [inputName, setInputName] = useState('');

  const handleNameChange = event => {
    setInputName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (inputName.trim() === '') {
      return toast.error('Enter name');
    }
    onSub(inputName);
    setInputName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <AddIcon className={css.icon} />
          <span className={css.button_label}></span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={inputName}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSub: PropTypes.func.isRequired,
};
