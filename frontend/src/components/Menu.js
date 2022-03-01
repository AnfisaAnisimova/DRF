import React from 'react'
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div class="container-fluid">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link class="nav-link" to='/home'>Home</Link></li>
                <li class="nav-item"><Link class="nav-link" to='/developers'>Developers</Link></li>
                <li class="nav-item"><Link class="nav-link" to='/projects'>Projects</Link></li>
                <li class="nav-item"><Link class="nav-link" to='/tasks'>ToDo</Link></li>
            </ul>
        </div>

    );
};

export default Menu