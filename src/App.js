import React, { Component } from 'react';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import './App.css';


let wordArray = [];
let headLineArray = [];
let individualWords, randomIndex;

function PrintWord(props){
  return(
      <div>
         <h1 className='App'>State of the Nation (NY Times Headlines)</h1>
         <h2 className ="state text-center">{props.word}</h2>
      </div>
  )
}

function onMouseOver(){
  console.log('mouseOver');
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articlesLoaded : false,
      randomWord: '',
      condition : true,
    };
    this.startWords = this.startWords.bind(this);
    this.setStyle = this.setStyle.bind(this);
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
  wordArray.push(item.title.split(' '));
  })
    this.timerID = setInterval(() => this.pickWord(),200);
  }

startWords(){
  this.setState({articlesLoaded: true})
}

setStyle(e){
  if(e.type === 'mouseover'){
    this.setState({condition: false})
  }else{
    this.setState({condition: true})
  }

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
  const {articlesLoaded, randomWord, condition} = this.state;
  if(!articlesLoaded){
    return (
    <Container className = 'App' >
      <Row>
        <Col>
          <h1>By pressing this button you will see words of the  current top stories in the NY times in rapid succession. Delivering your news as an abstract "state of the nation"</h1>
          <button onClick = {this.startWords} onMouseOver = {this.setStyle} onMouseOut = {this.setStyle} className = {this.state.condition ? "buttonWhite" : "buttonRed" }> STATE OF THE NATION </button>
        </Col>
      </Row>
    </Container>
    );
  }else{
    return (
      <Container>
        <Row>
          <Col>
            <div>
                <PrintWord word = {this.state.randomWord} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
}

export default App;
