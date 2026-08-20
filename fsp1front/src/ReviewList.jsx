import { useEffect, useState } from 'react'
import ReviewForm from './ReviewForm.jsx'

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [author, setAuthor] = useState('')
  const [score, setScore] = useState('')
  const [comment, setComment] = useState('')

  function loadReviews() {
    fetch(`/api/movies/${movieId}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
  }

  useEffect(() => {
    loadReviews()
  }, [movieId])

  function handleSubmit(event) {
    event.preventDefault()

    fetch(`/api/movies/${movieId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, score, comment }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not save review')
        }
        return response.json()
      })
      .then(() => {
        setAuthor('')
        setScore('')
        setComment('')
        setShowForm(false)
        loadReviews()
      })
  }

  return (
    <section className="reviewList">
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>Todavia no hay reviews para esta pelicula!</p>
      ) : (
        reviews.map((review) => (
          <article key={review.reviewId}>
            <strong>{review.author}</strong>
            <span> Score: {review.score}/5</span>
            <p>{review.comment}</p>
          </article>
        ))
      )}

      <button type="button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Nueva review'}
      </button>

      {showForm && (
        <ReviewForm
          author={author}
          score={score}
          comment={comment}
          onAuthorChange={setAuthor}
          onScoreChange={setScore}
          onCommentChange={setComment}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  )
}

export default ReviewList