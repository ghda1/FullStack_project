import { HelmetProvider } from "react-helmet-async";
import "./App.css";

import { ProductProvider } from "./contexts/ProductContext";
import { UserProvider } from "./contexts/UserContext";
import { AddressProvider } from "./contexts/AddressContext";
import { SizeProvider } from "./contexts/SizeContext";
import { ColorProvider } from "./contexts/ColorContext";
import { CartProvider } from "./contexts/CartContext";
import Index from "./routs/Index";

function App() {
 

  return (
    <HelmetProvider>
      <UserProvider>
        <AddressProvider>
          <ProductProvider>
            <SizeProvider>
              <ColorProvider>
                <CartProvider>
                 <Index/>
                </CartProvider>
              </ColorProvider>
            </SizeProvider>
          </ProductProvider>
        </AddressProvider>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
