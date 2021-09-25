import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategoryAsync } from '../../redux/projectSlice';
import { useAuthState } from '../../context/authContext';

import Category from './category';

import styles from './project.module.css';

const Project = ({ project }) => {

    const { accessToken } = useAuthState();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([...project.categories]);
    const [projectPrice, setProjectPrice] = useState(0);

    useEffect(() => {
        const totalPrice = project.elements.reduce((total, element) => {
            return total + (element.priceUnit * element.quantity);
        }, 0);
        setProjectPrice(totalPrice);
        setCategories([...project.categories]);
    }, [project]);

    // Add a new category
    const [newName, setNewName] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const toggleForm = () => setFormVisible(!formVisible);
    const addCategory = () => {
        if (!accessToken || !newName || categories.includes(newName.toLowerCase())) return;
        dispatch(addCategoryAsync({ newName: newName, accessToken: accessToken, projectId: project._id }));
        setNewName('');
        setFormVisible(false);
    };

    return (
        <div className={styles.globalContainer}>
            <h2 className={styles.projectTitle}>{project.name} - {projectPrice}€</h2>
            <button className={styles.addButton} onClick={toggleForm}>{formVisible ? 'Annuler' : 'Ajouter une catégorie'}</button>
            {formVisible ? <div className={styles.formContainer}>
                <label className={styles.formLabel} htmlFor="newName">Nouveau nom</label>
                <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    name="newName"
                    className={styles.formInput}
                />
                <button className={styles.submitButton} onClick={addCategory}>Valider</button>
            </div> : null}
            {
                categories.map(category => {
                    return <Category
                        key={category}
                        category={category}
                        elements={project.elements.filter(element => element.category === category)}
                        projectId={project._id}
                        categories={project.categories} />;
                })
            }
        </div>
    );
};

export default Project;