import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from '../../context/authContext';
import { renameCategoryAsync, deleteCategoryAsync } from '../../redux/projectSlice';

import Element from './element';
import NewElement from './newElement';

import styles from './category.module.css';

const Category = ({ elements, category, projectId, categories }) => {

    const { accessToken } = useAuthState();
    const dispatch = useDispatch();

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

    // Rename the category
    const [viewRename, setViewRename] = useState(false);
    const toggleViewRename = () => setViewRename(!viewRename);
    const [newName, setNewName] = useState('');
    const renameCategory = () => {
        if (!accessToken || !newName || categories.includes(newName.toLowerCase())) return;
        dispatch(renameCategoryAsync({ accessToken: accessToken, newName: newName, oldName: category, projectId: projectId }));
        setViewRename(false);
    };

    // Delete the category
    const deleteCategory = () => {
        if (!accessToken) return;
        const wannaDelete = confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
        if (!wannaDelete) return;
        dispatch(deleteCategoryAsync({ accessToken: accessToken, projectId: projectId, category: category }));
    };

    return (
        <div className={styles.globalContainer}>
            <h3 onClick={toggleElements} className={styles.categoryTitle}>{category} - {categoryPrice}€ - <span className={styles.elementLength}>({elements.length})</span></h3>
            <div className={styles.optionContainer}>
                <p className={styles.categoryOption} onClick={toggleViewRename}>{viewRename ? 'Annuler' : 'Renommer'}</p>
                <p className={styles.categoryOption} onClick={deleteCategory}>Supprimer</p>
            </div>
            {viewRename ?
                <div className={styles.formContainer}>
                    <label className={styles.formLabel} htmlFor="newName">Nouveau nom</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        name="newName"
                        className={styles.formInput}
                    />
                    <button className={styles.submitButton} onClick={renameCategory}>Valider</button>
                </div> : null}
            {visible ? <button className={styles.addButton} onClick={toggleForm}>{formVisible ? 'Annuler' : 'Ajouter un nouvel élément'}</button> : null}
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