import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Modal = ({ product }) => {
    const [gameId, setGameId] = useState('')
    const [Quantity, setQuantity] = useState(1)

    const ApiGames = import.meta.env.VITE_API_GAMES_URL
    const ApiGamesMerchant = import.meta.env.VITE_API_GAMES_MERCHANT
    const ApiGamesSignature = import.meta.env.VITE_API_GAMES_SIGNATURE

    useEffect(() => {
        setGameId('');
        setQuantity(1);
    }, [product]);

    const ShowModal = () => {
        document.getElementById('my_modal_3').showModal()
    }

    const CheckAccount = async (gameVariant) => {
        if (!gameVariant) {
            console.error('Game variant is undefined.');
            return;
        }
        console.log(`Checking account for game variant: ${product.game}`);
        const Api = `${ApiGames}/merchant/${ApiGamesMerchant}/cek-username/${product.game}?user_id=${gameId}&signature=${ApiGamesSignature}`;
        const response = await fetch(Api);
        const data = await response.json();
        console.log('Account check data:', data);
    }

    const FormatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    }

    const CalculatePrice = (x, y) => {
        const calculate = x * y
        return FormatRupiah(calculate)
    }

    const CloseModal = () => {
        document.getElementById('my_modal_3').close()
        setQuantity(1)
        setGameId('')
    }

    return (
        <div key={product.id}>
            <button className="btn btn-primary" onClick={() => ShowModal()}>Buy Now</button>
            {/* Modal */}
            <dialog id="my_modal_3" className="modal text-center" key={product.id}>
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => CloseModal()}>✕</button>

                    <h3 className="font-bold text-lg">Transaction - {product.game}</h3>

                    <div className="col mt-4 ">
                        <p className="mb-2 font-bold">Input Your ID Game</p>
                        <div className="join">
                            <input className="input input-bordered join-item" onChange={(e) => setGameId(e.target.value)} value={gameId} />
                            <button className="btn join-item btn-primary" onClick={() => CheckAccount(product.game)}>Cek</button>
                        </div>
                    </div>

                    <div className="col mt-4 ">
                        <p className="mb-2 font-bold">Quantity</p>
                        <input type="number" className="input input-bordered" onChange={(e) => setQuantity(e.target.value)} value={Quantity} />
                    </div>

                    <div className="col mt-4 ">
                        <p className="mb-2 font-bold">Price</p>
                        <input className="input input-bordered" value={CalculatePrice(product.price, Quantity)} readOnly />
                    </div>

                    <button className="btn btn-primary mt-8">Buy Now</button>
                </div>
            </dialog>
        </div>
    )
}

Modal.propTypes = {
    product: PropTypes.object.isRequired
}

export default Modal
