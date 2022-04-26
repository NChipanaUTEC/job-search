import {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import './Home.css';
import Table from '../../components/Table';

function Home(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterInput, setFilterInput] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns = useMemo(
        () => [
            {
                Header: 'Full Name',
                accessor: 'fullName',
            },
            {
                Header: 'Job Title',
                accessor: 'jobTitle',
            },
            {
                Header: 'Job Skill',
                accessor: 'jobSkill',
            },
            {
                Header: 'Country',
                accessor: 'country',
            },
            {
                Header: 'Language',
                accessor: 'language',
            },
            {
                Header: 'Email Address',
                accessor: 'emailAddress',
            },
            {
                Header: 'Phone Number',
                accessor: 'phoneNumber',
            }
        ],
    )

    useEffect(() => {
        axios.get('http://localhost:1233/employee')
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleClearSubmit = (e) => {
        e.preventDefault();
        setFilterInput('');
        setFilterCategory('');
        axios.get('http://localhost:1233/employee')
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        if(filterInput === '' || filterCategory === '') return;
        setLoading(true);
        let API = '';
        if(filterCategory === 'Job Title') API = 'http://localhost:1233/employee/job/' + filterInput;
        else if(filterCategory === 'Country') API = 'http://localhost:1233/employee/country/' + filterInput;
        else if(filterCategory === 'Language') API = 'http://localhost:1233/employee/language/' + filterInput;
        axios.get(API)
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='Home'>
            <div className='Home-header'>
                <h1>Find your next talent!</h1>
                <a href='/add'>
                    <span className="material-icons" id="add">person_add</span>
                </a>
            </div>
            <br/>
            <div className='filter'>
                <div className='input-group mb-3'>
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {filterCategory === '' ? 'Filter by ...' : filterCategory}
                    </button>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item" onClick={e => {
                            setFilterCategory("Job Title");
                            setFilterInput("");
                        }}>Job Title</li>
                        <li className="dropdown-item" onClick={e => {
                            setFilterCategory("Country");
                            setFilterInput("");
                        }}>Country</li>
                        <li className="dropdown-item" onClick={e => {
                            setFilterCategory("Language");
                            setFilterInput("");
                        }}>Language</li>
                    </ul>
                    {filterCategory === '' &&
                        <input 
                        type="text" 
                        className="form-control" 
                        aria-describedby="basic-addon1"
                        value={filterInput}
                        onChange={e => setFilterInput(e.target.value)}
                        disabled
                        />
                    }
                    {filterCategory !== '' &&
                        <input 
                            type="text" 
                            className="form-control" 
                            aria-describedby="basic-addon1"
                            value={filterInput}
                            onChange={e => setFilterInput(e.target.value)}
                        />
                    }
                    <button className="btn btn-outline-secondary" type="button" onClick={e=>handleClearSubmit(e)}>Clear</button>
                    <button className="btn btn-outline-secondary" type="submit" onClick={e=>handleFilterSubmit(e)}>
                        <span className="material-icons">search</span>
                    </button>
                </div>
            </div>
            {loading ? <h2>Loading...</h2> : <Table data={data} columns={columns}/>}
        </div>
    )
}

export default Home;