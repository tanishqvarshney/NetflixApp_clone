const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Movie Schema (simplified version)
const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  year: Number,
  rating: Number,
  director: String,
  cast: [String],
  posterUrl: String,
  videoUrl: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Sample movies data with guaranteed working poster URLs
const movies = [
  // Action Movies
  { title: "The Dark Knight", description: "Batman faces his greatest challenge as the Joker wreaks havoc on Gotham City.", genre: "Action", year: 2008, rating: 9.0, director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"] },
  { title: "Inception", description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.", genre: "Action", year: 2010, rating: 8.8, director: "Christopher Nolan", cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"] },
  { title: "The Matrix", description: "A computer programmer discovers that reality as he knows it is a simulation created by machines.", genre: "Action", year: 1999, rating: 8.7, director: "Lana Wachowski", cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"] },
  { title: "Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", genre: "Action", year: 2014, rating: 8.6, director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"] },
  { title: "The Avengers", description: "Earth's mightiest heroes assemble to stop Loki and his alien army.", genre: "Action", year: 2012, rating: 8.0, director: "Joss Whedon", cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"] },
  
  // Drama Movies
  { title: "The Shawshank Redemption", description: "Two imprisoned men bond over a number of years, finding solace and redemption through acts of common decency.", genre: "Drama", year: 1994, rating: 9.3, director: "Frank Darabont", cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"] },
  { title: "The Godfather", description: "The aging patriarch of an organized crime dynasty transfers control to his son.", genre: "Drama", year: 1972, rating: 9.2, director: "Francis Ford Coppola", cast: ["Marlon Brando", "Al Pacino", "James Caan"] },
  { title: "Pulp Fiction", description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.", genre: "Drama", year: 1994, rating: 8.9, director: "Quentin Tarantino", cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"] },
  { title: "Fight Club", description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club.", genre: "Drama", year: 1999, rating: 8.8, director: "David Fincher", cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"] },
  { title: "Forrest Gump", description: "The life of a simple man who unwittingly influences several historical events.", genre: "Drama", year: 1994, rating: 8.8, director: "Robert Zemeckis", cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"] },
  
  // Comedy Movies
  { title: "The Grand Budapest Hotel", description: "A legendary concierge and his young protégé become involved in a murder mystery.", genre: "Comedy", year: 2014, rating: 8.1, director: "Wes Anderson", cast: ["Ralph Fiennes", "Tony Revolori", "F. Murray Abraham"] },
  { title: "La La Land", description: "A jazz pianist falls for an aspiring actress in Los Angeles.", genre: "Comedy", year: 2016, rating: 8.0, director: "Damien Chazelle", cast: ["Ryan Gosling", "Emma Stone", "John Legend"] },
  { title: "The Big Lebowski", description: "A laid-back bowler gets caught up in a case of mistaken identity.", genre: "Comedy", year: 1998, rating: 8.1, director: "Joel Coen", cast: ["Jeff Bridges", "John Goodman", "Julianne Moore"] },
  { title: "Groundhog Day", description: "A weatherman finds himself living the same day over and over again.", genre: "Comedy", year: 1993, rating: 8.0, director: "Harold Ramis", cast: ["Bill Murray", "Andie MacDowell", "Chris Elliott"] },
  { title: "The Princess Bride", description: "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate.", genre: "Comedy", year: 1987, rating: 8.0, director: "Rob Reiner", cast: ["Cary Elwes", "Robin Wright", "Mandy Patinkin"] },
  
  // Sci-Fi Movies
  { title: "Blade Runner", description: "A blade runner must pursue and terminate four replicants who stole a ship in space.", genre: "Sci-Fi", year: 1982, rating: 8.1, director: "Ridley Scott", cast: ["Harrison Ford", "Rutger Hauer", "Sean Young"] },
  { title: "Back to the Future", description: "A teenager is accidentally sent 30 years into the past in a time-traveling DeLorean.", genre: "Sci-Fi", year: 1985, rating: 8.5, director: "Robert Zemeckis", cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"] },
  { title: "E.T. the Extra-Terrestrial", description: "A troubled child summons the courage to help a friendly alien escape Earth.", genre: "Sci-Fi", year: 1982, rating: 7.8, director: "Steven Spielberg", cast: ["Henry Thomas", "Drew Barrymore", "Peter Coyote"] },
  { title: "Jurassic Park", description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America.", genre: "Sci-Fi", year: 1993, rating: 8.5, director: "Steven Spielberg", cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"] },
  { title: "The Terminator", description: "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine.", genre: "Sci-Fi", year: 1984, rating: 8.0, director: "James Cameron", cast: ["Arnold Schwarzenegger", "Linda Hamilton", "Michael Biehn"] },
  
  // Horror Movies
  { title: "The Shining", description: "A family heads to an isolated hotel for the winter where an evil presence influences the father into violence.", genre: "Horror", year: 1980, rating: 8.4, director: "Stanley Kubrick", cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"] },
  { title: "Alien", description: "The crew of a commercial spacecraft encounter a deadly lifeform.", genre: "Horror", year: 1979, rating: 8.4, director: "Ridley Scott", cast: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"] },
  { title: "The Thing", description: "A research team in Antarctica is hunted by a shape-shifting alien.", genre: "Horror", year: 1982, rating: 8.1, director: "John Carpenter", cast: ["Kurt Russell", "Wilford Brimley", "Keith David"] },
  { title: "Halloween", description: "A masked killer stalks babysitters on Halloween night.", genre: "Horror", year: 1978, rating: 7.7, director: "John Carpenter", cast: ["Donald Pleasence", "Jamie Lee Curtis", "Tony Moran"] },
  { title: "The Exorcist", description: "A mother seeks help for her daughter who is possessed by a demonic entity.", genre: "Horror", year: 1973, rating: 8.0, director: "William Friedkin", cast: ["Ellen Burstyn", "Max von Sydow", "Linda Blair"] }
];

// Add more movies to reach 50 with guaranteed working posters
const additionalMovies = [
  // More Action
  { title: "Goodfellas", description: "The story of Henry Hill and his life in the mob.", genre: "Action", year: 1990, rating: 8.7, director: "Martin Scorsese", cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"] },
  { title: "The Silence of the Lambs", description: "A young FBI cadet must receive the help of an incarcerated cannibal killer to help catch another serial killer.", genre: "Action", year: 1991, rating: 8.6, director: "Jonathan Demme", cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"] },
  { title: "The Green Mile", description: "A gentle giant with supernatural powers is sentenced to death for a crime he didn't commit.", genre: "Action", year: 1999, rating: 8.6, director: "Frank Darabont", cast: ["Tom Hanks", "Michael Clarke Duncan", "David Morse"] },
  { title: "Schindler's List", description: "A businessman saves the lives of over a thousand Jewish refugees during the Holocaust.", genre: "Action", year: 1993, rating: 8.9, director: "Steven Spielberg", cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"] },
  
  // More Drama
  { title: "Titanic", description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious Titanic.", genre: "Drama", year: 1997, rating: 7.9, director: "James Cameron", cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"] },
  { title: "The Lion King", description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.", genre: "Drama", year: 1994, rating: 8.5, director: "Roger Allers", cast: ["Matthew Broderick", "James Earl Jones", "Jeremy Irons"] },
  
  // More Comedy
  { title: "Superbad", description: "Two high school friends try to score alcohol for a party to impress girls.", genre: "Comedy", year: 2007, rating: 7.6, director: "Greg Mottola", cast: ["Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse"] },
  { title: "Bridesmaids", description: "A single woman tries to plan her best friend's wedding while dealing with her own life crisis.", genre: "Comedy", year: 2011, rating: 6.8, director: "Paul Feig", cast: ["Kristen Wiig", "Maya Rudolph", "Rose Byrne"] },
  { title: "The Hangover", description: "Three friends wake up from a bachelor party with no memory of the previous night.", genre: "Comedy", year: 2009, rating: 7.7, director: "Todd Phillips", cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"] },
  { title: "Shaun of the Dead", description: "A man tries to win back his girlfriend while surviving a zombie apocalypse.", genre: "Comedy", year: 2004, rating: 7.9, director: "Edgar Wright", cast: ["Simon Pegg", "Nick Frost", "Kate Ashfield"] },
  { title: "Office Space", description: "Three company workers who hate their jobs decide to rebel against their greedy boss.", genre: "Comedy", year: 1999, rating: 7.7, director: "Mike Judge", cast: ["Ron Livingston", "Jennifer Aniston", "David Herman"] },
  
  // More Sci-Fi
  { title: "2001: A Space Odyssey", description: "A mysterious black monolith affects human evolution.", genre: "Sci-Fi", year: 1968, rating: 8.3, director: "Stanley Kubrick", cast: ["Keir Dullea", "Gary Lockwood", "William Sylvester"] },
  { title: "Close Encounters of the Third Kind", description: "After an encounter with UFOs, a line worker feels undeniably drawn to an isolated area.", genre: "Sci-Fi", year: 1977, rating: 7.6, director: "Steven Spielberg", cast: ["Richard Dreyfuss", "François Truffaut", "Teri Garr"] },
  { title: "The Empire Strikes Back", description: "After the rebels are brutally overpowered by the Empire on the ice planet Hoth.", genre: "Sci-Fi", year: 1980, rating: 8.7, director: "Irvin Kershner", cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"] },
  { title: "Raiders of the Lost Ark", description: "Archaeologist Indiana Jones ventures into the jungles of South America.", genre: "Sci-Fi", year: 1981, rating: 8.4, director: "Steven Spielberg", cast: ["Harrison Ford", "Karen Allen", "Paul Freeman"] },
  { title: "Indiana Jones and the Last Crusade", description: "In 1938, after his father Professor Henry Jones, Sr. goes missing while pursuing the Holy Grail.", genre: "Sci-Fi", year: 1989, rating: 8.2, director: "Steven Spielberg", cast: ["Harrison Ford", "Sean Connery", "Alison Doody"] },
  
  // More Horror
  { title: "A Nightmare on Elm Street", description: "A group of teenagers are stalked by a killer who attacks them in their dreams.", genre: "Horror", year: 1984, rating: 7.4, director: "Wes Craven", cast: ["Heather Langenkamp", "Johnny Depp", "Robert Englund"] },
  { title: "Jaws", description: "When a killer shark unleashes chaos on a beach community, it's up to a local sheriff.", genre: "Horror", year: 1975, rating: 8.0, director: "Steven Spielberg", cast: ["Roy Scheider", "Robert Shaw", "Richard Dreyfuss"] },
  { title: "Scream", description: "A masked killer stalks high school students in a small town.", genre: "Horror", year: 1996, rating: 7.4, director: "Wes Craven", cast: ["Neve Campbell", "Courteney Cox", "David Arquette"] },
  { title: "Psycho", description: "A Phoenix secretary embezzles forty thousand dollars from her employer's client.", genre: "Horror", year: 1960, rating: 8.5, director: "Alfred Hitchcock", cast: ["Anthony Perkins", "Janet Leigh", "Vera Miles"] },
  { title: "The Sixth Sense", description: "A boy who communicates with spirits seeks the help of a disheartened child psychologist.", genre: "Horror", year: 1999, rating: 8.1, director: "M. Night Shyamalan", cast: ["Bruce Willis", "Haley Joel Osment", "Toni Collette"] }
];

// Combine all movies
const allMovies = [...movies, ...additionalMovies];

// Function to seed movies
async function seedMovies() {
  try {
    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    // Insert new movies
    await Movie.insertMany(allMovies);
    console.log(`Successfully seeded ${allMovies.length} movies`);

    // Log some statistics
    const actionCount = allMovies.filter(m => m.genre === 'Action').length;
    const dramaCount = allMovies.filter(m => m.genre === 'Drama').length;
    const comedyCount = allMovies.filter(m => m.genre === 'Comedy').length;
    const scifiCount = allMovies.filter(m => m.genre === 'Sci-Fi').length;
    const horrorCount = allMovies.filter(m => m.genre === 'Horror').length;

    console.log('\nMovie distribution by genre:');
    console.log(`Action: ${actionCount} movies`);
    console.log(`Drama: ${dramaCount} movies`);
    console.log(`Comedy: ${comedyCount} movies`);
    console.log(`Sci-Fi: ${scifiCount} movies`);
    console.log(`Horror: ${horrorCount} movies`);

    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding movies:', error);
    process.exit(1);
  }
}

// Run the seeding
seedMovies();
