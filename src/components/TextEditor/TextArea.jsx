const TextArea = ({
    text,
    setText,
    setCaretStart,
}) => {
    const handleChange = (e) => {
        setText(e.target.value)
    };

    const handleBlur = (e) => {
        // console.log(e.target.selectionStart)
        setCaretStart(Number(e.target.selectionStart));
    };

    return (
        <div>
            <textarea onChange={handleChange} onBlur={handleBlur}></textarea>
        </div>
    );
};

export default TextArea;
