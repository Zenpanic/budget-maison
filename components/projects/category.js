import { useState, useEffect } from 'react';

import Element from './element';
import NewElement from './newElement';

import styles from './category.module.css';

const Category = ({ elements, category, projectId }) => {

    // Possibility to rename the category
    // Possibility to delete the category

    // Reset category view
    const resetView = () => {
        setVisible(false);
        setFormVisible(false);
    };

    // Set the visibility of the new element form
    const [formVisible, setFormVisible] = useState(false);
    const toggleForm = () => setFormVisible(!formVisible);

    // Set the visibility of the elements
    const [visible, setVisible] = useState(false);
    const toggleElements = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        if (visible === false) resetView();
    }, [visible])

    // Set the price of the category
    const [categoryPrice, setCategoryPrice] = useState(0);
    useEffect(() => {
        if (!elements?.length) return;
        const price = elements.reduce((total, element) => {
            return total + (element.priceUnit * element.quantity);
        }, 0);
        setCategoryPrice(price);
    }, [elements]);

    return (
        <div className={styles.globalContainer}>
            <h3 onClick={toggleElements} className={styles.categoryTitle}>{category} - {categoryPrice}€ - <span className={styles.elementLength}>({elements.length})</span></h3>
            {visible ? <button className={styles.addButton} onClick={toggleForm}>{formVisible ? 'Annuler' : 'Ajouter'}</button> : null}
            {formVisible ? <NewElement projectId={projectId} category={category} resetView={resetView} /> : null}
            {visible ? <div className={styles.elementList}>
                {
                    elements.map(element => {
                        return <Element element={element} />
                    })
                }
            </div> : null}
        </div>
    );
};

export default Category;