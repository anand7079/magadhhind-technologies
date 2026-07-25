const openConsultationBtn = document.getElementById('openConsultationBtn');
const closeConsultationModal = document.getElementById('closeConsultationModal');
const cancelConsultationBtn = document.getElementById('cancelConsultationBtn');
const consultModal = document.getElementById('consultModal');
const consultationForm = document.getElementById('consultationForm');

const openModal = () => {
    consultModal.classList.add('active');
    consultModal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
    consultModal.classList.remove('active');
    consultModal.setAttribute('aria-hidden', 'true');
};

openConsultationBtn.addEventListener('click', openModal);
closeConsultationModal.addEventListener('click', closeModal);
cancelConsultationBtn.addEventListener('click', closeModal);
consultModal.addEventListener('click', (event) => {
    if (event.target === consultModal) {
        closeModal();
    }
});

consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! Your consultation request has been submitted. We will contact you soon.');
    consultationForm.reset();
    closeModal();
});
