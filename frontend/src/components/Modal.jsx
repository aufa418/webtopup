import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const Modal = ({ id }) => {
    const [gameId, setGameId] = useState('')
    const [Quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState([])
    const [username, setUsername] = useState('')

    const ModalId = `modal_${id}`

    const ApiBase = import.meta.env.VITE_API_URL
    const ApiGames = import.meta.env.VITE_API_GAMES_URL
    const ApiGamesMerchant = import.meta.env.VITE_API_GAMES_MERCHANT
    const ApiGamesSignature = import.meta.env.VITE_API_GAMES_SIGNATURE


    useEffect(() => {
        if (Quantity < 1) return setQuantity(1)

        const snapScript = import.meta.env.VITE_SNAP_JS_LOCATION
        const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY

        const script = document.createElement('script')
        script.src = snapScript
        script.setAttribute('data-client-key', clientKey)

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [Quantity]);

    const ShowModal = async (productID) => {
        document.getElementById(ModalId).showModal()

        const product = await fetch(`${ApiBase}/id/${productID}`)
        const response = await product.json()

        setProduct(response.data)
    }

    const CheckAccount = async (gameVariant) => {
        setUsername('Loading...')
        const game = product.game.replace(/\s/g, '').toLowerCase()

        if (!gameVariant) {
            setUsername('Game variant is undefined.');
        }


        const Api = `${ApiGames}/merchant/${ApiGamesMerchant}/cek-username/${game}?user_id=${gameId}&signature=${ApiGamesSignature}`;
        const response = await axios.get(Api);

        if (!gameId) return setUsername('ID Game Wajib diisi')
        if (response.data.status == 0) return setUsername('ID Game Tidak ada')
        setUsername(response.data.data.username)
    }

    const FormatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    }

    const CalculatePrice = (x, y) => {
        const calculate = x * y
        return FormatRupiah(calculate)
    }

    const CloseModal = () => {
        document.getElementById(ModalId).close()
        setQuantity(1)
        setGameId('')
        setProduct([])
        setUsername('')
    }

    const BuyProduct = async () => {
        try {
            const Api = `${ApiBase}/payment`
            const data = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: Quantity,
            }

            const FetchingData = await axios.post(Api, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            window.snap.pay(FetchingData.data.token, {
                onSuccess: async () => {
                    const transactionData = {
                        quantity: parseInt(Quantity),
                        productId: parseInt(product.id),
                        gameId: gameId
                    }

                    await axios.post(`${ApiBase}/transaction/create`, transactionData, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                }
            })

            CloseModal()
        } catch (error) {
            alert('Error')
        }
    }

    return (
        <div key={id}>
            <button className="btn btn-primary" onClick={() => ShowModal(id)}>Buy Now</button>

            {/* Modal */}
            <dialog id={ModalId} className="modal text-center" key={id}>
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => CloseModal()}>✕</button>

                    <h3 className="font-bold text-lg">Transaction</h3>

                    <div className="col mt-4">
                        <p className="mb-2 font-bold">Input Your ID Game</p>
                        <div className="join">
                            <input className="input input-bordered join-item" onChange={(e) => setGameId(e.target.value)} value={gameId} required />
                            <button className="btn join-item btn-primary" onClick={() => CheckAccount(product.game)}>Cek</button>
                        </div>
                        <div>
                            {product.game == 'freefire' ? (
                                <small>Tolong isi seperti : 689355****</small>
                            ) : (
                                <small>Tolong isi seperti : 9178****(****)</small>
                            )}
                        </div>
                    </div>

                    <div className="col mt-4 ">
                        <p className="mb-2 font-bold">Username Game</p>
                        <input className="input input-bordered" value={username} readOnly />
                        <div>
                            <small>Tunggu sampai username muncul</small>
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

                    <button className="btn btn-primary mt-8" onClick={() => BuyProduct()}>Buy Now</button>
                </div>
            </dialog>
        </div>
    )
}

Modal.propTypes = {
    id: PropTypes.number.isRequired
}

export default Modal
