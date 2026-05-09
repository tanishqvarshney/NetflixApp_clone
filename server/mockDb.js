const moviesData = [
  // Boredom Busters (Top 10)
  { 
    _id: '131', 
    title: "The Big Bang Theory", 
    type: 'tvshow', 
    description: "A woman who moves into an apartment next to two brilliant but geeky scientists befriends them and their socially awkward friends.", 
    genre: "Comedy", 
    year: 2007, 
    rating: 8.1, 
    isTop10: true, 
    sticker: "Fan Favorite", 
    director: "Chuck Lorre", 
    cast: ["Jim Parsons", "Kaley Cuoco", "Johnny Galecki", "Simon Helberg", "Kunal Nayyar"],
    poster_path: "/images/bigbangtheory.jpg", 
    backdrop_path: "/images/bigbangtheory.jpg" 
  },
  { 
    _id: '130', 
    title: "The Witcher", 
    type: 'tvshow', 
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.", 
    genre: "Fantasy", 
    year: 2019, 
    rating: 8.0, 
    isTop10: true, 
    sticker: "Fan Favorite", 
    director: "Lauren Schmidt Hissrich", 
    cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
    poster_path: "/images/thewitcher.jpg", 
    backdrop_path: "/images/thewitcher.jpg" 
  },
  { 
    _id: '129', 
    title: "That '70s Show", 
    type: 'tvshow', 
    description: "A comedy about a group of teenage friends living in the fictional town of Point Place, Wisconsin, in the 1970s.", 
    genre: "Comedy", 
    year: 1998, 
    rating: 8.1, 
    isTop10: true, 
    sticker: "Classic Comedy", 
    director: "Bonnie & Terry Turner", 
    cast: ["Topher Grace", "Mila Kunis", "Ashton Kutcher", "Laura Prepon"],
    poster_path: "/images/that70sshow.jpg", 
    backdrop_path: "/images/that70sshow.jpg" 
  },
  { 
    _id: '128', 
    title: "Dhurandhar", 
    type: 'movie', 
    description: "An undercover Indian intelligence agent infiltrates Karachi's criminal syndicates to dismantle a terror network.", 
    genre: "Action", 
    year: 2025, 
    rating: 8.8, 
    isTop10: true, 
    sticker: "Trending Now", 
    director: "Aditya Dhar", 
    cast: ["Ranveer Singh", "Akshaye Khanna", "Sara Ali Khan"],
    poster_path: "/images/dhurandhar.jpg", 
    backdrop_path: "/images/dhurandhar.jpg" 
  },
  { 
    _id: '101', 
    title: "One Piece", 
    type: 'tvshow', 
    description: "Monkey D. Luffy and his pirate crew explore a fantastical world in search of the ultimate treasure.", 
    genre: "TV Shows", 
    year: 2023, 
    rating: 8.5, 
    isTop10: true, 
    sticker: "New Season", 
    director: "Marc Jobst", 
    cast: ["Iñaki Godoy", "Emily Rudd", "Mackenyu"], 
    poster_path: "https://i.pinimg.com/736x/d8/e9/41/d8e941bbb91a9df0afc5170a31cbfba4.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/d8/e9/41/d8e941bbb91a9df0afc5170a31cbfba4.jpg" 
  },
  { 
    _id: '102', 
    title: "Stranger Things", 
    type: 'tvshow', 
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.", 
    genre: "TV Shows", 
    year: 2016, 
    rating: 8.7, 
    isTop10: true, 
    director: "The Duffer Brothers", 
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"], 
    poster_path: "https://i.pinimg.com/736x/11/ee/9c/11ee9ce236f8781d441082b4ed14308b.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/11/ee/9c/11ee9ce236f8781d441082b4ed14308b.jpg" 
  },
  { 
    _id: '103', 
    title: "War Machine", 
    type: 'movie', 
    description: "An absurdist war story for our times, people are following a four-star general who's trying to win the war in Afghanistan.", 
    genre: "Action", 
    year: 2017, 
    rating: 6.0, 
    isTop10: true, 
    sticker: "Recently added", 
    director: "David Michôd", 
    cast: ["Brad Pitt", "Anthony Michael Hall", "Topher Grace"], 
    poster_path: "https://i.pinimg.com/736x/72/08/dd/7208dd582a59e8c21c9530198bbf0c50.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/72/08/dd/7208dd582a59e8c21c9530198bbf0c50.jpg" 
  },
  { 
    _id: '104', 
    title: "Peaky Blinders", 
    type: 'tvshow', 
    description: "A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps.", 
    genre: "TV Shows", 
    year: 2013, 
    rating: 8.8, 
    isTop10: true, 
    director: "Steven Knight", 
    cast: ["Cillian Murphy", "Paul Anderson", "Helen McCrory"], 
    poster_path: "https://i.pinimg.com/736x/d7/b4/2c/d7b42c6f97ccf42d764e9a0cc6cf8504.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/d7/b4/2c/d7b42c6f97ccf42d764e9a0cc6cf8504.jpg" 
  },
  { 
    _id: '105', 
    title: "Kota Factory", 
    type: 'tvshow', 
    description: "In a city of coaching centers known to train India’s finest collegiate minds, an earnest but ordinary student and his friends navigate campus life.", 
    genre: "TV Shows", 
    year: 2019, 
    rating: 9.0, 
    isTop10: true, 
    director: "Raghav Subbu", 
    cast: ["Jitendra Kumar", "Mayur More", "Ahsaas Channa"], 
    poster_path: "https://i.pinimg.com/736x/e0/73/ad/e073ade6ad1c343e19f943cab36d6170.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/e0/73/ad/e073ade6ad1c343e19f943cab36d6170.jpg" 
  },
  { 
    _id: '106', 
    title: "Delhi Crime", 
    type: 'tvshow', 
    description: "Based on the Nirbhaya case, Delhi Crime follows the Delhi Police investigation into the finding of the men who perpetrated the crime.", 
    genre: "TV Shows", 
    year: 2019, 
    rating: 8.5, 
    isTop10: true, 
    director: "Richie Mehta", 
    cast: ["Shefali Shah", "Rasika Dugal", "Adil Hussain"], 
    poster_path: "https://i.pinimg.com/736x/ab/a1/f2/aba1f2067ae5e9263495053c2165628e.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/ab/a1/f2/aba1f2067ae5e9263495053c2165628e.jpg" 
  },
  { 
    _id: '21', 
    title: "The Great Indian Kapil Sharma Show", 
    type: 'tvshow', 
    description: "Comedian Kapil Sharma hosts this laugh-out-loud variety talk show with celebrity guests.", 
    genre: "TV Shows", 
    year: 2024, 
    rating: 8.5, 
    isTop10: true, 
    progress: 65, 
    director: "Kapil Sharma", 
    cast: ["Kapil Sharma", "Krushna Abhishek", "Sunil Grover"], 
    poster_path: "https://i.pinimg.com/736x/9b/9f/e5/9b9fe592f8adad82ea1b1b867187e5a6.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/9b/9f/e5/9b9fe592f8adad82ea1b1b867187e5a6.jpg" 
  },
  { 
    _id: '107', 
    title: "Brooklyn Nine-Nine", 
    type: 'tvshow', 
    description: "Jake Peralta, an immature, but talented NYPD detective in Brooklyn's 99th Precinct, comes into immediate conflict with his new commanding officer.", 
    genre: "TV Shows", 
    year: 2013, 
    rating: 8.4, 
    progress: 20, 
    director: "Dan Goor", 
    cast: ["Andy Samberg", "Stephanie Beatriz", "Terry Crews"], 
    poster_path: "https://i.pinimg.com/736x/7c/ad/aa/7cadaaec10a51a7e1cec8017d8512f4f.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/7c/ad/aa/7cadaaec10a51a7e1cec8017d8512f4f.jpg" 
  },
  { 
    _id: '108', 
    title: "Squid Game", 
    type: 'tvshow', 
    description: "Hundreds of cash-strapped contestants accept an invitation to compete in children's games for a tempting prize, but the stakes are deadly.", 
    genre: "TV Shows", 
    year: 2021, 
    rating: 8.0, 
    progress: 45, 
    director: "Hwang Dong-hyuk", 
    cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-joon"], 
    poster_path: "https://i.pinimg.com/736x/69/24/d4/6924d4d4a7fab170daeda8a36eab5030.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/69/24/d4/6924d4d4a7fab170daeda8a36eab5030.jpg" 
  },
  { 
    _id: '109', 
    title: "96 Minutes", 
    type: 'movie', 
    description: "Four kids' lives are irrevocably changed by a carjacking gone wrong.", 
    genre: "Action", 
    year: 2011, 
    rating: 5.6, 
    progress: 85, 
    director: "Aimee Lagos", 
    cast: ["Brittany Snow", "Evan Ross", "Christian Serratos"], 
    poster_path: "https://i.pinimg.com/736x/74/1c/22/741c2272a78a7c11cfcd963efbdfa34c.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/74/1c/22/741c2272a78a7c11cfcd963efbdfa34c.jpg" 
  },
  { 
    _id: '110', 
    title: "HAQ", 
    type: 'tvshow', 
    description: "A gripping drama exploring the complexities of justice and morality in a modern setting.", 
    genre: "TV Shows", 
    year: 2023, 
    rating: 7.2, 
    progress: 10, 
    director: "Unknown", 
    cast: ["Ensemble Cast"], 
    poster_path: "https://i.pinimg.com/736x/3b/bc/5d/3bbc5d9b041f1a6ebbecc0377ecf4529.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/8a/ef/7c/8aef7c7f426b6cea343ac9c86fb55272.jpg" 
  },
  { 
    _id: '111', 
    title: "XO, Kitty", 
    type: 'tvshow', 
    description: "A new story begins when teen matchmaker Kitty Song Covey reunites with her long-distance boyfriend at the same Seoul high school she attended.", 
    genre: "Young Adult", 
    year: 2023, 
    rating: 6.5, 
    sticker: "Coming Soon", 
    director: "Jennifer Arnold", 
    cast: ["Anna Cathcart", "Minyeong Choi", "Gia Kim"], 
    poster_path: "https://i.pinimg.com/1200x/65/0a/3e/650a3ea60aaadd491fd1a8f9a46efe3c.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/65/0a/3e/650a3ea60aaadd491fd1a8f9a46efe3c.jpg" 
  },
  { 
    _id: '112', 
    title: "All of Us Are Dead", 
    type: 'tvshow', 
    description: "A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out or turn into one of the rabid infected.", 
    genre: "Young Adult", 
    year: 2022, 
    rating: 7.5, 
    director: "Lee Jae-kyoo", 
    cast: ["Park Ji-hu", "Yoon Chan-young", "Cho Yi-hyun"], 
    poster_path: "https://i.pinimg.com/736x/d3/dd/d8/d3ddd81a54851829048c2d9a84000812.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/d3/dd/d8/d3ddd81a54851829048c2d9a84000812.jpg" 
  },
  { 
    _id: '113', 
    title: "The Vampire Diaries", 
    type: 'tvshow', 
    description: "The lives, loves, dangers and disasters in the town, Mystic Falls, Virginia. Creatures of unspeakable horror lurker beneath this town.", 
    genre: "Young Adult", 
    year: 2009, 
    rating: 7.7, 
    director: "Kevin Williamson", 
    cast: ["Nina Dobrev", "Paul Wesley", "Ian Somerhalder"], 
    poster_path: "https://i.pinimg.com/736x/d3/69/ca/d369ca8ba052717a9c979b7f7f5be6b8.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/0f/e4/e5/0fe4e533505dbb8792ef2d1bcef4ed5c.jpg" 
  },
  { 
    _id: '114', 
    title: "13 Reasons Why", 
    type: 'tvshow', 
    description: "Follows teenager Clay Jensen, in his quest to uncover the story behind his classmate and crush, Hannah, and her decision to end her life.", 
    genre: "Young Adult", 
    year: 2017, 
    rating: 7.5, 
    director: "Brian Yorkey", 
    cast: ["Dylan Minnette", "Katherine Langford", "Christian Navarro"], 
    poster_path: "https://i.pinimg.com/736x/49/1f/e0/491fe02a12e3bcd0e1ba09f5b8064759.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/49/1f/e0/491fe02a12e3bcd0e1ba09f5b8064759.jpg" 
  },
  { 
    _id: '115', 
    title: "Weak Hero", 
    type: 'tvshow', 
    description: "A model student uses his brains and fighting skills to stand up against the violence that takes place both inside and outside of school.", 
    genre: "Young Adult", 
    year: 2022, 
    rating: 8.6, 
    director: "You Su-min", 
    cast: ["Park Ji-hoon", "Choi Hyun-wook", "Hong Kyung"], 
    poster_path: "https://i.pinimg.com/736x/24/d2/6b/24d26ba87d8057bca6112b96d887fa63.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/24/d2/6b/24d26ba87d8057bca6112b96d887fa63.jpg" 
  },
  { 
    _id: '116', 
    title: "Ginny & Georgia", 
    type: 'tvshow', 
    description: "Angst-ridden Ginny Miller often feels more mature than her thirty-year-old mother, the irresistible and dynamic Georgia Miller.", 
    genre: "Young Adult", 
    year: 2021, 
    rating: 7.4, 
    director: "Sarah Lampert", 
    cast: ["Brianne Howey", "Antonia Gentry", "Diesel La Torraca"], 
    poster_path: "https://i.pinimg.com/1200x/57/96/7e/57967e3fbb979799e31e49b74a4cc627.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/57/96/7e/57967e3fbb979799e31e49b74a4cc627.jpg" 
  },
  { 
    _id: '117', 
    title: "Fractured", 
    type: 'movie', 
    description: "After his wife and injured daughter vanish from an ER, a man conducts a frantic search and becomes convinced the hospital is hiding something.", 
    genre: "Thriller", 
    year: 2019, 
    rating: 6.4, 
    director: "Brad Anderson", 
    cast: ["Sam Worthington", "Lily Rabe", "Lucy Capri"], 
    poster_path: "https://i.pinimg.com/1200x/31/bf/e4/31bfe43e72f3d9b504f089ce51d73e88.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/31/bf/e4/31bfe43e72f3d9b504f089ce51d73e88.jpg" 
  },
  { 
    _id: '118', 
    title: "The Guilty", 
    type: 'movie', 
    description: "A demoted police officer assigned to a call dispatch desk is conflicted when he receives a localized emergency call from a kidnapped woman.", 
    genre: "Thriller", 
    year: 2021, 
    rating: 6.3, 
    director: "Antoine Fuqua", 
    cast: ["Jake Gyllenhaal", "Riley Keough", "Peter Sarsgaard"], 
    poster_path: "https://i.pinimg.com/1200x/6b/e4/c1/6be4c14b8b19ba8da3e472e79207a1a7.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/6b/e4/c1/6be4c14b8b19ba8da3e472e79207a1a7.jpg" 
  },
  { 
    _id: '119', 
    title: "Shutter Island", 
    type: 'movie', 
    description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.", 
    genre: "Thriller", 
    year: 2010, 
    rating: 8.2, 
    director: "Martin Scorsese", 
    cast: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley"], 
    poster_path: "https://i.pinimg.com/736x/1c/f3/2a/1cf32a904712d73b47a6200d06e76d6a.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/1c/f3/2a/1cf32a904712d73b47a6200d06e76d6a.jpg" 
  },
  { 
    _id: '120', 
    title: "Run", 
    type: 'movie', 
    description: "A homeschooled teenager begins to suspect her mother is keeping a dark secret from her.", 
    genre: "Thriller", 
    year: 2020, 
    rating: 6.7, 
    director: "Aneesh Chaganty", 
    cast: ["Sarah Paulson", "Kiera Allen", "Sara Sohn"], 
    poster_path: "https://i.pinimg.com/736x/ee/59/a6/ee59a68664024f63d45c597f0fbb5d04.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/ee/59/a6/ee59a68664024f63d45c597f0fbb5d04.jpg" 
  },
  { 
    _id: '121', 
    title: "Leave the World Behind", 
    type: 'movie', 
    description: "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices.", 
    genre: "Thriller", 
    year: 2023, 
    rating: 6.5, 
    director: "Sam Esmail", 
    cast: ["Julia Roberts", "Mahershala Ali", "Ethan Hawke"], 
    poster_path: "https://i.pinimg.com/1200x/cd/06/ec/cd06ec36bfe9ee7c604e3240446ea5c4.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/cd/06/ec/cd06ec36bfe9ee7c604e3240446ea5c4.jpg" 
  },
  { 
    _id: '122', 
    title: "Detective Byomkesh Bakshy!", 
    type: 'movie', 
    description: "While investigating the disappearance of a chemist, a detective uncovers a larger conspiracy to destroy the city of Calcutta.", 
    genre: "Thriller", 
    year: 2015, 
    rating: 7.6, 
    director: "Dibakar Banerjee", 
    cast: ["Sushant Singh Rajput", "Anand Tiwari", "Swastika Mukherjee"], 
    poster_path: "https://i.pinimg.com/736x/67/60/09/67600934be46eb152a6f35fbaba84f8d.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/67/60/09/67600934be46eb152a6f35fbaba84f8d.jpg" 
  },
  { 
    _id: '123', 
    title: "Mirage", 
    type: 'movie', 
    description: "Two storms separated by 25 years. A woman saved a boy's life but lost her daughter. Now she must find a way to get her back.", 
    genre: "Thriller", 
    year: 2018, 
    rating: 7.2, 
    director: "Oriol Paulo", 
    cast: ["Adriana Ugarte", "Chino Darín", "Javier Gutiérrez"], 
    poster_path: "https://i.pinimg.com/1200x/1e/88/0c/1e880c163f60686e3b06fe179d8ed073.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/1e/88/0c/1e880c163f60686e3b06fe179d8ed073.jpg" 
  },
  { 
    _id: '124', 
    title: "Behind Her Eyes", 
    type: 'movie', 
    description: "A single mother enters a world of twisted mind games when she begins an affair with her psychiatrist boss while secretly befriending his mysterious wife.", 
    genre: "Thriller", 
    year: 2021, 
    rating: 7.2, 
    director: "Steve Lightfoot", 
    cast: ["Eve Hewson", "Tom Bateman", "Simona Brown"], 
    poster_path: "https://i.pinimg.com/1200x/c9/86/85/c98685f3a2dedef842b1f4897e07fc33.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/c9/86/85/c98685f3a2dedef842b1f4897e07fc33.jpg" 
  },
  { 
    _id: '125', 
    title: "The Woman in Cabin 10", 
    type: 'movie', 
    description: "A journalist on a luxury cruise witnesses a passenger being thrown overboard, but everyone is accounted for.", 
    genre: "Thriller", 
    year: 2024, 
    rating: 6.8, 
    director: "Simon Stone", 
    cast: ["Keira Knightley", "Hannah Waddingham", "Guy Pearce"], 
    poster_path: "https://i.pinimg.com/1200x/33/67/c8/3367c842469e8886435e89bb150065a3.jpg", 
    backdrop_path: "https://i.pinimg.com/1200x/33/67/c8/3367c842469e8886435e89bb150065a3.jpg" 
  },
  { 
    _id: '126', 
    title: "Yeh Jawaani Hai Deewani", 
    type: 'movie', 
    description: "Kabir and Naina bond during a trekking trip. Before Naina can express herself, Kabir leaves India to pursue his career. They meet again years later at a friend's wedding.", 
    genre: "Romance", 
    year: 2013, 
    rating: 7.2, 
    director: "Ayan Mukerji", 
    cast: ["Ranbir Kapoor", "Deepika Padukone", "Aditya Roy Kapur"], 
    poster_path: "https://i.pinimg.com/736x/4d/70/66/4d70666c193e5eced01497de442ab475.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/4d/70/66/4d70666c193e5eced01497de442ab475.jpg" 
  },
  { 
    _id: '127', 
    title: "Game of Thrones", 
    type: 'tvshow', 
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.", 
    genre: "TV Shows", 
    year: 2011, 
    rating: 9.2, 
    director: "David Benioff", 
    cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage"], 
    poster_path: "https://i.pinimg.com/originals/3b/95/f7/3b95f76a3bfaf2e7f9448de7a6b6fa29.jpg", 
    backdrop_path: "https://i.pinimg.com/originals/3b/95/f7/3b95f76a3bfaf2e7f9448de7a6b6fa29.jpg" 
  },
  { 
    _id: '1', 
    title: "Dune: Part Two", 
    type: 'movie', 
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.", 
    genre: "Action", 
    year: 2024, 
    rating: 8.9, 
    director: "Denis Villeneuve", 
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"], 
    poster_path: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", 
    backdrop_path: "https://m.media-amazon.com/images/M/MV5BYTg4Mjc1MTktZmMwNy00YWY0LTk4MGEtNTM0NDU3YWZmMDQ2XkEyXkFqcGdeQXZ3ZXNsZXk@._V1_QL75_UX1000_CR0,0,1000,563_.jpg" 
  },
  { 
    _id: '22', 
    title: "FRIENDS", 
    type: 'tvshow', 
    description: "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.", 
    genre: "TV Shows", 
    year: 1994, 
    rating: 8.9, 
    director: "David Crane", 
    cast: ["Jennifer Aniston", "Courteney Cox", "Matthew Perry"], 
    poster_path: "https://i.pinimg.com/736x/ee/6c/2b/ee6c2b7a7f01ffdf1d36e53fa593d8a0.jpg", 
    backdrop_path: "https://i.pinimg.com/736x/ee/6c/2b/ee6c2b7a7f01ffdf1d36e53fa593d8a0.jpg" 
  }
];

let users = [
  { 
    _id: 'user123', 
    name: 'Test User', 
    email: 'test@test.com', 
    password: 'password', 
    role: 'user', 
    isSubscribed: true,
    watchlist: ['101', '102']
  }
];
let movies = [...moviesData];
let subscriptions = [];

class MockModel {
  constructor(data) {
    Object.assign(this, data);
    if (!this._id) this._id = Math.random().toString(36).substr(2, 9);
    if (!this.watchlist) this.watchlist = [];
  }

  get id() {
    return this._id;
  }

  async save() {
    if (this.email !== undefined) {
      const idx = users.findIndex(u => u._id === this._id);
      if (idx >= 0) users[idx] = this;
      else users.push(this);
    } else if (this.title !== undefined) {
      const idx = movies.findIndex(m => m._id === this._id);
      if (idx >= 0) movies[idx] = this;
      else movies.push(this);
    } else if (this.planId !== undefined) {
      const idx = subscriptions.findIndex(s => s._id === this._id);
      if (idx >= 0) subscriptions[idx] = this;
      else subscriptions.push(this);
    }
    return this;
  }

  populate(path) {
    if (path === 'watchlist' && Array.isArray(this.watchlist)) {
      this.watchlist = this.watchlist.map(id => movies.find(m => m._id.toString() === id.toString()) || id);
    }
    return this;
  }

  select(fields) { return this; }
  static select(fields) { return this; }

  static async find() { 
    return movies.map(m => new this(m)); 
  }

  static async findOne(query) {
    if (query.email) {
      const user = users.find(u => u.email === query.email);
      if (user) return new this(user);
    }
    return null;
  }

  static async findById(id) {
    if (!id) return null;
    const data = movies.find(m => m._id && m._id.toString() === id.toString()) || 
                 users.find(u => u._id && u._id.toString() === id.toString()) || 
                 subscriptions.find(s => s._id && s._id.toString() === id.toString());
    if (data) return new this(data);
    return null;
  }

  static async findByIdAndUpdate(id, data, options) {
    let idx = movies.findIndex(m => m._id.toString() === id.toString());
    if (idx >= 0) {
      movies[idx] = { ...movies[idx], ...data };
      return new this(movies[idx]);
    }
    
    idx = users.findIndex(u => u._id.toString() === id.toString());
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      return new this(users[idx]);
    }

    return null;
  }

  static async findByIdAndDelete(id) {
    const idx = movies.findIndex(m => m._id.toString() === id.toString());
    if (idx >= 0) return new this(movies.splice(idx, 1)[0]);
    return null;
  }

  static async deleteMany() { 
    movies = []; 
    return { deletedCount: moviesData.length }; 
  }

  static async insertMany(data) { 
    const newMovies = data.map(d => ({ ...d, _id: d._id || Math.random().toString(36).substr(2, 9) }));
    movies.push(...newMovies); 
    return newMovies; 
  }
}

module.exports = { MockModel, movies, users, subscriptions };
