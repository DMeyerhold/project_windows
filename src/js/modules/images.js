const images = (containerSelector, target) => {
    const imgBlock = document.querySelector(containerSelector);    
    const preview = document.createElement('div');
    const previewImg = document.createElement('img');

    previewImg.style.cssText = `
        max-width: 80%;
        max-height: 80%;
        border-radius: 8px;
    `;
    
    preview.prepend(previewImg);
    preview.classList.add('popup');
    preview.style.cssText = `
        display: none;
        align-items: center;
        justify-content: center;
    `; 
        
    imgBlock.append(preview);

    imgBlock.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.matches(target)) {
            preview.classList.add('faded');
            preview.style.display = 'flex';
            previewImg.src = event.target.parentNode.href;
            document.body.style.overflow = "hidden";
        }

        if (event.target === preview) {
            preview.classList.remove('faded');
            preview.style.display = "none";
            document.body.style.overflow = "";
        }
    });
};

export default images; 