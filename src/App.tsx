import {FC, useCallback, useEffect, useState} from "react";
import words from "./worlList.json"
import HangmanDrawing from "./components/HangmanDrawing.tsx";
import HangmanWord from "./components/HangmanWord.tsx";
import Keyboard from "./components/Keyboard.tsx";

const App: FC = () => {
    const getWord = () => {
        return words[Math.floor(Math.random() * words.length)]
    }
    const [wordToGuess, setWordToGuess] = useState(getWord)
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])
    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

    console.log(wordToGuess)

    const isLoser = incorrectLetters.length >= 6
    const isWiner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))

    const addGuessedLetter = useCallback((letter: string) => {
        if (guessedLetters.includes(letter)||isLoser ||isWiner)
            return
        setGuessedLetters(currentLetters => [...currentLetters, letter])
    }, [guessedLetters,isLoser,isWiner])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
            if (!key.match(/^[a-z]$/)) return
            e.preventDefault()
            addGuessedLetter(key)
        }
        document.addEventListener('keypress', handler)
        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [guessedLetters]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key
         if (key !== "Enter") return
             e.preventDefault()
            setGuessedLetters([])
            setWordToGuess(getWord())

        }
        document.addEventListener('keypress', handler)
        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, []);
    return (
        <>
            <div style={{
                maxWidth: '800px',
                display: 'flex',
                flexDirection: "column",
                gap: '2rem',
                margin: '0 auto',
                alignItems: 'center'
            }}>
                <div style={{fontSize: "2rem", textAlign: 'center'}}>
                    {isWiner && 'WINNER!! - REFRESH TO TRY AGAIN'}
                    {isLoser && 'YOU ARE LOX!! - REFRESH TO TRY AGAIN'}
                </div>
                <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
                <HangmanWord
                    reveal={isLoser}
                    guessedLetters={guessedLetters}
                             wordToGuess={wordToGuess}/>
                <div style={{alignSelf: "stretch"}}>
                    <Keyboard
                        disabled={isWiner || isLoser}
                        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                        inactiveLetter={incorrectLetters}
                        addGuessedLetter={addGuessedLetter}
                    />
                </div>

            </div>
        </>
    )
}

export default App
