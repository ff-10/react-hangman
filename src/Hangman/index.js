import { Component } from "react";
import style from './style.module.css';
import { getImages } from '../constants/images'
import { randomWord } from '../constants/words';

export default class Hangman extends Component {

    constructor() {
        super();

        this.state = {
            images: getImages(),
            word: null,
            guessedLetters: [],
            choices: 6
        }
        this.handleGuess = this.handleGuess.bind(this);
    }

    restartGame() {
        this.setState({choices: 6, guessedLetters: [], word: randomWord()});
    }

    handleGuess(event) {
        this.setState({ guessedLetters: [...this.state.guessedLetters, event.target.value] });


    }

    isLetterUsed(letter) {
        const isHave = this.state.guessedLetters.filter(guessedLetter => guessedLetter === letter);
        if (isHave.length) {
            return true
        } else {
            return false
        }
    }

    getButtons() {
        const alphabet = "qwertyuiopasdfghjklzxcvbnm";
        return alphabet.split("").map((letter, index) => (
            <button
                value={letter} onClick={this.handleGuess}
                disabled={this.isLetterUsed(letter)}
                key={`letter-${index}`} className={style.letterBtn}>
                {letter}</button>));
    }

    drawImage() {
        return this.state.images[0];
    }

    

    render() {
        return (
            <div className={style.container}>
                <div className={style.imgContainer}>
                    <img src={this.drawImage()} alt="Hangman Img" />
                </div>

                <div className={style.guessedWordsArea}>
                    <div className={style.secretWord}>
                        QM___
                    </div>
                    <div className={style.choices}>
                        Choices: {this.state.choices}
                    </div>
                </div>

                <div className={style.letterBtnContainer}>
                    {this.getButtons()}
                </div>
            </div>
        );
    }
}