import type { KeyboardEvent } from 'react';
import './Search.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

function Search({ value, onChange, onSearch, placeholder = '검색어를 입력하세요' }: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-contents">
        <input
          className="search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        <button className="search-button" onClick={onSearch}>
          검색
        </button>
      </div>
    </div>
  );
}

export default Search;
