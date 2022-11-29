import React, {FC} from "react";
import styles from './myModal.module.sass'

interface MyModalProps {
    children: any,
    visible: boolean,
    setVisible: Function
}

const MyModal:FC<MyModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [styles.myModal]

    if (visible) {
        rootClasses.push(styles.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.myModalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.div_btn_close}>
                    <button className={styles.btn_close} onClick={() => setVisible(false)}>&times;</button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default MyModal