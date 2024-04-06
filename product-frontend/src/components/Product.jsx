import React, { useState, useEffect } from "react";
import { GetProducts, CreateProduct, UpdateProduct, DeleteProduct } from "../service/ProductService";
import defaultimage from '../assets/default-product.png'

const Product = () => {
    const [products, setProducts] = useState([]);
    const [PopUpForm, setPopUpForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
    });

    useEffect(() => {
        //Initially Get all Products
        handleGetProducts();
    }, []);
    //Function to Get all existing Products
    const handleGetProducts = () => {
        GetProducts()
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error("Error fetching products:", error));
    };
    //Function recognize input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };
    //Function to create a new Product
    const handleCreateProduct = () => {
        CreateProduct(newProduct)
            .then(() => {
                setPopUpForm(false);
                handleGetProducts();
            })
            .catch(error => console.error("Error creating product:", error));
    };
    //Function to update an existing Product
    const handleUpdateProduct = () => {
        UpdateProduct(selectedProduct.id, newProduct)
            .then(() => {
                setPopUpForm(false);
                handleGetProducts();
            })
            .catch(error => console.error("Error updating product:", error));
    };
    //Function to delete an existing Product
    const handleDeleteProduct = (productId) => {
        DeleteProduct(productId)
            .then(() => {
                handleGetProducts();
            })
            .catch(error => console.error("Error deleting product:", error));
    };
    //Funtion set mapped_product to newProduct && open PopUpForm
    const openUpdatePopUpForm = (product) => {
        setSelectedProduct(product);
        setNewProduct({ ...product });
        setPopUpForm(true);
    };
    //Funtion reset newProduct to null && open PopUpForm
    const openCreatePopUpForm = () => {
      setSelectedProduct(null);
      setNewProduct({
        name: '',
        description: '',
        price: 0
      });
      setPopUpForm(true);
    };

    return (
        <>
            <div className=" bg-white p-12">
                <div className=" grid grid-cols-1 sm:grid-cols-2 py-5">
                  <h2 className=" sm:text-left text-center text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                  <button className="sm:justify-self-end bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none" onClick={() => {openCreatePopUpForm()}} > + Create Product </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg p-4">
                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                <img src={defaultimage} alt={product.name} className="object-cover rounded-lg w-full h-full" />
                            </div>
                            <div className="flex justify-between">
                              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                              <p className="text-gray-800 font-semibold">${product.price}</p>
                            </div>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <div className="flex justify-end mt-4">
                                <button className="text-blue-500 hover:text-blue-600 mr-2" onClick={() => openUpdatePopUpForm(product)}>Edit</button>
                                <button className="text-red-500 hover:text-red-600" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
               
            </div>
            {/*  Form for creating or updating product */}
            {PopUpForm && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="bg-white rounded-lg shadow-lg relative w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Product Details</h3>
                            <button className="text-gray-600 hover:text-gray-700" onClick={() => setPopUpForm(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                      <form action="#">
                      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                          <div className="sm:col-span-2">
                              <label htmlForfor="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                              <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""value={newProduct.name || ''} onChange={handleInputChange}/>
                          </div>
                          <div className="sm:col-span-2">
                              <label htmlFor="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                              <textarea id="description" name="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" required="" value={newProduct.description || ''} onChange={handleInputChange}/>
                          </div>
                          <div className="w-full">
                              <label htmlForfor="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                              <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" value={newProduct.price || ''} onChange={handleInputChange}/>
                          </div>
                      </div>
                      <div className="flex justify-start py-4">
                        {selectedProduct ? (
                            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mr-2" onClick={handleUpdateProduct}>Update</button>
                        ) : (
                            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 mr-2" onClick={handleCreateProduct}>Create</button>
                        )}
                        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400" onClick={() => setPopUpForm(false)}>Cancel</button>
                      </div>
                      </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Product;
