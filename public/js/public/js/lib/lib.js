var makeObserver = (targetNode, callback) => {
    // Options for the observer (which mutations to observe)
    const config = { attributes: true };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    // observer.observe(targetNode, config);
    return observer;
};
//# sourceMappingURL=lib.js.map