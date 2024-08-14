import { useState } from 'react';
import styles from './toolbar.module.scss';

const Toolbar = ({
    onTextStyleChange,
}) => {
    const [textStyle, setTextStyle] = useState('BODY');

    const handleTextStyleChange = (e) => {
        // console.log(e.target.value)
        onTextStyleChange(e.target.value);
    };

    
    return (
        <div className={styles.container}>
            <div className=''>
                <select name="" id="" onChange={handleTextStyleChange} value={textStyle}>
                    <option value='H1'>H1</option>
                    <option value="H2">H2</option>
                    <option value="BODY">Body</option>
                </select>
            </div>
        </div>
    );
};

export default Toolbar;
