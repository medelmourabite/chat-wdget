import React from 'react';
import styles from './SearchBar.module.scss';
import {IconSearch} from "../icons/SearchIcon";
import {debounce} from "../../utils";

export const SearchBar = ({setQuery}) => {
  const onChange = debounce((e) => {
    setQuery(e.target.value);
  }, 1000);

  return (
    <div className={styles.searchBar}>
      <IconSearch/>
      <input type={'text'} onChange={onChange}/>
    </div>
  );
};
