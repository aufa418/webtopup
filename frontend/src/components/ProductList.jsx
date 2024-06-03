import { useEffect, useState } from "react"
import Modal from "./Modal";
import PropTypes from 'prop-types'
import axios from "axios";

const ProductList = ({ game }) => {
    const ApiBase = import.meta.env.VITE_API_URL
    const getProduct = `${ApiBase}/game/${game}`
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(getProduct);
            if (!response.status == 200 ) throw new Error('Network response was not ok');

            setProduct(response.data.data);
        };

        fetchData();
    }, [getProduct]);


    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    }

    return (
        <div className="grid xl:grid-cols-3 gap-3 md:grid-cols-2 justify-items-center">
            {product ? product.map((product) => (
                <div key={product.id}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{product.name}</h2>
                            <p>{formatRupiah(product.price)}</p>
                            <div className="card-actions">
                                <Modal id={product.id} />
                            </div>
                        </div>
                    </div>
                </div>
            )) : 'Loading...'}
        </div>
    )
}

ProductList.propTypes = {
    game: PropTypes.string.isRequired
}

export default ProductList
