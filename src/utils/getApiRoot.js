export const getApiRoot = () => {
  const hashTag = window.location.hash;
  let apiRoot = hashTag.includes('#remote')?'https://rancher-dev-bff.cit.byui.edu':"http://localhost:5000";
  hashTag === 'localhost'

  if (window.location.hostname.includes("rancher-vmfrontend-dev")) {
    apiRoot = "https://rancher-dev-bff.cit.byui.edu";
  } else if (window.location.hostname.includes("rancher-vmfrontend-test")) {
    apiRoot = "https://rancher-test-bff.cit.byui.edu";
  } 
  return apiRoot;
};
