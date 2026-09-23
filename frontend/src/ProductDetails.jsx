
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "./api/axios";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {

        API.get(`/product/${id}`)
            .then((res) => {
                setProduct(res.data.product);
            })
            .catch((error) => {
                console.log("PRODUCT ERROR:", error);
            });

    }, [id]);


    const getReviews = () => {

        API.get(`/reviews/${id}`)
            .then((res) => {
                setReviews(res.data.reviews);
            })
            .catch((error) => {
                console.log("REVIEW ERROR:", error);
            });

    };


    useEffect(() => {
        getReviews();
    }, [id]);


    const addToCart = () => {

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Product added to cart");
    };


    const submitReview = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/review",
                {
                    product: id,
                    rating: rating,
                    comment: comment
                }
            );

            console.log(
                "REVIEW RESPONSE:",
                response.data
            );

            alert("Review added successfully!");

            setComment("");
            setRating(5);

            getReviews();

        } catch (error) {

            console.log(
                "REVIEW SUBMIT ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Review failed"
            );
        }
    };


    if (!product) {
        return (
            <div className="details-loading">
                <h2>Loading...</h2>
            </div>
        );
    }


    return (

        <div className="product-details-page">

            {/* Product Section */}

            <div className="product-details">

                <div className="product-image-section">

                    <img
                        src={`http://localhost:8000${product.images[0].image}`}
                        alt={product.name}
                    />

                </div>


                <div className="product-info">

                    <p className="product-category">
                        {product.category}
                    </p>

                    <h1>
                        {product.name}
                    </h1>

                    <p className="product-rating">
                        ⭐ {product.ratings} / 5
                    </p>

                    <h2 className="product-price">
                        ₹{product.price}
                    </h2>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <p className="product-stock">
                        <b>Stock:</b> {product.stock}
                    </p>

                    <button
                        className="add-cart-button"
                        onClick={addToCart}
                    >
                        Add to Cart
                    </button>

                </div>

            </div>


            {/* Review Section */}

            <div className="review-section">

                <div className="review-form">

                    <h2>
                        Write a Review
                    </h2>

                    <form onSubmit={submitReview}>

                        <label>
                            Rating
                        </label>

                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(
                                    Number(e.target.value)
                                )
                            }
                        >
                            <option value="5">
                                ⭐⭐⭐⭐⭐
                            </option>

                            <option value="4">
                                ⭐⭐⭐⭐
                            </option>

                            <option value="3">
                                ⭐⭐⭐
                            </option>

                            <option value="2">
                                ⭐⭐
                            </option>

                            <option value="1">
                                ⭐
                            </option>

                        </select>


                        <label>
                            Comment
                        </label>

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
                            }
                            placeholder="Write your review..."
                            required
                        />


                        <button type="submit">
                            Submit Review
                        </button>

                    </form>

                </div>


                {/* Customer Reviews */}

                <div className="customer-reviews">

                    <h2>
                        Customer Reviews
                    </h2>


                    {reviews.length === 0 ? (

                        <p>
                            No reviews yet
                        </p>

                    ) : (

                        reviews.map((review) => (

                            <div
                                key={review._id}
                                className="review-card"
                            >

                                <p className="review-rating">
                                    ⭐ {review.rating} / 5
                                </p>

                                <p>
                                    {review.comment}
                                </p>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;
