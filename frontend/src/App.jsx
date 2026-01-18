import RouterApp from './Screen/RouterApp';
import { store } from './Redux/Store';
import { Provider } from 'react-redux';



function App() {
  return (

    <Provider store={store}>
      <RouterApp />
        </Provider>
  )
}

export default App
