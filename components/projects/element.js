import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from '../../context/authContext';
import { deleteElementAsync } from '../../redux/projectSlice';

import NewElement from './newElement';

import styles from './element.module.css';

const Element = ({ element }) => {

    const dispatch = useDispatch();
    const { accessToken } = useAuthState();

    const [elementEdit, setElementEdit] = useState(false);

    const toggleEdit = () => setElementEdit(!elementEdit);
    const hideForm = () => setElementEdit(false);

    const deleteElement = () => {
        if (!accessToken) return;
        dispatch(deleteElementAsync({ element: { ...element }, accessToken: accessToken }));
    };

    return (
        <div className={styles.globalContainer}>
            <div className={styles.header}>
                <p className={styles.headerElement} onClick={toggleEdit}>{!elementEdit ? 'Editer' : 'Annuler'}</p>
                <p className={styles.headerElement} onClick={deleteElement}>Supprimer</p>
            </div>
            {!elementEdit ?
                <div className={styles.content}>
                    <p className={styles.elementName}>{element.name}</p>
                    <p>Quantité : {element.quantity} {element.quantityUnit}</p>
                    <p>{element.priceUnit}€ / {element.quantityUnit}</p>
                    <p>Source : {element.source}</p>
                    <p>Prix total : <span className={styles.price}>{element.quantity * element.priceUnit}€</span></p>
                </div> :
                <NewElement element={element} category={element.category} projectId={element.projectId} hideForm={hideForm} />
            }
        </div>
    );
};

export default Element;