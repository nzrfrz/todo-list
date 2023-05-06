export const urlPaginationSplitter = (url) => {
    const queryString = url;
    const urlParams = new URLSearchParams(queryString);
    const params = Object.fromEntries(urlParams.entries());

    return params;
};