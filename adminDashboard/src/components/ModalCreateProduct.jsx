import axios from "axios"
import { useState } from "react"
import PropTypes from "prop-types"

const ModalCreateProduct = ({ setDataChange }) => {
    const [selectedGame, setSelectedGame] = useState('freefire')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')

    const ApiBase = import.meta.env.VITE_API_URL

    const CloseModal = () => {
        document.getElementById('my_modal_3').close()
        setProductName('')
        setProductPrice('')
        setSelectedGame('')
    }

    const SubmitProduct = async (e) => {
        e.preventDefault()

        const data = {
            name: productName,
            price: parseInt(productPrice),
            game: selectedGame,
        }

        try {
            await axios.post(`${ApiBase}/create`, data)
            CloseModal()
            setDataChange(true)
        } catch (error) {
            console.error(error.message)
        }

    }

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn font-bold" onClick={() => document.getElementById('my_modal_3').showModal()}>Create Product</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <button type='button' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => CloseModal()}>✕</button>
                    <form onSubmit={SubmitProduct} method="post" className='mt-10'>
                        <label className="input input-bordered flex items-center gap-2">
                            Product Name
                            <input type="text" className="grow" value={productName} onChange={(e) => setProductName(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 my-2">
                            Price
                            <input type="text" className="grow" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                        </label>

                        <select className="select select-bordered w-full max-w-xs" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
                            <option value='freefire'>Free Fire</option>
                            <option value='mobilelegend'>Mobile Legend</option>
                        </select>

                        <button type="submit" className='btn btn-primary w-full mt-10'>Submit</button>
                    </form>
                </div>
            </dialog>

        </>
    )
}

ModalCreateProduct.propTypes = {
    setDataChange: PropTypes.func.isRequired
}

export default ModalCreateProduct