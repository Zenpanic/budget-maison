import { useEffect, useState } from 'react';

import Category from './category';

import styles from './project.module.css';

const Project = ({ project }) => {

    const [categories, setCategories] = useState([...project.categories]);

    const deleteProject = async () => {
        console.log('ok');
    };

    const renameProject = () => {
        console.log('ok');
    };

    const [projectPrice, setProjectPrice] = useState(0);

    useEffect(() => {
        const totalPrice = project.elements.reduce((total, element) => {
            return total + (element.priceUnit * element.quantity);
        }, 0);
        setProjectPrice(totalPrice);
    }, [project]);

    return (
        <div className={styles.globalContainer}>
            <h2 className={styles.projectTitle}>{project.name} - {projectPrice}€</h2>
            {
                categories.map(category => {
                    return <Category
                        key={category}
                        category={category}
                        elements={project.elements.filter(element => element.category === category)}
                        projectId={project._id} />;
                })
            }
        </div>
    );
};

export default Project;