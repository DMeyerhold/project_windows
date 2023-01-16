import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const shape = document.querySelectorAll('.balcon_icons_img'),
          width = document.querySelectorAll('#width'),
          height = document.querySelectorAll('#height'),
          type = document.querySelectorAll('#view_type'), 
          profile = document.querySelectorAll('.checkbox'),
          close = document.querySelectorAll('[data-close]');

    // setting select value by default
    state.type = type[0].value;
    state.shape = 0;

    Object.defineProperty(state, 'clear', {
        value: function () {
            for (let key in state) {
                delete state[key];
            }
        },
        configurable: true
    });

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, (e) => {
                switch(item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            item.checked === true ? state[prop] = item.nextElementSibling.id : delete state[prop];

                            elem.forEach(box => {
                                if (box !== item) {
                                    box.checked = false;
                                }
                            });
                        } else {
                            item.value.replace(/\D/g) !== '' ? state[prop] = item.value : delete state[prop];
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                             
                console.log(state);
            });
        });
    }

    bindActionToElems('click', shape, 'shape');
    bindActionToElems('input', width, 'width');
    bindActionToElems('input', height, 'height');
    bindActionToElems('change', type, 'type');
    bindActionToElems('change', profile, 'profile');

    function clearStateWhenClosed({closeBtn, state}) {
            closeBtn.addEventListener('click', () => {
                state.clear();
            });
    }

    close.forEach(item => {
        clearStateWhenClosed({closeBtn: item, state, });
    });
};

export default changeModalState;