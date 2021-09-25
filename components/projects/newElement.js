import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from '../../context/authContext';
import { addElementAsync, updateElementAsync } from '../../redux/projectSlice';

import styles from './newElement.module.css';

const NewElement = ({ category, projectId, element, hideForm, resetView }) => {

    const dispatch = useDispatch();
    const { accessToken } = useAuthState();

    const elementTemplate = {
        name: '',
        quantity: 0,
        quantityUnit: '',
        priceUnit: 0,
        source: '',
        category: '',
        projectId: '',
        id: String(Date.now())
    };

    const [newElement, setNewElement] = useState({ ...elementTemplate });

    // If update, set the existing element as a starting base
    useEffect(() => {
        if (!element) return;
        setNewElement({ ...element });
    }, [element]);

    // Add an element to the category

    const addElement = () => {
        // Screen for validation first
        if (!accessToken || !newElement.name || !newElement.priceUnit || !newElement.quantity) return;
        dispatch(addElementAsync({ element: { ...newElement, category: category, projectId: projectId }, accessToken: accessToken }));
        setNewElement({ ...elementTemplate });
        resetView();
    };

    const updateElement = () => {
        // Screen for validation first
        if (!accessToken || !newElement.name || !newElement.priceUnit || !newElement.quantity) return;
        dispatch(updateElementAsync({ element: { ...newElement }, accessToken: accessToken }));
        hideForm();
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor="name">Nom</label>
                <input
                    name="name"
                    type="text"
                    value={newElement.name}
                    onChange={(e) => setNewElement({ ...newElement, name: e.target.value })}
                />
            </div>
            <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor="quantityUnit">Unité</label>
                <input
                    name="quantityUnit"
                    type="text"
                    value={newElement.quantityUnit}
                    onChange={(e) => setNewElement({ ...newElement, quantityUnit: e.target.value })}
                />
            </div>
            <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor="quantity">Quantité</label>
                <input
                    name="quantity"
                    type="number"
                    min={0}
                    value={newElement.quantity}
                    onChange={(e) => setNewElement({ ...newElement, quantity: Number(e.target.value) })}
                />
            </div>
            <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor="priceUnit">Prix à l'unité</label>
                <input
                    name="priceUnit"
                    type="number"
                    value={newElement.priceUnit}
                    min={0}
                    onChange={(e) => setNewElement({ ...newElement, priceUnit: Number(e.target.value) })}
                />
            </div>
            <div className={styles.formElement}>
                <label className={styles.formLabel} htmlFor="source">Source</label>
                <input
                    name="source"
                    type="text"
                    value={newElement.source}
                    onChange={(e) => setNewElement({ ...newElement, source: e.target.value })}
                />
            </div>
            <div className={styles.formButtonContainer}>
                <button className={styles.saveButton} onClick={element ? updateElement : addElement}>{element ? 'Modifier' : 'Sauvegarder'}</button>
            </div>
        </div>
    );
};

export default NewElement;