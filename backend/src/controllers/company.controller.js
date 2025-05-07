const db = require('../models');
const Company = db.Company;
const cloudinary = require('../utils/cloudinary');
const { default: getCloudinaryPublicId } = require('../utils/getCloudinaryPublicId');
const logger = require('../utils/logger');


exports.updateProfile = async (req, res) => {
    try {
        const companyId = req.company.id;
        const {
            website,
            email,
            companyName,
            establishedYear,
            phone,
            country,
            about,
            facebook,
            linkedin,
            instagram,
            twitter,
        } = req.body;

        const company = await Company.findByPk(companyId);
        if (!company) 
        {
            logger.error('Company not found');
            return res.status(404).json({ message: 'Company not found' });
        }
        let imageUrl = company.imageUrl;

        // If user uploaded a new image, delete old one first
        if (req.file?.path) {
            if (!req.file) {
                logger.error('Image upload failed');
                return res.status(400).json({ message: 'Image upload failed' });
            }
            if (!req.file.path) {
                logger.error('Image path not found');
                return res.status(400).json({ message: 'Image path not found' });
            }
            if (company.imageUrl) {
                logger.info('Deleting old image from Cloudinary');
                const publicId = getCloudinaryPublicId(company.imageUrl);
                await cloudinary.uploader.destroy(`job-portal/companies/${publicId}`);
                logger.info('Old image deleted successfully');
            }
            imageUrl = req.file.path;
            logger.info('New image uploaded to Cloudinary');
        }

        logger.info('Updating company profile');
        await Company.update({
            companyName,
            email,
            imageUrl,
            phone,
            website,
            establishedYear: establishedYear + "",
            country,
            about,
            facebook: facebook + "",
            linkedin: linkedin + "",
            instagram: instagram + "",
            twitter: twitter + ""
        }, {
            where: { id: companyId }
        });
        logger.info('Company profile updated successfully');
        const updatedCompany = await Company.findByPk(companyId);
        if (!updatedCompany) {
            logger.error('Failed to retrieve updated company data');
            return res.status(404).json({ message: 'Failed to retrieve updated company data' });
        }
        return res.status(200).json({
            message: 'Profile updated successfully',
            data: updatedCompany,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getCompanyProfile = async (req, res) => {
    try {
        const companyId = req.company.id;
        const company = await Company.findByPk(companyId);
        if (!company) {
            logger.error('Company not found');
            return res.status(404).json({ message: 'Company not found' });
        }
        logger.info('Company profile retrieved successfully');
        return res.status(200).json({
            message: 'Company profile retrieved successfully',
            data: company,
        });
    } catch (err) {
        logger.error('Error retrieving company profile', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
