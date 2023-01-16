const disableBtn = (btnSelector, state, prop) => {
    const btn = document.querySelector(btnSelector), 
          inputs = btn.parentNode.querySelectorAll('input');
    
    let verified = false;
  
    btn.addEventListener('click', () => {          
        btn.setAttribute('disable', '');

        for(let i = 0; i < prop.length; i++) {
            const value = state[prop[i]];
            if (value === undefined) {
                btn.setAttribute('disable', '');
                verified = false;
                break;
            } 
    
            if ((i + 1) === prop.length) {
                btn.removeAttribute('disable');
                verified = true;
            }
        }

        if (!verified) {
            inputs.forEach(item => {
                switch(item.type) {
                    case'text': 
                        if (item.value === '') {
                            item.classList.add('error');
                            setTimeout(() => item.classList.remove('error'), 500);
                        }
                        break;
                    case'checkbox':  
                        item.nextElementSibling.classList.add('error');
                        setTimeout(() => item.nextElementSibling.classList.remove('error'), 500);
                        break;
                }
            });
        }
    });
};

export default disableBtn;