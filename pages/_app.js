import { AuthProvider } from '../context/authContext';
import store from '../redux/store';
import { Provider } from 'react-redux';

import Header from '../components/layout/header';

import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
};

export default App;
