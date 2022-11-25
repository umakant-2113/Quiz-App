import React from 'react';
import Header from './Header';
import Tags from './Tags';
import Quiz from './Quiz';
import Results from './Results';

import { Route, Routes, Router } from 'react-router-dom';
import PlayQuiz from './PlayQuiz';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categoryData: null,
      category: null,
      activecategory: 'All',
      level: 'medium',
      categoryId: '',
      categoryName: '',
      correctAns: 0,
      selectAns: [],
      quizdata: [],
    };
  }

  componentDidMount() {
    fetch(`https://opentdb.com/api_category.php`)
      .then((data) => data.json())
      .then((data) => {
        let filterData = data.trivia_categories.map((category) => {
          return category.name.split(':');
        });

        let uniqueData = filterData.filter((data) => {
          if (data.length == 1) {
            return data;
          }
        });
        let totalCategory = uniqueData.flat(Infinity);
        totalCategory.unshift('All', 'Science', 'Entertainment');

        this.setState({
          categoryData: totalCategory,
          category: data,
        });
      });
  }

  handleClick = (e) => {
    let value = e.target.innerText;
    this.setState({ activecategory: value });
  };

  changeLevel = (e) => {
    let value = e.target.value;
    this.setState({
      level: value,
    });
  };

  handleCategoryId = (id, name) => {
    this.setState({
      categoryId: id,
      categoryName: name,
    });
  };

  handledata = (quizdata, correct, select) => {
    // console.log(quizdata, correct, select, 'result data ');
    this.setState((prevState) => {
      return {
        quizdata: prevState.quizdata.concat(quizdata),
        correctAns: prevState.correctAns + correct,
        selectAns: prevState.selectAns.concat(select),
      };
    });
  };

  handleReset = () => {
    this.setState({
      correctAns: 0,
      selectAns: [],
      quizdata: [],
    });
  };

  render() {
    return (
      <>
        <main className='container'>
          <Header />

          <React.Fragment>
            <Routes>
              <Route
                path='/'
                exact
                element={
                  <Tags
                    category={this.state?.category}
                    categoryData={this.state?.categoryData}
                    handleClick={this.handleClick}
                    changeLevel={this.changeLevel}
                  />
                }
              ></Route>
            </Routes>
          </React.Fragment>

          <React.Fragment>
            <Routes>
              <Route
                path='/'
                exact
                element={
                  <Quiz
                    activecategory={this.state.activecategory}
                    data={this.state?.category}
                    categoryId={this.handleCategoryId}
                  />
                }
              ></Route>
            </Routes>
          </React.Fragment>

          <React.Fragment>
            <Routes>
              <Route
                path='/quiz'
                exact
                element={
                  <PlayQuiz
                    level={this.state.level}
                    categoryId={this.state.categoryId}
                    categoryName={this.state.categoryName}
                    handledata = { this.handledata }
                  />
                }
                
              ></Route>
            </Routes>
          </React.Fragment>

          <React.Fragment>
            <Routes>
              <Route
                path='/results'
                exact
                element={
                  <Results
                    quizData={this.state.quizdata}
                    correctAns={this.state.correctAns}
                    selectAns={this.state.selectAns}
                    handlereset={this.handleReset}
                  />
                }
              ></Route>
            </Routes>
          </React.Fragment>
        </main>
      </>
    );
  }
}

export default App;
