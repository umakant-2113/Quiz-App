import React from 'react';
import { Link } from 'react-router-dom';
import Results from './Results';
import Loader from './Loader';
// import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
class PlayQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: [],
      questionData: {
        question: '',
        correctAns: '',
        allAns: [],
      },
      count: 0,
      correctAns: 0,
      selectAns: [],
    };
  }

  componentDidMount() {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${this.props.categoryId}&difficulty=${this.props.level}`
    )
      .then((data) => data.json())
      .then((data) => {
        let dataQ = [...data.results];

        this.setState({
          quizData: dataQ,
        });

        let qs = data.results[0];
        let inCorrectAns = qs.incorrect_answers;
        inCorrectAns.push(qs.correct_answer);
        let sortData = inCorrectAns.sort(() => 0.5 - Math.random());
        sortData = Array.from(new Set(sortData));
        let obj = {
          question: qs.question,
          correctAns: qs.correct_answer,
          allAns: sortData,
        };
        this.setState({ questionData: { ...obj } });
      });
  }

  correctAnswer = (e) => {
    let allSelectAns = [...this.state.selectAns];
    allSelectAns.push(e);

    this.setState({
      selectAns: allSelectAns,
    });

    if (this.state.questionData.correctAns === e) {
      this.setState((prevState) => {
        return { correctAns: prevState.correctAns + 1 };
      });
    }
  };

  next = () => {
    if (this.state.count <= 8) {
      this.setState((prevState) => {
        return { count: prevState.count + 1 };
      });

      let questionData = this.state.quizData[this.state.count + 1];
      let inCorrectAns = questionData.incorrect_answers;
      inCorrectAns.push(questionData.correct_answer);
      let sortData = inCorrectAns.sort(() => 0.5 - Math.random());

      let obj = {
        question: questionData.question,
        correctAns: questionData.correct_answer,
        allAns: sortData,
      };

      this.setState({ questionData: { ...obj } });
    }
  };

  prev = () => {
    if (this.state.count >= 1) {
      this.setState((prevState) => {
        return { count: prevState.count - 1 };
      });
    }
    let questionData = this.state.quizData[this.state.count - 1];

    let inCorrectAns = questionData.incorrect_answers;
    inCorrectAns.push(questionData.correct_answer);

    let sortData = inCorrectAns.sort(() => 0.5 - Math.random());
    sortData = Array.from(new Set(sortData));

    let obj = {
      question: questionData.question,
      correctAns: questionData.correct_answer,
      allAns: sortData,
    };

    this.setState({ questionData: { ...obj } });
  };

  render() {
    console.log(this.props);

    if (this.state.questionData.question === '') {
      return <Loader />;
    }

    return (
      <>
        <Link to='/'>
          <div className='back-btn'>
            <button>Back </button>
          </div>
        </Link>

        <div className='range'>
          <div
            style={{
              backgroundColor: 'green',
              width: `${(this.state.count + 1) * 10}%`,
              height: '100%',
              borderRadius: '5px',
            }}
          ></div>
        </div>
        <div>
          <header className='show-question'>
            <span>{this.props.categoryName}</span>
            <span>
              Question :{this.state.count + 1}/{10}
            </span>
          </header>
        </div>

        <div className='qs-box'>
          Q :{this.state.count + 1} {this.state.questionData.question}
        </div>

        <div>
          {this.state.questionData.allAns.map((elm, index) => {
            return (
              <div key={index}>
                <div
                  className='ans-box'
                  onClick={() => this.correctAnswer(elm)}
                >
                  {elm}{' '}
                </div>
              </div>
            );
          })}
          
        </div>

        <div className='next-btn'>
          <button onClick={this.next}>Next </button>
          <button onClick={this.prev}>Previous</button>
        </div>
        {this.state.count + 1 === this.state.quizData.length ? (
          <Link to='/results'>
            <button
              className='btn'
              onClick={() =>
                this.props.handledata(
                  this.state.quizData,
                  this.state.correctAns,
                  this.state.selectAns
                )
              }
            >
              Show Result{' '}
            </button>
          </Link>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default PlayQuiz;
