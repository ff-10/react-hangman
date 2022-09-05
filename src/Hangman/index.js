import { Component } from "react";
import style from './style.module.css';
import { getImages } from '../constants/images'
import { randomWord } from '../constants/words';

export default class Hangman extends Component {

    constructor() {
        super();

        this.state = {
            images: getImages(),
            secretWord: randomWord(),
            guessedWord: [],
            guessedLetters: [],
            choices: 6,
            isWin: false
        }
        this.handleGuess = this.handleGuess.bind(this);
        this.decryptWord = this.decryptWord.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.compareValues = this.compareValues.bind(this);
    }

    restartGame() {
        this.setState({ choices: 6, guessedLetters: [], secretWord: randomWord() });
        this.decryptWord();
    }

    decryptWord() {
        const decryptedWord = this.state.secretWord.split("").map(letter => '_');
        this.setState({ guessedWord: decryptedWord });
    }

    compareValues() {
        const secWord = this.state.secretWord.split("");
        const guessedLetters = this.state.guessedLetters;
        const guessedWord = this.state.guessedWord;
        secWord.forEach((currentVal, idx) => {
            for (const ltr of guessedLetters) {
                if (currentVal === ltr) {
                    guessedWord[idx] = secWord[idx];
                    this.setState({ guessedWord: guessedWord });
                    return;
                }
            }
        });
    }

    changeGameStatus() {
        const guessedWord = this.state.guessedWord.join("");
        const INTERVAL = 1500;
        if (guessedWord === this.state.secretWord) {
            alert(`CONGRARULATIONS! Secret Word: ${this.state.secretWord}`);
            setTimeout(() => {
                this.restartGame();
            }, INTERVAL);
            return
        } else if (!this.state.choices) {
            alert(`YOU LOSE! Secret Word: ${this.state.secretWord}`);
            setTimeout(() => {
                this.restartGame();
            }, INTERVAL);
        }
    }

    handleGuess(event) {
        let isHave = this.state.secretWord.split("").filter(letter => letter === event.target.value); // if secretword contain the letter

        if (isHave.length) {
            this.setState((state) => ({ guessedLetters: [...state.guessedLetters, event.target.value] }));
            setTimeout(() => this.compareValues(), 15);
            return;
        } else {
            this.setState((state) => ({ guessedLetters: [...state.guessedLetters, event.target.value], choices: state.choices - 1 }));
            setTimeout(() => this.compareValues(), 15);
        }
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
                {letter}
            </button>));

    }

    drawImage() {
        switch (this.state.choices) {
            case 6: return this.state.images[0];
            case 5: return this.state.images[1];
            case 4: return this.state.images[2];
            case 3: return this.state.images[3];
            case 2: return this.state.images[4];
            case 1: return this.state.images[5];
            case 0: return this.state.images[6];
            default: return this.state.images[0];
        }
    }

    componentDidMount() {
        this.decryptWord();
        this.drawImage();
    }

    componentDidUpdate() {
        this.changeGameStatus();
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.imgContainer}>
                    <img src={this.drawImage()} alt="Hangman Img" />
                </div>

                <div className={style.guessedWordsArea}>
                    <div className={style.secretWord}>
                        {this.state.guessedWord}
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