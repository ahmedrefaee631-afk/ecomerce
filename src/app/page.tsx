import Image from "next/image";
import Mainslider from "./_components/mainslider/mainslider";
import Categoryslider from "./_components/category-slider/categoryslider";
import Products from "./products/page";





export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Mainslider/>
      <Categoryslider/>
      <Products/>
  </>
  );

}
