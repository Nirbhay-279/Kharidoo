import React, { useState, useEffect } from "react";
import { FetchReviews, AddReview } from "./reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Review() {
  const [reviews, setReviews] = useState();
  const [rating, setrating] = useState(5);
  const { users } = useSelector((state) => state.users);
  const { review } = useSelector((state) => state.review);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // Get the comment and rating values
    const comment = e.target.comment.value;

    // Create a new review object
    const newReview = {
      user: users.id,
      product: id,
      text: comment,
      email: users.email,
      rating,
    };

    // Update the reviews state with the new review
    setReviews(newReview);
    dispatch(AddReview(newReview));
    // Optionally, clear the form fields or close the modal
    e.target.comment.value = "";
    document.getElementById("my_modal_1").close();
  };
  useEffect(() => {
    console.log("====================================");
    console.log(reviews);
    console.log("====================================");
  }, [reviews]);
  useEffect(() => {
    dispatch(FetchReviews(id));
    console.log();
  }, []);
  return (
    <div class=" py-6 sm:py-8 lg:py-12">
      <div class="mx-auto max-w-screen-md px-4 md:px-8">
        <h2 class="mb-4 text-center text-2xl font-bold  text-primary md:mb-8 lg:text-3xl xl:mb-12">
          Customer Reviews
        </h2>

        <div class="mb-4 flex items-center justify-between border-t border-b py-4">
          <div class="flex flex-col gap-0.5">
            <span class="block font-bold">Total</span>
            <span class="block text-sm ">Bases on 27 reviews</span>
          </div>
          <button
            className="btn btn-primary hover:bg-secondary"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Review
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-base-100">
              <form class="mb-6" onSubmit={handleCommentSubmit}>
                <div class="py-2 px-4 mb-4  bg-base-300 rounded-lg rounded-t-lg border border-gray-200 ">
                  <label for="comment" class="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="comment"
                    rows="6"
                    class="px-0 w-full text-sm  border-0 focus:ring-0 focus:outline-none  bg-base-300  text-primary "
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <div className="rating gap-1">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-red-400"
                    onClick={() => {
                      setrating(1);
                    }}
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-orange-400"
                    onClick={() => {
                      setrating(2);
                    }}
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-yellow-400"
                    onClick={() => {
                      setrating(3);
                    }}
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-lime-400"
                    onClick={() => {
                      setrating(4);
                    }}
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-green-400"
                    onClick={() => {
                      setrating(5);
                    }}
                  />
                </div>
                <br></br>
                <button
                  type="submit"
                  class="inline-flex mt-4 items-center py-2.5 px-4 text-xs font-medium text-center  bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-secondary"
                >
                  Post comment
                </button>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div className="divider divider-primary text-primary"></div>
        {review.map((item) => {
          return (
            <>
              <div key={item.id} className="divide-y bg-secondary  rounded-3xl pl-8">
                <div className="flex flex-col gap-3 py-4 md:py-8 ">
                  <div>
                    <span className="block text-sm font-bold">
                      {item.email}
                    </span>
                  </div>

                  <div className="-ml-1 flex gap-0.5">
                    <div className="rating gap-1">
                      {/* Display dynamic number of stars based on item.rating */}
                      {Array.from({ length: parseInt(item.rating, 10) }).map(
                        (_, index) => (
                          <input
                            key={index}
                            type="radio"
                            name={`rating-${item.id}`}
                            className="mask mask-heart bg-primary text-primary"
                            disabled
                          />
                        )
                      )}
                    </div>
                  </div>
                  <p className="">{item.text}</p>
                </div>
              </div>
              <div className="divider divider-primary"></div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Review;
