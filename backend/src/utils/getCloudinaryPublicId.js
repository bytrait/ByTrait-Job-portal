
// Helper to extract public_id from URL
const getCloudinaryPublicId = (url) => {
    if (!url) return null;
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0]; // remove .jpg/.png etc.
};

export default getCloudinaryPublicId;