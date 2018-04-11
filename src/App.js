import React, { Component } from 'react';
import './App.css';


let wordArray = [];
let headLineArray = [];
let individualWords, randomIndex;

function PrintWord(props){
  return(
    <div>
        <h1>State of the Nation (according to NY times)</h1>
       <h2>{props.word}</h2>
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articlesLoaded : false,
      randomWord: ''
    };

    this.startWords = this.startWords.bind(this);
  }

  componentDidMount(){
    this.getArticles();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

   getArticles(){
    console.log('getting articles');
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=ce756eac7a244fd9a4ddb6fda136e832')
    .then(topStories => topStories.json())
    .then((topStoriesParsed) => {

      this.pushHeadlines(topStoriesParsed);
    })
}

pushHeadlines(parseHeadlines){
  console.log("parseHeadlines : ", parseHeadlines.results);
  parseHeadlines.results.map(function(item){
    var separator = item.title.split(' ').length;
    wordArray.push(item.title.split(' '));
  })
    this.timerID = setInterval(
      () => this.pickWord(),
      200
    );
}

startWords(){
  this.setState({articlesLoaded: true})
}

pickWord(){
  var randomPrimary = Math.abs(Math.floor(Math.random() * wordArray.length));
  var randomSecondary = Math.abs(Math.floor(Math.random() * wordArray[randomPrimary].length));
  this.setState(
    {
      randomWord: wordArray[randomPrimary][randomSecondary].replace(/\W/g, '').toUpperCase()
    });
}

  render() { 
    const {articlesLoaded, randomWord} = this.state;
    if(!articlesLoaded){
    return (
      <div className="App">
      <h1>
      By pressing this button you will see words of the top stories in the NY times in rapid succession. Delivering your news as an abstract "state of the nation"
      <button onClick = {this.startWords}> STATE OF THE NATION </button>
      </h1>
      </div>
    );
  }else{
    return (
      <div className="App">
      <PrintWord word = {this.state.randomWord} />
      </div>
    );
  }
}
}

export default App;
