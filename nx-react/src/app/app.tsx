// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { lazy } from 'react';

const Checkout = lazy(() => import('checkout/Checkout'));

export function App() {
  return (
    <div>
      <Checkout token='<YOUR_PAYMENT_TOKEN>' />
    </div>
  );
}

export default App;
