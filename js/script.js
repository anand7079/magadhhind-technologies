const openConsultationBtn = document.getElementById('openConsultationBtn');
const closeConsultationModal = document.getElementById('closeConsultationModal');
const cancelConsultationBtn = document.getElementById('cancelConsultationBtn');
const consultModal = document.getElementById('consultModal');
const consultationForm = document.getElementById('consultationForm');
const consultationStatus = document.getElementById('consultationStatus');
const submitConsultationBtn = document.getElementById('submitConsultationBtn');
const consultationEmail = 'magadh.hind@gmail.com';

const openModal = () => {
    consultModal.classList.add('active');
    consultModal.setAttribute('aria-hidden', 'false');
    consultationStatus.textContent = '';
    consultationStatus.className = 'form-status';
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

if (!window.emailjs) {
    console.error('EmailJS library did not load.');
} else {
    emailjs.init({ publicKey: '9XYATwPvbqzvrCn8' });
}

const showStatus = (message, type, fallbackUrl = '') => {
    consultationStatus.className = `form-status ${type}`;
    consultationStatus.replaceChildren(document.createTextNode(message));

    if (fallbackUrl) {
        const link = document.createElement('a');
        link.href = fallbackUrl;
        link.textContent = 'Email us directly';
        consultationStatus.append(' ', link);
    }
};

consultationForm.addEventListener('submit', async (event) => {
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
        to_email: consultationEmail
    };

    const mailtoUrl = `mailto:${consultationEmail}?subject=${encodeURIComponent('Consultation Request')}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nAddress: ${address}`
    )}`;

    if (!window.emailjs) {
        showStatus('We could not load the email service.', 'error', mailtoUrl);
        return;
    }

    submitConsultationBtn.disabled = true;
    submitConsultationBtn.textContent = 'Sending…';
    showStatus('Sending your request…', 'pending');

    try {
        await emailjs.send('service_8ciyex8', 'template_pm9a967', templateParams);
        consultationForm.reset();
        showStatus('Thank you! Your consultation request has been sent successfully.', 'success');
    } catch (error) {
        console.error('EmailJS error:', error);
        showStatus('We could not send your request right now.', 'error', mailtoUrl);
    } finally {
        submitConsultationBtn.disabled = false;
        submitConsultationBtn.textContent = 'Submit Request';
    }
});
