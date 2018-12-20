import React from "react";
import { connect } from "react-redux";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { movies } from "./data";
import MoviePopup from "./MoviePopup";
import { defaultStyles } from "./styles";
import firebase from "../firebase";

const dbRef = firebase.database().ref("MovieData");

const { width, height } = Dimensions.get("window");

const cols = 3,
  rows = 3;

var dataArray = "";

export default class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupIsOpen: false,
      movieName: "",
      movieGenre: "",
      moviePoster: "",
      days: "",
      times: "",
      isChosen: null,
      dayState: "what",
      timeChosen: null,
      timeState: "what",
      movieData: "confused",
      loading: "what",
      data: [],
      loading: true
    };
    this.openMovie = this.openMovie.bind(this);
  }

  componentWillMount() {
    var array = [];
    dbRef.on("value", snap => {
      var dataObject = snap.val();
      var movieData = Object.values(dataObject);
      this.setState({ data: movieData });
      //console.log(dataArray);
      //this.setState({ data: dataArray });
      //dataArray.map(movie => console.log(movie.genre));
      //this.setState({ data: temp });
    });
  }

  openMovie(title, genre, poster, days, times) {
    this.setState({
      popupIsOpen: true,
      movieName: title,
      movieGenre: genre,
      moviePoster: poster,
      days: days,
      times: times,
      isChosen: null,
      dayState: "what",
      timeChosen: null,
      timeState: "what"
    });
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false
    });
  };

  render() {
    console.log(this.state.data);

    return (
      <View style={{ paddingTop: 20, paddingBottom: 20 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {this.state.data.map((movie, index) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                this.openMovie(
                  movie.title,
                  movie.genre,
                  movie.poster,
                  movie.days,
                  movie.times
                )
              }
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: movie.poster }} style={styles.image} />
              </View>
              <Text style={styles.title} numberOfLines={1}>
                {movie.title}
              </Text>
              <Text style={styles.genre} numberOfLines={1}>
                {movie.genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <MoviePopup
          movieName={this.state.movieName}
          movieGenre={this.state.movieGenre}
          moviePoster={this.state.moviePoster}
          days={this.state.days}
          times={this.state.times}
          isOpen={this.state.popupIsOpen}
          onClose={this.closeMovie}
          isChosen={this.state.isChosen}
          dayState={this.state.dayState}
          timeChosen={this.state.timeChosen}
          timeState={this.state.timeChosen}
          switchPages={this.props.switchPages}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10
  },
  imageContainer: {
    flex: 1 // take up all available space
  },
  image: {
    borderRadius: 10, // rounded corners
    ...StyleSheet.absoluteFillObject // fill up all space in a container
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4
  },
  genre: {
    ...defaultStyles.text,
    color: "#BBBBBB",
    fontSize: 12,
    lineHeight: 14
  },
  containerTop: {
    paddingTop: 20 // start below status bar
  },
  scrollContent: {
    flexDirection: "row", // arrange posters in rows
    flexWrap: "wrap" // allow multiple rows
  }
});
