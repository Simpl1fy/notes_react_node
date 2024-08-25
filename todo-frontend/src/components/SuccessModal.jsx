import Modal  from 'react-modal'

export default function SuccessModal({isOpen, onRequestClose, heading, message}) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        <h2>{heading}</h2>
        <div>{message}</div>
        <button onClick={onRequestClose}>Close</button>
      </Modal>
    </div>
  )
}
