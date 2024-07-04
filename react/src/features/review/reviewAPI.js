export async function AddReviewAPI(review) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(review),
  };
  const url = "http://localhost:3000/review";
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log("add review");
  console.log(data);
  return data;
}

export async function FetchReviewsAPI() {
  const url = "http://localhost:3000/review";
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log("all reviews");
  console.log(data);
  return data;
}

export async function FetchReviewsByProductAPI(productId) {
  const url = `http://localhost:3000/review/${productId}`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log("reviews by product");
  console.log(data);
  return data;
}

export async function DeleteReviewAPI(reviewId) {
  const url = `http://localhost:3000/review/${reviewId}`;
  console.log(url);
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  console.log(url);
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  console.log("deleted review");
  console.log(data);
}
