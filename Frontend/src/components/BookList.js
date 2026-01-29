import React, { useState, useEffect } from 'react';
import api from '../api';

const BookList = ({ role, onEdit }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const res = await api.get('/books');
            setBooks(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('Failed to fetch books. Check your connection.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
        window.addEventListener('refreshBooks', fetchBooks);
        return () => window.removeEventListener('refreshBooks', fetchBooks);
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await api.delete(`/books/${id}`);
                fetchBooks();
            } catch (err) {
                alert(err.response?.data?.message || 'Delete failed');
            }
        }
    };

    const handleBorrow = async (book) => {
        if (role === 'public') {
            alert('You must be a User or Admin to borrow books.');
            return;
        }

        if (book.stock < 1) {
            alert('This book is currently out of stock.');
            return;
        }

        try {
            // Simulation of getting location
            const borrowData = {
                bookId: book.id,
                latitude: -7.7956, // Example: Yogyakarta
                longitude: 110.3695
            };

            await api.post('/borrow', borrowData);
            alert(`Success! You have borrowed "${book.title}".`);
            fetchBooks(); // Refresh to see reduced stock
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Borrowing failed. Check your connection or role.';
            alert(`Error: ${errorMessage}`);
        }
    };

    if (loading) return <div className="loading">Fetching collection...</div>;
    if (error) return <div className="error-msg">{error}</div>;

    return (
        <div className="book-list-container">
            <h3>Inventory <span>({books.length} items)</span></h3>
            <div className="book-grid">
                {books.length === 0 ? (
                    <p className="no-data">No books registered in the system.</p>
                ) : (
                    books.map((book) => (
                        <div key={book.id} className="book-card">
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p className="author">by {book.author}</p>
                                <div className="stock-info">
                                    <span className="label">Available Stock:</span>
                                    <span className={`stock-count ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {book.stock}
                                    </span>
                                </div>
                            </div>

                            <div className="book-actions">
                                {role === 'admin' ? (
                                    <>
                                        <button className="btn-edit" onClick={() => onEdit(book)}>Edit</button>
                                        <button className="btn-delete" onClick={() => handleDelete(book.id)}>Delete</button>
                                        <button className="btn-borrow-admin" disabled={book.stock === 0} onClick={() => handleBorrow(book)}>Borrow</button>
                                    </>
                                ) : (
                                    <button className="btn-borrow" disabled={book.stock === 0} onClick={() => handleBorrow(book)}>
                                        {book.stock > 0 ? 'Borrow Book' : 'Out of Stock'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookList;
