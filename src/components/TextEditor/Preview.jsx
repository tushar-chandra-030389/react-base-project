const Preview = ({
    text,
}) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
        </div>
    );
};

export default Preview;
