import {FC} from 'react';
import styles from './Keyboard.module.css'


const KEYS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
type KeyboardProps = {
    disabled?:boolean
    activeLetters:string[],
    inactiveLetter:string[],
    addGuessedLetter: (letter:string) => void

}
const Keyboard:FC<KeyboardProps> = ({activeLetters,inactiveLetter,addGuessedLetter,disabled = false}) => {

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: "repeat(auto-fit,minmax(75px,1fr))",
            gap: ".5rem"
        }}>
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetter.includes(key)
                return <button
                    disabled={isInactive || isActive || disabled}
                    onClick={()=> addGuessedLetter(key)}
                    className={`${styles.btn} ${isActive ? styles.active : ''} ${isInactive ? styles.inactive : ''}` }
                               key={key}>{key}</button>
            })}
        </div>
    );
};

export default Keyboard;
