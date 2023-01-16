const clearInputs = (inputs) => {
    inputs.forEach(item => {
        if (item.type === "text") {
            item.value = "";
        } else {
            item.checked = false;
        }
    });
};

export default clearInputs;