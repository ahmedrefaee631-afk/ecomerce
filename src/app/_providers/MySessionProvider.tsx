"use client";

import { SessionProvider } from "next-auth/react";
import CartContextprovider from "../_context/CartContext";

export default function MySessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>
    
    <CartContextprovider>

{children}

    </CartContextprovider>

    </SessionProvider>;
}
