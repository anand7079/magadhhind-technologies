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

emailjs.init('9XYATwPvbqzvrCn8');

consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('consultName').value.trim();
    const email = document.getElementById('consultEmail').value.trim();
    const mobile = document.getElementById('consultMobile').value.trim();
    const address = document.getElementById('consultAddress').value.trim();

    const templateParams = {
        title: 'Consultation Request',
        name,
        email,
        mobile,
        address,
        message: `Consultation request details:\nMobile: ${mobile}\nAddress: ${address}`,
        to_email: 'magadh.hind@gmail.com'
    };

    emailjs.send('service_8ciyex8', 'template_pm9a967', templateParams)
        .then(() => {
            alert('Thank you! Your consultation request has been sent successfully.');
            consultationForm.reset();
            closeModal();
        }, (error) => {
            console.error('EmailJS error:', error);
            alert('Unable to send your request right now. Please try again later or email directly.');
        });
});
