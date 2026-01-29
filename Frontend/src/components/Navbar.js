import React from 'react';

const Navbar = ({ role, setRole, currentView, setView }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="logo" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
                    Library<span>System</span>
                </h1>

                <div className="role-selector">
                    <span>Access:</span>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="public">Public</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <ul className="nav-links">
                    <li className={currentView === 'home' ? 'active' : ''}>
                        <button onClick={() => setView('home')}>Home</button>
                    </li>
                    <li className={currentView === 'books' ? 'active' : ''}>
                        <button onClick={() => setView('books')}>Books</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
