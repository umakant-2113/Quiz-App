import React from 'react';
import { Link } from 'react-router-dom';

class Reasults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    if (
      this.props.quizData.length === 0 &&
      this.props.selectAns.length == 0 &&
      this.props.correctAns == 0
    ) {
      <h2> Result is loading......</h2>;
    }
    return (
      <>
        <div className='reset-quiz-btn'>
          <div>
            <button className='reset-btn' onClick={this.props.handlereset}>
              {' '}
              Reset
            </button>
          </div>
          <div className='back-btn'>
            <Link to='/quiz'>
              <button> Previous Quiz </button>
            </Link>

            <Link to='/'>
              <button>New Quiz </button>
            </Link>
          </div>
        </div>
        <div className='result-box'>
          <table className='tabel'>
            <tr>
              <th>Questions</th>
              <th> Correct Answers</th>
              <th> Select Answers</th>
              <th> Check Answers</th>
            </tr>
            {this.props?.quizData?.map((data, index) => {
              return (
                <tr>
                  <td className='first'>{data.question}</td>
                  <td className='second'>{data.correct_answer}</td>
                  <td className='second'>{this.props.selectAns[index]}</td>
                  <td className='second'>
                    {data.correct_answer === this.props.selectAns[index] ? (
                      <h2 className='correct'>Correct </h2>
                    ) : (
                      <h2 className='incorrect'>InCorrect </h2>
                    )}
                  </td>
                </tr>
              );
            })}
            <tr>
              <th>Correct Answers </th>
              <th> {this.props.correctAns}</th>
            </tr>
          </table>
        </div>
      </>
    );
  }
}

export default Reasults;
