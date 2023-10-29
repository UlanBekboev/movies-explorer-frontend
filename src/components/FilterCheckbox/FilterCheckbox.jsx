import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter'>
      <input
        type='checkbox'
        id='checkbox'
        className='filter__checkbox'
      />
      <label htmlFor='checkbox' className='filter__label'>Короткометражки</label>
    </div>
  )
};

export default FilterCheckbox;