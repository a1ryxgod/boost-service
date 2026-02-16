import './CTA.css';

const reviews = [
  {
    name: 'Alex M.',
    game: 'CS2',
    rating: 5,
    text: 'Got from Silver to Global in 3 days. Booster was super professional, used VPN and played at my usual hours. 10/10 would recommend.',
  },
  {
    name: 'Daniel K.',
    game: 'Dota 2',
    rating: 5,
    text: 'MMR went from 2k to 4k. The party boost option was great — I actually learned a lot playing alongside the booster.',
  },
  {
    name: 'Maria S.',
    game: 'Valorant',
    rating: 5,
    text: 'Fast service, friendly support. My account was safe the entire time. Went from Gold to Diamond in under a week.',
  },
  {
    name: 'Jake R.',
    game: 'League of Legends',
    rating: 4,
    text: 'Coaching sessions were incredibly helpful. My coach broke down every mistake and gave me a clear improvement plan.',
  },
];

export const CTA = () => {
  return (
    <div className="reviews">
      <h2 className="reviews__title">What Our Clients Say</h2>
      <div className="reviews__grid">
        {reviews.map((review) => (
          <div key={review.name} className="reviews__card">
            <div className="reviews__card-header">
              <div className="reviews__card-avatar">
                {review.name.charAt(0)}
              </div>
              <div className="reviews__card-info">
                <span className="reviews__card-name">{review.name}</span>
                <span className="reviews__card-game">{review.game}</span>
              </div>
              <div className="reviews__card-stars">
                {Array.from({ length: review.rating }, (_, i) => (
                  <svg key={i} className="reviews__star" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1.3l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L8 1.3z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="reviews__card-text">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
