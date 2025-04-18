function modal() {
    const modal = document.querySelector('[data-modal]'),
          modalBtn = document.querySelectorAll('[data-modalbtn]');

    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimer);
    }
     
    function closeModal() {
        modal.classList.remove('show')
        modal.classList.add('hide')
        document.body.style.overflow = ''
    }
    

    modalBtn.forEach(btn => {
        btn.addEventListener('click', openModal) 
    });
    
    modal.addEventListener('click', (e) => {
        if (modal.classList.contains('show') && e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show') && e.code === 'Escape') {
            closeModal();
        }
    })
    const modalTimer = setTimeout(openModal, 50000);
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
        
    }
    window.addEventListener('scroll', showModalByScroll);

}
module.exports = modal;