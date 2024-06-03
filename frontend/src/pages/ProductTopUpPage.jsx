
import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import ProductList from "../components/ProductList"

const ProductTopUpPage = () => {
  const { game } = useParams()

  return (
    <>
      <Navbar isAdmin={false} />
      <Link to="/" className="btn btn-outline mt-3">Back</Link>
      <h1 className="font-bold text-2xl my-4 text-center">Product</h1>
      <div className="mx-auto">
        <ProductList game={game} />
      </div>
    </>
  )
}

export default ProductTopUpPage