import { AppProvider } from '@shopify/polaris'
import enTranslations from "@shopify/polaris/locales/en.json";
import DiscountPage from './pages/DiscountPage/DiscountPage';
import './App.css'
function App() {

  return (
    <AppProvider i18n={enTranslations}>
      <DiscountPage />
    </AppProvider>
  )
}

export default App
