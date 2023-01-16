import checkNumInputs from "./checkNumInputs";
import { closeModal } from "./modals";
import clearInputs from "./clearInputs";

const forms = (formSelector, externalData) => {
    const form = document.querySelectorAll(formSelector), 
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Мы с вами свяжемся",
        error: "Что-то пошло не так"
    };

    form.forEach(item => bindPostData(item));

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        const res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.stopPropagation();
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);

            const formData = new FormData(form);
            // const json = JSON.stringify(Object.fromEntries(formData.entries()));

            if (form.dataset.calc) {
                for (let key in externalData) {
                    formData.append(key, externalData[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(response => {
                    console.log(response);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.error;
                })
                .finally(() => {
                    clearInputs(inputs);
                    setTimeout(() => {
                        statusMessage.remove();           
                        clearInputs(inputs);
                        externalData.clear();
                        closeModal(form.closest('[data-modal]'));
                    }, 4000);
                });
        });
    }    
};

export default forms;

