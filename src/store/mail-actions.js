import { mailActions } from '../store/mail-slice';

export const addMail = (mail, clearInput) => {
  const senderEmail = mail.from.replace('@', '').replace('.', '');
  const receiverEmail = mail.to.replace('@', '').replace('.', '');
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-a609f-default-rtdb.firebaseio.com//${senderEmail}.json`,
        {
          method: 'POST',
          body: JSON.stringify({...mail, read: true}),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (senderEmail !== receiverEmail) {
        await fetch(
          `https://mail-box-a609f-default-rtdb.firebaseio.com//${receiverEmail}.json`,
          {
            method: 'POST',
            body: JSON.stringify({ ...mail, read: false }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      const data = await response.json();

      if (response.ok) {
        dispatch(
          mailActions.add({
            id: data.name,
            ...mail,
          })
        );
        clearInput();
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};


  
