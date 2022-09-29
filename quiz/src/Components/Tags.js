import React from 'react';
import { NavLink } from 'react-router-dom';

class Tags extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <main className='container'>
          <NavLink>
            <div className='tag-box'>
              {this.props?.categoryData?.map((category) => {
                return (
                  <p key={category} onClick={this.props.handleClick}>
                    {' '}
                    {category}
                  </p>
                );
              })}
            </div>
          </NavLink>

          <div className='level-box'>
            <h2 className='quiz-level'>Quiz level : </h2>
            <select onChange={this.props.changeLevel}>
              <option value='easy'>easy</option>
              <option value='meduim'>meduim</option>
              <option value='hard'>hard</option>
            </select>
          </div>
        </main>
      </>
    );
  }
}

export default Tags;
