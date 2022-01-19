export const getApiRoot = () => {
    const hashTag = window.location.hostname;
    console.log('Hash tag ' + hashTag);
    let apiRoot = 'http://dev-vm-api.citwdd.net';
    // hashTag === 'localhost'
        // ? 'https://localhost:5001'
        // : 'http://dev-vm-api.citwdd.net';
    if (window.location.hostname === "localhost") {
        apiRoot = 'https://localhost:44308'
    } else if (window.location.hostname.includes('vmfrontend-dev')) {
        apiRoot = 'https://dev-vm-api.citwdd.net';
    } else if (window.location.hostname.includes('vmfrontend-test')) {
        apiRoot = 'https://test-vm-api.citwdd.net';
    } else if (window.location.hostname.includes('vmfrontend-prod')) {
        apiRoot = 'https://prod-vm-api.citwdd.net';
    }
    return apiRoot
}
// export GetApiRoot;