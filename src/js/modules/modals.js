import clearInputs from "./clearInputs";
import disableBtn from "./disableBtn";

function closeModal(modal) {
    modal.style.display = "none";
    modal.classList.remove('faded');
    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`;

    const inputs = modal.querySelectorAll('input');
    clearInputs(inputs);
}

const modals = (state) => {   
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const triggers = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = modal.querySelector(closeSelector),
              windows = document.body.querySelectorAll('[data-modal]'),
              scroll = window.innerWidth - document.body.clientWidth;

        triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {e.preventDefault();}  

                // added new atribute to make modal unclickable
                if (!item.hasAttribute('disable')) {    
                    windows.forEach(item => {
                        closeModal(item);
                    });
                    document.body.style.marginRight = `${scroll}px`;
                    openModal(modal, modalTimer);
                }
            });
        });

        close.addEventListener('click', () => {
            closeModal(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) { 
                closeModal(modal);
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.code === "Escape" && modal.style.display === "block") {
                closeModal(modal);
            }
        });
    }
      
    function openModal(modal, modalTimerId) {
        if (modalTimerId) {
            clearTimeout(modalTimerId);
        }
    
        modal.style.display = "block";
        modal.classList.add('faded');
        document.body.style.overflow = "hidden";
    }

    function setModalTimer(modalSelector, delay) {
        const modalTimerId = setTimeout(() => {
            document.body.style.marginRight = `${scroll}px`;      
            openModal(document.querySelector(modalSelector));  
        }, delay);
        return modalTimerId;
    }

    const modalTimer = setModalTimer('.popup', 60000);

    disableBtn('.popup_calc_button',state, ['width', 'height']);
    disableBtn('.popup_calc_profile_button',state, ['profile']);

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_close');
    bindModal('.phone_link', '.popup', '.popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false, true);
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, true);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false, true);
};

export default modals;
export {closeModal};
