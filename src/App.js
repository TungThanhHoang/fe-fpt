import { useEffect, useState } from 'react';
import './App.css';
import ErrorMessage from './component/ErrorMessage';
import { MailBox } from './component/MailBox';
import MailContent from './component/MailContent';
import Notification from './component/Notification';
import dataMail from './data.json'
import Validate from './utils/Validate';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [mailBox, setMailBox] = useState(dataMail.data);
  const [formData, setFormData] = useState({ id: uuidv4(), to: "", subject: "", content: "" });
  const [toast, setToast] = useState(false);
  const [error, setError] = useState({});
  const [contentMail, setContentMail] = useState(null);
  const [flag, setFlag] = useState([]);
  const [pin, setPin] = useState([]);

  const handleOnChange = (value) => {
    const findMail = mailBox.find(item => item?.id === value);
    setContentMail(findMail);
  }

  const handleOnChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFlag = (value) => {
    const findItem = flag?.find(item => item === value);
    if (findItem) {
      const deleteItem = flag?.filter(item => item !== value);
      setFlag(deleteItem);
    } else {
      setFlag([...flag, value]);
    }
  }

  const handlePin = (data) => {
    const findItem = pin?.find(item => item.id === data.id);
    if (findItem) {
      const deleteItem = pin?.filter(item => item.id !== data.id);
      setPin(deleteItem);
      setMailBox(prevState => {
        return prevState.map(item => item.id === data.id ? { ...item, isPin: false } : item);
      });
    } else {
      const findMail = mailBox.filter(item => item.id !== data.id);
      setPin([{ ...data, isPin: true }, ...pin]);
      setMailBox([{ ...data, isPin: true }, ...findMail]);
    }
  }

  const handleDelete = (value) => {
    const deleteMail = mailBox.filter(item => item.id !== value);
    setMailBox(deleteMail);
  }

  const handleSortMail = () => {
    return mailBox.sort((a, b) => Number(a.isPin) !== Number(b.isPin) ? Number(a.isPin) - Number(b.pin) : new Date(b.createdAt) - new Date(a.createdAt));
  }

  const submitForm = (e) => {
    e.preventDefault();
    const errors = Validate(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      setToast(true);
      setTimeout(() => {
        setMailBox([{ ...formData, createdAt: new Date() }, ...mailBox]);
        setToast(false);
        setFormData({ to: "", subject: "", content: "" })
      }, 1000)
    }
  }

  return (
    <div className="container mt-4 mb-4">
      {toast && <Notification />}
      <h4>SEND MAIL</h4>
      <form className='border p-2 mb-4' onSubmit={submitForm}>
        <div class="form-group">
          <label for="exampleInputEmail1">To</label>
          <input type="text" class={`form-control ${error['to'] && "is-invalid"}`} id="exampleInputEmail1 " value={formData.to} name="to" aria-describedby="emailHelp" onChange={handleOnChangeInput} />
          <ErrorMessage isCheck={error["to"]} message="Vui lòng nhập đúng định dạng" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Subject</label>
          <input type="text" class={`form-control ${error['subject'] && "is-invalid"}`} name='subject' value={formData.subject} id="exampleInputPassword1" onChange={handleOnChangeInput} />
          <ErrorMessage isCheck={error["subject"]} message="Không được để trống" />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Content</label>
          <textarea class={`form-control ${error['content'] && "is-invalid"}`} id="exampleFormControlTextarea1" name="content" value={formData.content} rows="3" onChange={handleOnChangeInput}></textarea>
          <ErrorMessage isCheck={error["content"]} message="Không được để trống" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div className="mail">
        <h4>INBOX</h4>
        <div className="wapper-email">
          <div className="card-mail">
            <h5>Mail</h5>
            <div className="card-email__border">
              {
                handleSortMail()?.map((item, index) => <MailBox key={index} data={item} onChange={handleOnChange} onDelete={handleDelete} flag={flag} onFlag={handleFlag} pin={pin} onPin={handlePin} />)
              }
            </div>
          </div>
          <div className="card-mail-detail">
            <h5>Mail Details</h5>
            <div className="card-mail-detail__border">
              {
                contentMail ? <MailContent data={contentMail} /> : <div className="main-detail-none">None</div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


