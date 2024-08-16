import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectLoadingState,
    selectPreference,
    selectAdminModules,
    loaded,
    refresh,
    getPreference
} from 'src/store/slices/rootSlice';
import { sagaActions } from 'src/store/saga/rootSaga';
import style from './home.module.scss';

var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 200;
function getRandomBool(n) {
    var maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) n = maxRandomCoeff;
    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}
function getSuggestions(text) {
    var pre = "pre";
    var post = "post";
    var results = [];
    if (getRandomBool(2)) {
        results.push(pre + text);
    }
    if (getRandomBool(2)) {
        results.push(text);
    }
    if (getRandomBool(2)) {
        results.push(text + post);
    }
    if (getRandomBool(2)) {
        results.push(pre + text + post);
    }
    return new Promise((resolve, reject) => {
        var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
        setTimeout(() => {
            if (getRandomBool(FAILURE_COEFF)) {
                reject();
            } else {
                resolve(results);
            }
        }, randomTimeout);
    });
}

function findWordIndex(words, caretLocation) {
    const updatedCaretLocation = caretLocation - words.length ;
    let lengthTillCurrentWord = 0;

    for(let i=0; i< words.length; i++) {
        if (i === 0) {
            if (updatedCaretLocation < words[i].length) {
                return i;
            }
        } else {
            if (updatedCaretLocation < lengthTillCurrentWord + words[i].length) {
                return i;
            }
        }
        lengthTillCurrentWord = lengthTillCurrentWord + words[i].length;
    }

    return -1;
}

function Home() {
    const [inputValue, setInputValue] = useState('');
    const inputElemRef = useRef();
    const [suggestions, setSuggestions] = useState([]);
    const delay = useRef(0);
    const wordIndex = useRef(-1);
    const isNotFetch = useRef(false);

    useEffect(() => {
        let cancel = false;
        // console.log(inputValue);
        // console.log(inputElemRef.current.selectionStart);
        const words = inputValue.split(' ');
        wordIndex.current = findWordIndex(words, inputElemRef.current.selectionStart);
        // console.log(wordIndex)


        const fetchSuggestion = async (word) => {
            try {
                const result = await getSuggestions(word);
                delay.current = 0;
                if (cancel) {
                    return;
                }
                setSuggestions(result);
            } catch(e) {
                console.log('Exception', e, delay);
                if (cancel) {
                    delay.current = 0;
                    return;
                }
                if (delay === 0 + 200) {
                    console.log('Server failure!!!');
                    return;
                }
                setTimeout(() => {
                    fetchSuggestion(words[wordIndex.current]);
                }, delay);
                delay.current = delay.current + 100;
            }
        }

        if (isNotFetch.current) {
            return;
        }

        fetchSuggestion(words[wordIndex.current])

        return () => {
            cancel = true;
        };
    }, [inputValue]);

    const handleSuggestionSelect = (suggestion) => {
        console.log('selected: ', suggestion);
        const words = inputValue.split(' ');
        words[wordIndex.current] = suggestion;
        setInputValue(words.join(' '));
        isNotFetch.current = true;
    };

    const handleInputChange = (e) => {
        isNotFetch.current = false;
        setInputValue(e.target.value)
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                ref={inputElemRef}
            />
            <div className='result-container'>
                {suggestions.map((suggestion) => {
                    return (
                        <div
                            key={suggestion}
                            onClick={() => handleSuggestionSelect(suggestion)}
                        >
                            {suggestion}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
