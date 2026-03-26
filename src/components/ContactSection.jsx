import React, { useMemo, useState } from 'react';
import { ContactBackground } from './ContactBackground';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Hasee10',
    icon: (
      <path
        d="M12 2C6.477 2 2 6.596 2 12.264c0 4.534 2.865 8.38 6.839 9.738.5.096.682-.222.682-.495 0-.245-.009-.893-.014-1.752-2.782.62-3.369-1.386-3.369-1.386-.455-1.184-1.11-1.5-1.11-1.5-.907-.637.069-.624.069-.624 1.003.072 1.53 1.056 1.53 1.056.892 1.57 2.341 1.117 2.91.854.091-.666.349-1.117.635-1.374-2.221-.26-4.555-1.14-4.555-5.073 0-1.121.39-2.037 1.029-2.755-.103-.261-.446-1.31.098-2.731 0 0 .839-.276 2.75 1.052A9.305 9.305 0 0 1 12 6.836a9.27 9.27 0 0 1 2.504.35c1.91-1.328 2.748-1.052 2.748-1.052.546 1.421.203 2.47.1 2.731.64.718 1.028 1.634 1.028 2.755 0 3.944-2.338 4.81-4.566 5.066.359.319.678.948.678 1.911 0 1.379-.012 2.491-.012 2.83 0 .276.18.596.688.494C19.138 20.64 22 16.796 22 12.264 22 6.596 17.523 2 12 2Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/haseeb-arshad-09881b347/',
    icon: (
      <path
        d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0ZM20 13.02c0-3.35-1.79-4.91-4.18-4.91-1.93 0-2.79 1.08-3.27 1.84V8.5H9.17c.04.96 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.04 1.88 2.56V20H20v-6.98Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@ihaseebarshad10',
    icon: (
      <path
        d="M4.6 7.2a.82.82 0 0 0-.27-.68L2.3 4.04V3.7h6.3l4.87 10.7 4.28-10.7h6V4l-1.73 1.66a.5.5 0 0 0-.19.48v12.2c0 .14.06.28.18.38L23.7 20v.34h-8.66V20l1.77-1.72c.17-.17.17-.22.17-.48V7.95l-4.92 12.39h-.66L5.67 7.95v8.29c-.05.35.07.7.32.94L8.3 20v.34H1.7V20l2.3-2.82a1.1 1.1 0 0 0 .3-.94V7.2Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'Email',
    href: 'mailto:ihaseebarshad10@gmail.com',
    icon: (
      <path
        d="M4 6.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Zm0 1.8v.2l8 4.95 8-4.95v-.2H4Zm16 1.64-7.58 4.7a.8.8 0 0 1-.84 0L4 9.94v6.76h16V9.94Z"
        fill="currentColor"
      />
    ),
  },
];

function SvgIcon({ children, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

const ContactSection = () => {
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copied, setCopied] = useState(false);

  const availability = useMemo(
    () => ({
      status: 'Open to opportunities',
      location: 'Islamabad, Pakistan',
      email: 'ihaseebarshad10@gmail.com',
    }),
    []
  );

  const validate = () => {
    const nextErrors = {};

    if (!formState.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formState.email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.subject.trim()) nextErrors.subject = 'Please enter a subject.';
    if (!formState.message.trim()) nextErrors.message = 'Please enter your message.';

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSubmitError('');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(availability.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // TODO: Replace this Formspree endpoint with your own form ID, or swap this fetch
      // call for EmailJS once you configure your EmailJS service/template/public key.
      const response = await fetch('https://formspree.io/f/myzevbge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Unable to send the message right now.');
      }

      setIsSuccess(true);
      setFormState(initialForm);
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-section reveal relative min-h-screen overflow-hidden py-24">
      <ContactBackground />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.16),transparent_30%),linear-gradient(180deg,rgba(10,10,15,0.22),rgba(10,10,15,0.88))]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-base leading-7 text-[#9ca3af] md:text-lg">
            Have a project in mind, want to discuss automation, or just want to connect? I&apos;m always happy to talk.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-shell">
            <div className="contact-panel">
              <div className={`contact-form-shell ${isSuccess ? 'contact-form-shell--success' : ''}`}>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className={`contact-form__content ${isSuccess ? 'is-hidden' : ''}`}>
                    <div className="floating-field">
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="contact-name">Name</label>
                      {errors.name ? <p className="field-error">{errors.name}</p> : null}
                    </div>

                    <div className="floating-field">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="contact-email">Email</label>
                      {errors.email ? <p className="field-error">{errors.email}</p> : null}
                    </div>

                    <div className="floating-field">
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={formState.subject}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="contact-subject">Subject</label>
                      {errors.subject ? <p className="field-error">{errors.subject}</p> : null}
                    </div>

                    <div className="floating-field floating-field--textarea">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="6"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="contact-message">Message</label>
                      {errors.message ? <p className="field-error">{errors.message}</p> : null}
                    </div>

                    {submitError ? <p className="field-error">{submitError}</p> : null}

                    <button type="submit" className="contact-submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>

                  <div className={`contact-success ${isSuccess ? 'is-visible' : ''}`} aria-live="polite">
                    <div className="contact-success__icon">
                      <SvgIcon className="h-8 w-8">
                        <path
                          d="M20 7 10 17l-6-6"
                          stroke="currentColor"
                          strokeWidth="2.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </SvgIcon>
                    </div>
                    <h3>Message sent successfully</h3>
                    <p>Thanks for reaching out. I&apos;ll get back to you as soon as I can.</p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="contact-info-column">
            <div className="contact-shell">
              <div className="contact-panel contact-panel--info">
                <div className="contact-info-list">
                  <div>
                    <p className="contact-info-label">Email</p>
                    <button type="button" className="copy-email-button" onClick={handleCopyEmail}>
                      <span>{availability.email}</span>
                      <span className={`copy-email-tooltip ${copied ? 'is-visible' : ''}`}>Copied!</span>
                    </button>
                  </div>

                  <div>
                    <p className="contact-info-label">Location</p>
                    <div className="contact-info-value">{availability.location}</div>
                  </div>

                  <div>
                    <p className="contact-info-label">Availability</p>
                    <div className="availability-badge">
                      <span className="availability-dot" />
                      <span>{availability.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-shell">
              <div className="contact-panel contact-panel--socials">
                <h3 className="contact-socials-title">Connect With Me</h3>
                <div className="socials-grid">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button"
                      aria-label={link.name}
                    >
                      <SvgIcon className="h-5 w-5 text-current">{link.icon}</SvgIcon>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
