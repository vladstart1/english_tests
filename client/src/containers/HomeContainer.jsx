import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

import {getQuestions} from '../actions/index';
import QuestionItem from '../widgetsUI/QuestionItem';
import styles from './home_container.css';

class HomeContainer extends Component {

    state = {
        answeredQuestions: []
        };

    componentWillMount(){
        this.hydrateStateWithLocalStorage();
        this.props.dispatch(getQuestions(10,0,'desc',localStorage.getItem('answeredQuestions')))
    }

    renderItems = (questions) => (
        questions.list ? 
            questions.list.map(item=>(
                item ? 
                <QuestionItem answeredQuestion={(question)=>this.addAnsweredQuestions(question)} question={item} key={item._id} />
                : null
            ))
        :
        null
    )

    loadmore = () => {
        let count = this.props.questions.list.length;
        this.props.dispatch(getQuestions(5,count,'desc', localStorage.getItem('answeredQuestions'), this.props.questions.list));   
    }

    addAnsweredQuestions = (question) => {
        const newAnsweredQuestions = this.state.answeredQuestions.concat([question]);
        this.setState({
            answeredQuestions: newAnsweredQuestions
        })
        localStorage.setItem('answeredQuestions', JSON.stringify(newAnsweredQuestions));
    }

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
          if (localStorage.hasOwnProperty(key)) {
            let value = localStorage.getItem(key);
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              this.setState({ [key]: value });
            }
          }
        }
      }

    resetQuestions = () => {
        localStorage.setItem('answeredQuestions', JSON.stringify([]));
        setTimeout(()=>{
            this.props.history.push('/')
        },500)
    }

    gameOver = (questionsList) => (
        questionsList ?
            questionsList.length === 0 ?
            <div className={styles.gameOver}>
                Похоже, что вы ответили на все вопросы. Вы можете сбросить все ответы нажав на:
                <div>
                    <Button 
                    variant="raised"
                    onClick={this.resetQuestions}
                    >
                        Сбросить прогресс
                    </Button>
                    {this.props.user.login.error ?
                        <div>
                            или
                        
                        <div>
                            <Link to='/user/register'>Зарегистрироваться</Link> и добавить еще вопросы                        </div>
                        </div>
                    :
                    <div>
                            или
                        
                        <div>
                            <Link to='/user/add'>Добавить новый вопрос</Link>
                        </div>
                        </div>
                    }
                </div>
            </div>
            :<Button 
            variant="raised"
            onClick={this.loadmore}
            className={styles.loadMore}
            >
                Еще вопросы
            </Button>
        :null
    )

    render() {
        console.log(this.props);
        return (
            <div className={styles.main_wrapper}>
                {this.renderItems(this.props.questions)}
                {this.gameOver(this.props.questions.list)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps)(HomeContainer);