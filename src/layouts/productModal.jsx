import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const ProductModal = ({ product, onClose, onAddToCart }) => {
  return (
    <Modal show={product !== null} onHide={onClose}>
  <div className="d-flex w-100 h-100">
    <div className="modal-content d-flex w-100 h-100">
      <Modal.Header closeButton>
        <Modal.Title>{product?.productName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex'>
            <img src={product?.imgUrl} alt={product?.productName} />
                <div className='mx-5'>
                <p>{product?.description}</p>
                <p>Price: ${product?.price.$numberDecimal}</p>
                <Rating name="read-only" value={product?.rating} readOnly />
                </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onAddToCart(product)}>
          Add to cart
        </Button>
      </Modal.Footer>
    </div>
  </div>
</Modal>




    //old codes
    // <Modal show={product !== null} onHide={onClose}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>{product?.productName}</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <img src={product?.imgUrl} alt={product?.productName} />
    //     <p>{product?.description}</p>
    //     <p>Price: ${product?.price.$numberDecimal}</p>
    //     <Rating name="read-only" value={product?.rating} readOnly />
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={onClose}>
    //       Close
    //     </Button>
    //     <Button variant="primary" onClick={() => onAddToCart(product)}>
    //       Add to cart
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
  );
};
export default ProductModal;