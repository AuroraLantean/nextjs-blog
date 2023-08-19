import { useState, useEffect } from 'react';

import classes from './contact-form.module.css';
import Notification from '../ui/notification';

//---------------== sendContactData
async function sendContactData(contactDetails) {
  console.log('sendContactData()...');
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log('sendContactData()...data:', data, response.ok);

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  console.log('sendContactData()...end');
}
//---------------==

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');

  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  //---------------== sendMessageHandler()
  async function sendMessageHandler(event) {
    event.preventDefault();
    // optional: add client-side validation

    setRequestStatus('pending');

    console.log('sendMessageHandler(2)');
    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }); //Those argument fields should match the API req.body
      console.log('sendContactData()...end');

      setRequestStatus('success');
      setEnteredMessage('');
      setEnteredEmail('');
      setEnteredName('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  } //sendMessageHandler()
  //---------------==

  console.log('ContactForm(2)... requestStatus:', requestStatus);
  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  } else if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  } else if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  } else {
    console.log('requestStatus invalid');
  }
  console.log('ContactForm(3)');

  return (
    <section className={classes.contact}>
      <h1>Let's Talk!</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
