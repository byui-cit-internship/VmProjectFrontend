export const getApiRoot = () => {
    const hashTag = window.location.hostname;
    console.log('Hash tag ' + hashTag);
    let apiRoot = 'http://dev-vm-api.citwdd.net';
    // hashTag === 'localhost'
        // ? 'https://localhost:5001'
        // : 'http://dev-vm-api.citwdd.net';

    if (window.location.hostname.includes('dev-vm')) {
        apiRoot = 'https://dev-vm-api.citwdd.net';
    } else if (window.location.hostname.includes('test-vm')) {
        apiRoot = 'https://test-vm-api.citwdd.net';
    } else if (window.location.hostname.includes('prod-vm')) {
        apiRoot = 'https://prod-vm-api.citwdd.net';
    }
    return apiRoot
}
// export GetApiRoot;