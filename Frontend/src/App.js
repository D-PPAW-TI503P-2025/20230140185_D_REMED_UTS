import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import api, { setRoleHeader } from './api';
import './App.css';

function App() {
    const [role, setRole] = useState('public');
    const [view, setView] = useState('home');
    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({ title: '', author: '', stock: 0 });

    const fetchBooks = async () => {
        try {
            const res = await api.get('/books');
            setBooks(res.data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    useEffect(() => {
        setRoleHeader(role);
        fetchBooks();
    }, [role]);

    const handleChange = (e) => {
        const value = e.target.name === 'stock' ? parseInt(e.target.value) || 0 : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setFormData({ title: book.title, author: book.author, stock: book.stock });
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBook) {
                await api.put(`/books/${editingBook.id}`, formData);
            } else {
                await api.post('/books', formData);
            }
            resetForm();
            fetchBooks();
            window.dispatchEvent(new Event('refreshBooks'));
        } catch (err) {
            alert(`Error: ${err.response?.data?.message || 'Action failed'}`);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', author: '', stock: 0 });
        setEditingBook(null);
        setShowForm(false);
    };

    const stats = {
        total: books.length,
        available: books.reduce((acc, book) => acc + (book.stock > 0 ? 1 : 0), 0),
        outOfStock: books.reduce((acc, book) => acc + (book.stock === 0 ? 1 : 0), 0)
    };

    return (
        <div className="App">
            <Navbar role={role} setRole={setRole} currentView={view} setView={setView} />

            <main className="content">
                {view === 'home' ? (
                    <div className="home-view">
                        <div className="welcome-banner">
                            <h2>Library Dashboard (<span>{role.toUpperCase()}</span>)</h2>
                            <p>Welcome to the library management system. Here is a summary of our collection.</p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">{stats.total}</span>
                                <span className="stat-label">Total Titles</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{stats.available}</span>
                                <span className="stat-label">Available Now</span>
                            </div>
                            <div className="stat-card warning">
                                <span className="stat-value">{stats.outOfStock}</span>
                                <span className="stat-label">Out of Stock</span>
                            </div>
                        </div>

                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="action-buttons">
                                <button onClick={() => setView('books')}>View All Books</button>
                                {role === 'admin' && <button className="secondary" onClick={() => { setView('books'); setShowForm(true); }}>Register New Title</button>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="books-view">
                        <div className="view-header">
                            <h2>Book Collection</h2>
                            {role === 'admin' && (
                                <button className="btn-add" onClick={() => { editingBook ? resetForm() : setShowForm(!showForm) }}>
                                    {showForm ? 'Cancel' : 'Add New Book'}
                                </button>
                            )}
                        </div>

                        {showForm && role === 'admin' && (
                            <section className="form-section">
                                <form onSubmit={handleSubmit} className="book-form">
                                    <h3>{editingBook ? 'Update Book' : 'Register New Book'}</h3>
                                    <div className="form-grid">
                                        <div className="form-group"><label>Title</label><input name="title" value={formData.title} onChange={handleChange} required /></div>
                                        <div className="form-group"><label>Author</label><input name="author" value={formData.author} onChange={handleChange} required /></div>
                                        <div className="form-group full-width"><label>Stock</label><input name="stock" type="number" value={formData.stock} onChange={handleChange} min="0" /></div>
                                    </div>
                                    <button type="submit" className="btn-submit">{editingBook ? 'Apply Changes' : 'Save Book'}</button>
                                </form>
                            </section>
                        )}

                        <BookList role={role} onEdit={handleEdit} />
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
