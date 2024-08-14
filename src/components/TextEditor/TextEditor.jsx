import { useState, useEffect, useCallback } from 'react';
import Toolbar from "./Toolbar";
import TextArea from "./TextArea";
import Preview from "./Preview";
import styles from './text-editor.module.scss';

// util function
const getCurrentLine = (caretStart, arrayText) => {
    const sum = 0;
    for (let i=0; i < arrayText; i++) {
        if (caretStart < arrayText[i].length) {
            return i;
        }
    }
};

const TextEditor = () => {
    const [text, setText] = useState('');
    const [caretStart, setCaretStart] = useState(0);
    const [previewTest, setPreviewText] = useState('');
    const [textStyle, setTextStyle] = useState(new Map());
    const [arrayText, setArrayText] = useState([]);

    useEffect(() => {
        setArrayText(text.split('\n'));
    }, [text]);

    useEffect(() => {
        const updatedText = arrayText.join('<br/>');
        setPreviewText(updatedText);
    }, [arrayText]);

    const handleTextStyleChange = (ts) => {
        const lineNumber = getCurrentLine(caretStart, arrayText);
        setTextStyle((m) => {

        });
    };


    return (
        <div className={styles.container}>
            <Toolbar
                onTextStyleChange={handleTextStyleChange}
            />
            <div className={styles['text-container']}>
                <TextArea
                    text={text}
                    setText={setText}
                    setCaretStart={setCaretStart}
                />
                <Preview
                    text={previewTest}
                />
            </div>
        </div>
    );
};

export default TextEditor;
