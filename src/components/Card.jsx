import { Link } from "react-router-dom";

const Card = ({ photo, deletePhoto }) => {
  return (
    <div className="card">
      <img className="card-image" src={photo.imageUrl} alt={photo.id} />
      <div className="card-content">
        <p className="captions" data-testid="photo-caption">{photo.captions}</p>
        <button className="edit-btn">
          <Link to={`${photo.id}`}>Edit</Link>
        </button>
        <button className="delete-btn" onClick={() => deletePhoto(photo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
