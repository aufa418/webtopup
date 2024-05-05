import ProductList from "../components/ProductList"
import MyLayout from "../partials/MyLayout"
const Homepage = () => {
  return (
    <>
      <MyLayout />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Web Top Up</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <a className="btn btn-primary" href="#productlist">Get Started</a>
          </div>
        </div>
      </div>

      <div id="productlist" className="mt-9 mx-10">
        <p className="text-2xl font-bold text-center">Mobile Legend</p>
        <ProductList game="mobilelegend" />
      </div>

      <div id="productlist" className="mt-9 mx-10">
        <p className="text-2xl font-bold text-center">Free Fire</p>
        <ProductList game="freefire" />
      </div>
    </>
  )
}

export default Homepage
