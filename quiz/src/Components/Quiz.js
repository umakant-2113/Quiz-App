import React from 'react';
import PlayQuiz from './PlayQuiz';
import { Routes, Router, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  render() {
    let data = this.props?.data?.trivia_categories?.filter((elm) => {
      if (this.props.activecategory === 'All') {
        return elm.name;
      } else if (elm.name.split(':')[0].includes(this.props.activecategory)) {
        return elm.name;
      }
    });

    return (
      <>
        <div className='container'>
          <div className='quix-box'>
            {data?.map((data, index) => {
              return (
                <div className='quiz-item' key={index}>
                  <p>{data.name} </p>
                  <Link to='/quiz'>
                    <button
                      onClick={() => this.props.categoryId(data.id, data.name)}
                    >
                      Take A Quiz
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Quiz;
