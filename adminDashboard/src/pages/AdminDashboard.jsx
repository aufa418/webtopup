import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import { useState, useEffect } from 'react'
import ModalUpdateProduct from '../components/ModalUpdateProduct.jsx'
import ModalCreateProduct from '../components/ModalCreateProduct.jsx'

const AdminDashboard = () => {
  const [dataChange, setDataChange] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [products, setProducts] = useState([])

  const ApiBase = import.meta.env.VITE_API_URL

  const fetchData = async (ApiBase, setTransactions, setProducts) => {
    const transactionData = await axios.get(`${ApiBase}/transaction`);
    const productsData = await axios.get(`${ApiBase}/`);

    setTransactions(transactionData.data.data);
    setProducts(productsData.data.data);
  };

  useEffect(() => {
    fetchData(ApiBase, setTransactions, setProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChange]);

  const DeleteProduct = async (id) => {
    await axios.delete(`${ApiBase}/delete/${parseInt(id)}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setDataChange(true)
  }

  const ProductList = () => {
    if (products.length === 0) {
      return (
        <tr>
          <td>No Data</td>
        </tr>
      )
    }

    return products.map((value, i) => (
      <tr key={value.id}>
        <th> {i + 1} </th>
        <td> {value.name} </td>
        <td> {value.price} </td>
        <td> {value.game} </td>
        <td> <ModalUpdateProduct id={value.id} setDataChange={setDataChange} /> | <button className="btn btn-sm" onClick={() => DeleteProduct(value.id)}>Delete</button> </td>
      </tr>
    ))
  }

  const DeleteTransaction = async (id) => {
    await axios.delete(`${ApiBase}/transaction/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setDataChange(true)
  }

  const OrderList = () => {
    if (transactions.length === 0) {
      return (
        <tr>
          <td>No Data</td>
        </tr>
      )
    }

    return (
      transactions.map((value, i) => (
        <tr key={i + value.id}>
          <th> {i + 1} </th>
          <td> {value.product.name} </td>
          <td> {value.product.price} </td>
          <td> {value.quantity} </td>
          <td> {value.product.price * value.quantity} </td>
          <td> {value.gameId} </td>
          <td> <button type="submit" className="btn btn-sm" onClick={() => DeleteTransaction(value.id)}>Done</button> </td>
        </tr>
      ))
    )
  }

  return (
    <>
      <Navbar />
      <br />
      <ModalCreateProduct setDataChange={setDataChange} />
      <div className="card w-full bg-base-100 shadow-2xl mb-5 p-5">
        <div className="card-title mx-auto">
          <div className="text-center text-xl font-bold">
            Daftar Product
          </div>
        </div>

        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Price Product</th>
                  <th>Game</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <ProductList />
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card w-full bg-base-100 shadow-2xl p-5">
        <div className="card-title mx-auto">
          <div className="text-center text-xl font-bold">
            Daftar Transaksi
          </div>
        </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product Name</th>
                  <th>Price Product</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>ID Game</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <OrderList />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
