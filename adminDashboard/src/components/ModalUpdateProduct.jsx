import axios from "axios"
import PropTypes from 'prop-types'
import { useState } from "react"

const ModalUpdateProduct = ({ id, setDataChange }) => {
    const [selectedGame, setSelectedGame] = useState('')
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')

    const ModalId = `modal_${id}`

    const ApiBase = import.meta.env.VITE_API_URL

    const CloseModal = () => {
        document.getElementById(ModalId).close()
        setProductName('')
        setProductPrice('')
        setSelectedGame('')
    }

    const OpenModal = async () => {
        const dataProduct = await axios.get(`${ApiBase}/id/${Number(id)}`)

        if (dataProduct.length === 0) {
            setProductName('No Data')
            setProductPrice('No Data')
            setSelectedGame('Free Fire')
        }
        setProductName(dataProduct.data.data.name)
        setProductPrice(dataProduct.data.data.price)
        setSelectedGame(dataProduct.data.data.game)
        document.getElementById(ModalId).showModal()
    }

    const SubmitProduct = async (e) => {
        e.preventDefault()

        const data = {
            name: productName,
            price: parseInt(productPrice),
            game: selectedGame,
        }

        const response = await axios.put(`${ApiBase}/update/${id}`, data)

        if (response.statusText === 'OKE') return CloseModal()
        setDataChange(true)
    }

    return (
        <>
            <button className="btn btn-sm" onClick={() => OpenModal()}>Edit</button>
            <dialog id={ModalId} className="modal">
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

                        <select className="select select-bordered w-full max-w-xs" value={selectedGame == 'freefire' ? 'freefire' : 'mobilelegend'} onChange={(e) => setSelectedGame(e.target.value)}>
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

ModalUpdateProduct.propTypes = {
    id: PropTypes.number.isRequired,
    setDataChange: PropTypes.func.isRequired
}

export default ModalUpdateProduct