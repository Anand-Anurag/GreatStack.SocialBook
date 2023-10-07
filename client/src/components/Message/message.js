import './message.css';
import { format } from 'timeago.js';

const Message = ({ own, message }) => {
    return (
        <li key={message._id+'1'} className={own ? 'msg own' : 'msg'}>
            <p className='msgText'>{message.text}</p>
            <span className="msgTime">{format(message.createdAt)}</span>
        </li>
    );
}

export default Message;