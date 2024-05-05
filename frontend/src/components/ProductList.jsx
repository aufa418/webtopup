import { useEffect, useState } from "react"
import Modal from "./Modal";
import PropTypes from 'prop-types'

const ProductList = ({ game }) => {
    const getProduct = `${import.meta.env.VITE_API_URL}/product/game/${game}`
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(getProduct);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();

                setProduct(data.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchData();
    }, [getProduct]);


    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    }

    return (
        <div>
            {product.map((product) => (
                <div key={product.id}>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{product.name}</h2>
                            <p>{formatRupiah(product.price)}</p>
                            <div className="card-actions">
                                <Modal product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

ProductList.propTypes = {
    game: PropTypes.string.isRequired
}

export default ProductList
