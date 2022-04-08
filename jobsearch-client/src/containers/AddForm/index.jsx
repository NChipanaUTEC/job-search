import "./AddForm.css";
import { useState } from "react";
import axios from "axios";

function AddForm() {
    const [fullName, setFullName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobSkill, setJobSkill] = useState("");
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(fullName === "" || jobTitle === "" || jobSkill === "" || country === "" || language === "" || emailAddress === "" || phoneNumber === ""){
            alert("Please fill all the fields");
            setIsLoading(false);
            return;
        }
        axios.post("https://localhost:44391/employee", {
            fullName,
            jobTitle,
            jobSkill,
            country,
            language,
            emailAddress,
            phoneNumber
        })
            .then(res => {
                setIsLoading(false);
                setSubmitted(true);
                setFullName("");
                setJobTitle("");
                setJobSkill("");
                setCountry("");
                setLanguage("");
                setEmailAddress("");
                setPhoneNumber("");
            })
            .catch(err => {
                console.log(err);
                setSubmitted(false);
            })
    }




  return (
    <div>
        <div className="AddForm-header">
            <h1>Add Person</h1>
            <a href="/">
                <span className="material-icons" id="home">home</span>
            </a>
        </div>
        <p>Please fill in the form below to add a new person to the database</p>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="fullName" 
                placeholder="Enter full name" 
                value={fullName} 
                onChange={e => setFullName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                type="text"
                className="form-control"
                id="jobTitle"
                placeholder="Enter job title"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="jobSkill">Job Skill</label>
                <input
                type="text"
                className="form-control"
                id="jobSkill"
                placeholder="Enter job skill"
                value={jobSkill}
                onChange={e => setJobSkill(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                type="text"
                className="form-control"
                id="country"
                placeholder="Enter country"
                value={country}
                onChange={e => setCountry(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="language">Language</label>
                <input
                type="text"
                className="form-control"
                id="language"
                placeholder="Enter language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                type="text"
                className="form-control"
                id="emailAddress"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={e => setEmailAddress(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                />
            </div>
            <br/>
            <button type="submit" className="btn btn-outline-secondary">{isLoading ? '...' : 'Submit'}</button>
            {isSubmitted && <h3>Person added succesfully!</h3>}
        </form>
    </div>
  );
}

export default AddForm;