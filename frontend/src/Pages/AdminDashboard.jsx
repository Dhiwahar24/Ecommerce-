import React, { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct
} from "../api/ProductAPI";
import productImg from "../Assets/ben.jpeg";
import "../Styles/Admin.scss";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: ""
  });

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm({ name: "", price: "", image: "" });
    setEditId(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image
    });
    setEditId(product.id);

    document
      .getElementById("product-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.image) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      name: form.name,
      price: Number(form.price),
      image: form.image
    };

    try {
      if (editId) {
        await updateProduct(editId, payload);
        setEditId(null);
      } else {
        await addProduct(payload);
      }

      resetForm();
      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) {
      return;
    }

    await deleteProduct(id);

    if (editId === id) {
      resetForm();
    }

    loadProducts();
  };

  const logout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/admin";
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>MiniStore</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="sidebar-nav">
          <button
            type="button"
            className="nav-item active"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            📊 Dashboard
          </button>
          <button
            type="button"
            className="nav-item"
            onClick={() =>
              document
                .getElementById("product-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            📦 Products
          </button>
        </nav>

        <button
          type="button"
          className="sidebar-logout"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>Product Management</h1>
            <p>Manage your store inventory</p>
          </div>
          <span className="product-count">
            {products.length} products
          </span>
        </header>

        <section
          className="admin-card"
          id="product-form"
        >
          <div className="card-header">
            <h3>
              {editId ? "Edit Product" : "Add Product"}
            </h3>
            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Name</label>
              <input
                placeholder="Product name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="form-field">
              <label>Price</label>
              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>

            <div className="form-field">
              <label>Image</label>
              <input
                placeholder="e.g. ben10.jpg"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
              >
                {editId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </section>

        <section className="admin-card">
          <div className="card-header">
            <h3>All Products</h3>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr
                      key={p.id}
                      className={
                        editId === p.id ? "editing-row" : ""
                      }
                    >
                      <td>{p.id}</td>
                      <td>{p.name}</td>
                      <td>
                        ₹{p.price?.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <img
                          src={productImg}
                          alt={p.image}
                          title={p.image}
                        />
                      </td>
                      <td>
                        <div className="action-btns">
                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              handleEdit(p)
                            }
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(p.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
