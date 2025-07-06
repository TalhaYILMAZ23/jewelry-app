import './App.css';
import { ProductList } from './components/ProductList/ProductList';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Product List</h1>
      </header>
      <main>
        <ProductList />
      </main>
      </div>
  );
}

export default App;
