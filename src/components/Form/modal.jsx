function Modal({ id, title, children }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-gray-700">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="w-full">{children}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Modal;
