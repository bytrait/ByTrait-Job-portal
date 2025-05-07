import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCompanyProfile, updateCompanyProfile } from '../services/CompanyService';

const CompanyProfile = () => {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        imageurl:'',
        image: null, // changed from imageUrl
        companyName: '',
        email: '',
        website: '',
        phone: '',
        country: '',
        establishedYear: '',
        about: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getCompanyProfile();
                setFormData({
                    imageurl: profileData.imageUrl || '', // image URL from backend
                    image: null, // we don't set image file, just preview
                    companyName: profileData.companyName || '',
                    email: profileData.email || '',
                    website: profileData.website || '',
                    phone: profileData.phone || '',
                    country: profileData.country || '',
                    establishedYear: profileData.establishedYear || '',
                    about: profileData.about || '',
                    facebook: profileData.facebook || '',
                    twitter: profileData.twitter || '',
                    instagram: profileData.instagram || '',
                    linkedin: profileData.linkedin || '',
                });

                if (profileData.profileImage) {
                    setImagePreview(profileData.profileImage); // image URL from backend
                }
            } catch (error) {
                toast.error('Failed to fetch company profile');
            }
        };

        fetchProfile();
    }, []);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setFormData({ ...formData, image: file });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedFormData = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === 'image' && formData.image) {
                updatedFormData.append('image', formData.image); // Must match multer field
            } else {
                updatedFormData.append(key, formData[key]);
            }
        });

        try {
            await updateCompanyProfile(updatedFormData);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    return (
        <div className="container">
            <h2>Company Profile</h2>

            <div className="d-flex flex-column align-items-center">
                <div className="position-relative" style={{ width: '250px', height: '250px' }}>
                    { imagePreview ?
                    <img
                        src={imagePreview || 'src/assets/user.webp'}
                        alt="Profile"
                        className="rounded-circle border"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                    :

                    <img
                        src={formData.imageurl}
                        alt="Profile"
                        className="rounded-circle border"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
}
                    <button
                        type="button"
                        className="btn btn-primary rounded-circle position-absolute"
                        style={{
                            top: '25px',
                            right: '25px',
                            transform: 'translate(25%, -25%)',
                            width: '42px',
                            height: '42px',
                            padding: 0,
                            zIndex: 1,
                        }}
                        onClick={handleImageClick}
                    >
                        <i className="bi bi-image-fill"></i>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <h5 className="mt-3 fw-bold">{formData.companyName}</h5>
            </div>

            <form className="bg-light p-3 rounded w-100 mt-4" onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="form-group col-6">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder="Enter Company Name"
                            value={formData.companyName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-group col-6">
                        <label htmlFor="website">Website</label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            placeholder="Enter Website URL"
                            value={formData.website}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter Phone No."
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="form-group col-6">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Enter Country"
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="yearOfEstablishment">Year of Establishment</label>
                        <input
                            type="text"
                            id="yearOfEstablishment"
                            name="establishedYear"
                            placeholder="Enter Year of Establishment"
                            value={formData.establishedYear}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="aboutCompany">About Company</label>
                    <textarea
                        id="aboutCompany"
                        name="about"
                        rows="4"
                        placeholder="Enter About Company"
                        value={formData.about}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="form-group row mb-3">
                    <div className="form-group col-6">
                        <label htmlFor="facebook">Facebook</label>
                        <input
                            type="url"
                            id="facebook"
                            name="facebook"
                            placeholder="https://www.facebook.com/"
                            value={formData.facebook}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="twitter">Twitter</label>
                        <input
                            type="url"
                            id="twitter"
                            name="twitter"
                            placeholder="https://www.twitter.com/"
                            value={formData.twitter}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="form-group col-6">
                        <label htmlFor="instagram">Instagram</label>
                        <input
                            type="url"
                            id="instagram"
                            name="instagram"
                            placeholder="https://www.instagram.com/"
                            value={formData.instagram}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            placeholder="https://www.linkedin.com/"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="pe-4">
                    <button className="w-50 btn btn-primary" type="submit">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CompanyProfile;
