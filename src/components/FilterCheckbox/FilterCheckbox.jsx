import './FilterCheckbox.css';

function FilterCheckbox({ onFilter, isShortMovies }) {
  return (
    <div className='filter'>
      <input
        type='checkbox'
        id='checkbox'
        onChange={onFilter}
        checked={isShortMovies}
        className='filter__checkbox'
      />
      <label htmlFor='checkbox' className='filter__label'>Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;
