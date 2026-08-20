function ReviewForm({ author, score, comment, onAuthorChange, onScoreChange, onCommentChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={author}
        placeholder="Jorgito"
        onChange={(event) => onAuthorChange(event.target.value)}
      />
      <input
        type="number"
        min="1"
        max="5"
        value={score}
        placeholder="Score 1-5"
        onChange={(event) => onScoreChange(event.target.value)}
      />
      <textarea
        value={comment}
        placeholder="BuenaPeli"
        onChange={(event) => onCommentChange(event.target.value)}
      />
      <button type="submit">Save review</button>
    </form>
  )
}

export default ReviewForm
