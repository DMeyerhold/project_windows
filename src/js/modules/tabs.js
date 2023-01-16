function tabs(headerSelector, tabSelector, tabsContentSelector, activeClass, tabDisplay = 'block') {
    const header = document.querySelector(headerSelector),
          tabs = document.querySelectorAll(tabSelector),
          tabContent = document.querySelectorAll(tabsContentSelector);

    function hideTab() {
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

        tabContent.forEach(item => {
            item.style.display = "none";
        });
    }

    function showTab(i = 0) {    
        tabs[i].classList.add(activeClass);
        tabContent[i].classList.add('faded');
        tabContent[i].style.display = tabDisplay;            
    }
    
    hideTab();
    showTab();

    header.addEventListener('click', (e) => {
        if (e.target && e.target.closest(tabSelector)) {
            tabs.forEach((item, i) => {
                if (e.target.closest(tabSelector) === item) {
                    hideTab();
                    showTab(i);
                }
            });
        }
    });
}

export default tabs;