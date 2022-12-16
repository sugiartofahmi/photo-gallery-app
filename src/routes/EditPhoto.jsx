import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const url = "https://gallery-app-server.vercel.app/photos";
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const getPhoto = async () => {
    const photo = await fetch(url + `/${id}`);
    const response = await photo.json();
    response.error && setError(response.error);
    setImageUrl(response.imageUrl);
    setCaptions(response.captions);
  };
  const editPhoto = async (e) => {
    e.preventDefault();
    const data = {
      imageUrl,
      captions,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await fetch(url + `/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/photos");
  };

  useEffect(() => {
    setLoading(true);
    getPhoto();
    setLoading(false);
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input
              className="submit-btn"
              type="submit"
              value="Submit"
              data-testid="submit"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
