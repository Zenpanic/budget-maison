import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from '../context/authContext';
import { addProjectAsync, getProjectsAsync } from '../redux/projectSlice';

import Project from '../components/projects/project';

import styles from './dashboard.module.css';

const Dashboard = () => {

    const projects = useSelector((state) => state.projects);

    const { accessToken, loggedIn, removeToken, windowSize } = useAuthState();
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState('');

    // Getting the user projects
    useEffect(() => {
        if (!accessToken) return;
        dispatch(getProjectsAsync({ accessToken }));
    }, [dispatch, accessToken]);

    const onAddProjectClick = () => {
        if (!accessToken || loading) return;
        dispatch(addProjectAsync({ accessToken }));
    };

    const logout = async () => {
        return;
    };

    // Filter the projects
    const [filter, setFilter] = useState('');

    return (
        <div className={styles.globalContainer}>

            <nav className={styles.navMenu}>
                <p className={styles.navElement} onClick={onAddProjectClick}>Ajouter un projet</p>
                <p className={styles.navElement}>Déconnexion</p>
            </nav>

            <div className={styles.filterContainer}>
                <label htmlFor='filter' className={styles.formLabel}>Recherchez un projet</label>
                <input type='text' value={filter} className={styles.formInput} onChange={e => setFilter(e.target.value)} />
            </div>

            <div className={styles.projectList}>
                {
                    projects.map(project => {
                        return <Project project={project} key={project._id} />
                    })
                }
            </div>


        </div>
    );
};

export default Dashboard;